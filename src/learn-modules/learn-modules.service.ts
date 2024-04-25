import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLearnModuleDto } from './dto/create-learn-module.dto';
import { ViewLearnModuleDto } from './dto/view-learn-module.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from 'src/courses/courses.model';
import { v1 as uuidv1 } from 'uuid';
import { LearnModule } from './learn-modules.model';

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
}
