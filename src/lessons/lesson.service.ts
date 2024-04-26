import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LearnModule } from 'src/learn-modules/learn-modules.model';
import { v1 as uuidv1 } from 'uuid';
import { Lesson } from './lesson.model';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { LearnModulesService } from 'src/learn-modules/learn-modules.service';
import { ViewLessonDto } from './dto/view-lesson.dto';

@Injectable()
export class LessonsService {
    constructor(@InjectModel(LearnModule) private learnModuleRepository: typeof LearnModule,
        @InjectModel(Lesson) private lessonRepository: typeof Lesson,
        private learnModuleService: LearnModulesService) {}

        async create(actor: any, moduleId: string, dto: CreateLessonDto): Promise<Lesson> {
            const module = await this.learnModuleService.getById(moduleId);
            const role = actor.roles.find(role => role.value === 'admin');
            if (module) {
                if (module.course.userId === actor.id || role) {
                    const lessons = await this.lessonRepository.findAll();
                    let position: number;
                    if (!lessons.length) {
                        position = 0;
                    } else {
                        position = lessons.pop().position + 1;
                    }
                    const id = uuidv1();
                    return await this.lessonRepository.create({id, moduleId, position, ...dto});
                }
                throw new HttpException('Данный модуль не достпуен этому пользователю.', HttpStatus.FORBIDDEN);
            }
            throw new HttpException('Модуль не найден', HttpStatus.NOT_FOUND);
        }

        async getAll(moduleId: string): Promise<ViewLessonDto[]> {
            const lessons = await this.lessonRepository.findAll({where: {moduleId}, include: {all: true}});
            if (lessons.length) {
                return lessons.map(lesson => new ViewLessonDto(lesson)).sort((l1, l2) => l1.position - l2.position);
            } 
            throw new HttpException('Уроки не найдены.', HttpStatus.NOT_FOUND)
        }
}
