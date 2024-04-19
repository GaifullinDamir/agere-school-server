import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { v1 as uuidv1 } from 'uuid';

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

    async create(dto: CreateRoleDto) {
        const id = uuidv1();
        const role = await this.roleRepository.create({...dto, id});
        return role;
    }

    async getByValue(value: string) {
        const role = await this.roleRepository.findOne({where: {value}});
        return role;
    }
}
