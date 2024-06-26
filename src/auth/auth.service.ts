import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';
import { ViewUserDto } from 'src/users/dto/view-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { AuthUserDto } from 'src/users/dto/auth-user.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
        private jwtService: JwtService,
        @InjectModel(User) private userRepository: typeof User) {}
        
    async login(userDto: AuthUserDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    async registration(userDto: CreateUserDto) {
        const condidate = await this.userRepository.findOne({
            where:{email: userDto.email},
            include: {all: true}
        });
        if (condidate) {
            throw new HttpException('Пользователь с таким email существует.', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.create({...userDto, password: hashPassword});

        return this.generateToken(user);
    }

    private async generateToken(user: ViewUserDto) {
        const payload = {email: user.email, id: user.id, roles: user.roles}
        return {
            token: this.jwtService.sign(payload)
        };
    }

    private async validateUser(userDto: AuthUserDto) {
        const user = await this.userService.getByEmail(userDto.email);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: "Некорректный email или пароль."})
    }
}
