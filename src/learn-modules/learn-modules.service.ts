import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLearnModuleDto } from './dto/create-learn-module.dto';
import { ViewLearnModuleDto } from './dto/view-learn-module.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from 'src/courses/courses.model';
import { v1 as uuidv1 } from 'uuid';
import { LearnModule } from './learn-modules.model';
import { UpdatetLearnModuleDto } from './dto/update-learn-module.dto';

@Injectable()
export class LearnModulesService {
    constructor(@InjectModel(Course) private courseRepository: typeof Course,
        @InjectModel(LearnModule) private learnModuleRepository: typeof LearnModule) {}

    async create(actor: any, courseId: string, dto: CreateLearnModuleDto): Promise<LearnModule> {
        const course = await this.courseRepository.findOne({where: {id: courseId}});
        console.log(course)
        if (course && course.userId === actor.id) {
            
            const modules = await this.learnModuleRepository.findAll();
            let position: number; 
            if(!modules.length) {
                position = 0;
            } else {
                position = modules.pop().position + 1;
            }
            const id = uuidv1();
            const module = await this.learnModuleRepository.create({id, courseId, position, ...dto})
            return module;
        }
        throw new HttpException('Нет такого курса или у пользователя нет доступа к курса.',  HttpStatus.BAD_REQUEST);
    }

    async getAll(courseId: string): Promise<ViewLearnModuleDto[]> {
        const modules = await this.learnModuleRepository.findAll({where: {courseId}, include: {all: true}});
        if (modules.length) {
            return modules.map(module => new ViewLearnModuleDto(module)).sort((module1, module2) => {
                return module1.position - module2.position;
            });
        }
        throw new HttpException('Модули не найдены.', HttpStatus.NOT_FOUND);
    }

    async getById(moduleId: string): Promise<ViewLearnModuleDto> {
        const module = await this.learnModuleRepository.findByPk(moduleId, {include: {all: true}});
        if (module) {
            return new ViewLearnModuleDto(module);
        }
        throw new HttpException('Модуль не найден.', HttpStatus.NOT_FOUND);
    }

    async update(id: string, dto: UpdatetLearnModuleDto, actor: any): Promise<LearnModule> {
        const module = await this.learnModuleRepository.findOne({where:{id}});
        if (module) {
            const course = await this.courseRepository.findOne({where:{id: module.courseId}});
            const role = actor.roles.find(role => role.value === 'admin');
            if (course.userId === actor.id || role) {
                const message = await this.changePosition( 'update', module.courseId,  module.position, dto.position );
                if (message) throw new HttpException(message, HttpStatus.BAD_REQUEST);
                return await module.update({...dto});
            }
            throw new HttpException('Нет доступа к модулю.', HttpStatus.FORBIDDEN);
        }
        throw new HttpException('Модуль не найден.', HttpStatus.NOT_FOUND);
    }


    async delete(id: string, actor: any) {
        const module = await this.learnModuleRepository.findOne({where:{id}});
        if (module) {
            const course = await this.courseRepository.findOne({where:{id: module.courseId}});
            const role = actor.roles.find(role => role.value === 'admin');
            if (course.userId === actor.id || role) {
                const message = await this.changePosition('delete', module.courseId, module.position);
                if (message) throw new HttpException(message, HttpStatus.BAD_REQUEST);
                return await module.destroy();
            }
            throw new HttpException('Нет доступа к модулю.', HttpStatus.FORBIDDEN);
        }
        throw new HttpException('Модуль не найден.', HttpStatus.NOT_FOUND);
    }

    private async getAllModulesByCourseId(courseId: string) {
        const modules = await this.learnModuleRepository.findAll({where:{courseId}});
        return modules;
    }

    private async changePosition(operatonType: string, courseId: string, oldPosition: number, newPosition?: number | undefined,) {
        if (operatonType === 'update' && (newPosition || newPosition === 0) ) {
            if (newPosition < 0) return 'Позиция не может быть меньше 0.'
            const modules = await this.getAllModulesByCourseId(courseId);
            if (newPosition > modules.length - 1) return 'Позиция не должна быть больше, чем количество модулей - 1.';
            
            if (newPosition != oldPosition) {
                modules.forEach( async module => {
                    if (newPosition > oldPosition) {
                        if (module.position >= oldPosition && module.position <= newPosition) {
                            await module.update({position: module.position - 1});
                        }
                    } else if (newPosition < oldPosition) {
                        if (module.position < oldPosition && module.position >= newPosition) {
                            await module.update({position: module.position + 1});
                        }
                    }
                })
            }
        } else if (operatonType === 'delete') {
            const modules = await this.getAllModulesByCourseId(courseId);
            modules.forEach(async module => {
                if (module.position > oldPosition) await module.update({position: module.position - 1});
            });
        }
    }
}
