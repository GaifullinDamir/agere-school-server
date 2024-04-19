import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { v1 as uuidv1} from 'uuid';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                    private roleService: RolesService) {
    }
    async create(dto: CreateUserDto) {
        const id = uuidv1();
        const user = await this.userRepository.create({...dto, id});
        const role = await this.roleService.getByValue("user");
        await user.$set('roles', [role.id]);
        user.roles = [role];
        return user;
    }

    async getAll() {
        const users = await this.userRepository.findAll({
            include: {all: true}
        });
        return users;
    }

    async getByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where:{email},
            include: {all: true}
        });
        return user;
    }

    async getById(id: string) {
        const user = await this.userRepository.findOne({where: {id}});
        return user;
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getByValue(dto.value);
        if (role && user) {
            await user.$add('role', role.id);
            return dto;
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
    }
}
