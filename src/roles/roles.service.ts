import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { v1 as uuidv1 } from 'uuid';
import { ViewRoleDto } from './dto/view-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

    async create(dto: CreateRoleDto): Promise<ViewRoleDto> {
        const id = uuidv1();
        const role = await this.roleRepository.create({...dto, id});
        return new ViewRoleDto(role);
    }

    async getAll(): Promise<ViewRoleDto[]> {
        const roles = await this.roleRepository.findAll({
            include: {all: true}
        });
        return roles.map(role => new ViewRoleDto(role));
    }

    async getByValue(value: string): Promise<ViewRoleDto>{
        const role = await this.roleRepository.findOne({
            where: {value},
            include: {all: true}
        });
        return new ViewRoleDto(role);
    }

    async update(id: string, dto: UpdateRoleDto): Promise<Number[]>{
        const result = await this.roleRepository.update({...dto}, {where: {id}});
        return result;
    }

    async delete(id: string): Promise<Number> {
        const result = await this.roleRepository.destroy({where: {id}});
        return result;
    }
}
