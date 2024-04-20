import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { v1 as uuidv1 } from 'uuid';
import { ViewRoleDto } from './dto/view-role.dto';

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

    async create(dto: CreateRoleDto): Promise<ViewRoleDto> {
        const id = uuidv1();
        const role = await this.roleRepository.create({...dto, id});
        return new ViewRoleDto(role);
    }

    async getByValue(value: string): Promise<ViewRoleDto>{
        const role = await this.roleRepository.findOne({where: {value}});
        return new ViewRoleDto(role);
    }
}
