import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLearnModuleDto } from './dto/create-learn-module.dto';
import { ViewLearnModuleDto } from './dto/view-learn-modul.dto';
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
        if (course && course.userId === actor.id) {
            const id = uuidv1();
            const module = await this.learnModuleRepository.create({id, courseId, ...dto})
            return module;
        }
        throw new HttpException('Нет такого курса или у пользователя нет доступа к курса.',  HttpStatus.BAD_REQUEST);
    }

    
}
