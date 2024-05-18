import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';
import { ViewUserDto } from 'src/users/dto/view-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { AuthUserDto } from 'src/users/dto/auth-user.dto';
import { toUSVString } from 'util';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
        private jwtService: JwtService,
        @InjectModel(User) private userRepository: typeof User) {}
        
    async login(userDto: AuthUserDto) {
        const user = await this.validateUser(userDto);
        const tokens = await this.generateTokens(user);
        await this.saveToken(user.id, tokens.refreshToken);

        return tokens;
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

        const tokens = await this.generateTokens(user);
        await this.saveToken(user.id, tokens.refreshToken);

        return tokens;
    }

    async logout(refreshToken: string) {
        const data = await this.validateToken(refreshToken);
        if (data) {
            const user = await this.userRepository.findByPk(data.id, {include: {all: true}});
            if (user) {
                return user.update({refreshToken: ''});
            }
        }
        throw new HttpException('Пользователь не найден.', HttpStatus.UNAUTHORIZED);
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw new HttpException('Пользователь не авторизован.', HttpStatus.UNAUTHORIZED);
        }
        const data = await this.validateToken(refreshToken);
        if (data) {
            const user = await this.userRepository.findByPk(data.id, {include: {all: true}});
            if (user) {
                const tokens = await this.generateTokens(user);
                await user.update({refreshToken: tokens.refreshToken});

                return tokens;
            }
        }
        throw new HttpException('Пользователь не авторизован.', HttpStatus.UNAUTHORIZED);
    }

    async saveToken(userId: string, token: string) {
        const user = await this.userRepository.findByPk(userId);
        if (user) {
            return await user.update({refreshToken: token});
        }
        throw new HttpException('Пользователь не найден.', HttpStatus.NOT_FOUND);
    }

    async validateToken(token: string) {
        try {
            const data = this.jwtService.verify(token);
            return data;
        } catch (e) {
            return null;
        }
    }

    private async generateTokens(user: ViewUserDto) {
        const payload = {email: user.email, id: user.id, roles: user.roles};
        const refreshPayload = {email: user.email, id: user.id}
        return {
            accessToken: this.jwtService.sign(payload, {expiresIn: '1d'}),
            refreshToken: this.jwtService.sign(refreshPayload, {expiresIn: '30d'})
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
