import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { v1 as uuidv1} from 'uuid';
import { FilesService } from 'src/files/files.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { ViewUserDto } from './dto/view-user.dto';
import { PickupRoleDto } from './dto/pickup-role.dto';
import { CoursesService } from 'src/courses/courses.service';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
        private rolesService: RolesService,
        private filesService: FilesService,
        private coursesService: CoursesService) {
    }
    async create(dto: CreateUserDto) : Promise<ViewUserDto>{
        const id = uuidv1();
        const user = await this.userRepository.create({...dto, id});
        const role = await this.rolesService.getByValue("user");
        await user.$set('roles', [role.id]);
        const updatedUser = await this.userRepository.findOne({where: {id}, include: {all: true}}); 
        return new ViewUserDto(updatedUser);
    }

    async getAll(): Promise<ViewUserDto[]>{
        const users = await this.userRepository.findAll({
            include: {all: true}
        });
        return users.map(user => new ViewUserDto(user))
    }

    async getByEmail(email: string) : Promise<ViewUserDto>{
        const user = await this.userRepository.findOne({
            where:{email},
            include: {all: true}
        });
        // console.log(user);
        if (user) {
            return new ViewUserDto(user);
        }
        throw new HttpException('Пользователь не найден.', HttpStatus.NOT_FOUND);
        
    }

    async getById(id: string): Promise<ViewUserDto> {
        const user = await this.userRepository.findOne({where: {id}, include: {all: true}});
        return new ViewUserDto(user);
    }

    async update(id: string, dto: UpdateUserDto, actor: any, file?: Express.Multer.File): Promise<Number[]> {
        const role = actor.roles.find(role => role.value === 'admin');
        if (role || id === actor.id) {
            const fileName = file ? await this.filesService.create(file) : null;
            const result = await this.userRepository.update(
                {
                    ...dto, id, logo: fileName ? fileName : dto.logo, password: dto.password ? await bcrypt.hash(dto.password, 5) : dto.password
                },
                {where: {id}}
            )
            return result;
        }
        throw new HttpException('Данный пользователь не доступен.', HttpStatus.FORBIDDEN);
    }

    async delete(id: string, actor: any) :Promise<Number> {
        const role = actor.roles.find(role => role.value === 'admin');
        if (role || id === actor.id) {
            return await this.userRepository.destroy({where: {id}});
        }
        throw new HttpException('Нет доступа к данному пользователю.', HttpStatus.FORBIDDEN);
    }

    async addRole(userId: string, dto: AddRoleDto): Promise<AddRoleDto> {
        const user = await this.userRepository.findByPk(userId);
        const role = await this.rolesService.getByValue(dto.value);
        if (role && user) {
            await user.$add('roles', role.id);
            return dto;
        }
        throw new HttpException('Пользователь или роль не найдены.', HttpStatus.NOT_FOUND);
    }

    async pickupRole(id: string, dto: PickupRoleDto): Promise<PickupRoleDto> {
        const user = await this.userRepository.findByPk(id);
        const role = await this.rolesService.getByValue(dto.value);
        if (role && user) {

            await user.$remove('roles', role.id);
            return dto;
        }
        throw new HttpException('Пользователь или роли не найдены.', HttpStatus.NOT_FOUND);
    }

    async subscribeToCourse(courseId: string, actorId: string) {
        const user = await this.userRepository.findByPk(actorId);
        const course = await this.coursesService.getById(courseId);
        if (course && user) {
            console.log(course)
            return await user.$add('studentCourses', course.id);
            
        }
        throw new HttpException('Пользователь или курс не найдены.', HttpStatus.NOT_FOUND);
    }
}
