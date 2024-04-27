import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LearnModule } from 'src/learn-modules/learn-modules.model';
import { v1 as uuidv1 } from 'uuid';
import { Lesson } from './lesson.model';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { LearnModulesService } from 'src/learn-modules/learn-modules.service';
import { ViewLessonDto } from './dto/view-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { ParsersService } from 'src/common/utils/parsers/parsers.service';

@Injectable()
export class LessonsService {
    constructor(@InjectModel(LearnModule) private learnModuleRepository: typeof LearnModule,
        @InjectModel(Lesson) private lessonRepository: typeof Lesson,
        private parserService: ParsersService) {}

        async create(actor: any, moduleId: string, dto: CreateLessonDto): Promise<ViewLessonDto> {
            const module = await this.learnModuleRepository.findByPk(moduleId);
            const role = actor.roles.find(role => role.value === 'admin');
            if (module) {
                if (module.course.userId === actor.id || role) {
                    const ytUrlId = this.parserService.parseYouTubeUrlToId(dto.ytVideoRef);
                    if (ytUrlId === '') throw new HttpException('Некорректная ссылка на видео YouTube.', HttpStatus.BAD_REQUEST);

                    const lessons = await this.lessonRepository.findAll();
                    const sortedLessons = lessons.sort((l1, l2) => l1.position - l2.position);
                    let position: number;
                    if (!sortedLessons.length) {
                        position = 0;
                    } else {
                        position = sortedLessons.pop().position + 1;
                    }
                    const id = uuidv1();
                    const lesson = await this.lessonRepository.create({...dto, id, moduleId, position, ytVideoRef: ytUrlId});
                    return new ViewLessonDto(lesson);
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

        async getById(lessonId: string): Promise<ViewLessonDto> {
            const lesson = await this.lessonRepository.findByPk(lessonId, {include: {all: true}});
            if (lesson) {
                return new ViewLessonDto(lesson);
            }
            throw new HttpException('Урок не найден.', HttpStatus.NOT_FOUND);
        }

        async update(id: string, dto: UpdateLessonDto, actor: any): Promise<ViewLessonDto>{
            const lesson = await this.lessonRepository.findOne({where: {id}, include: {all: true}});
            if (lesson) {
                const course = (await this.learnModuleRepository.findByPk(lesson.moduleId)).course;
                const role = actor.roles.find(role => role.value === 'admin');
                if (course.userId === actor.id || role) {
                    let ytUrlId: string; 
                    if (dto.ytVideoRef) {
                        ytUrlId = this.parserService.parseYouTubeUrlToId(dto.ytVideoRef);
                        if (ytUrlId === '') throw new HttpException('Некорректная ссылка на видео YouTube.', HttpStatus.BAD_REQUEST);
                    }
                    const message = await this.changePosition('update', lesson.moduleId, lesson.position, dto.position);
                    if (message) throw new HttpException(message, HttpStatus.BAD_REQUEST);
                    const result = await lesson.update({...dto, ytVideoRef: ytUrlId});
                    return new ViewLessonDto(result);
                }
                throw new HttpException('Нет доступа к уроку.', HttpStatus.FORBIDDEN);
            }
            throw new HttpException('Урок не найден.', HttpStatus.NOT_FOUND);
        }


        async delete(id: string, actor: any) {
            const lesson = await this.lessonRepository.findOne({where: {id}, include: {all: true}});
            if (lesson) {
                const course = (await this.learnModuleRepository.findByPk(lesson.moduleId)).course;
                const role = actor.roles.find(role => role.value === 'admin');
                if (course.userId === actor.id || role) {
                    const message = await this.changePosition('delete', lesson.moduleId, lesson.position);
                    if (message) throw new HttpException(message, HttpStatus.BAD_REQUEST);
                    return await lesson.destroy();
                }
                throw new HttpException('Нет доступа к уроку.', HttpStatus.FORBIDDEN);
            }
            throw new HttpException('Урок не найден.', HttpStatus.NOT_FOUND);
        }

        private async getAllLessonsByModuleId(moduleId: string) {
            const modules = await this.lessonRepository.findAll({where:{moduleId}});
            return modules;
        }

        private async changePosition(operatonType: string, moduleId: string, oldPosition: number, newPosition?: number | undefined,) {
            if (operatonType === 'update' && (newPosition || newPosition === 0) ) {
                if (newPosition < 0) return 'Позиция не может быть меньше 0.'
                const lessons = await this.getAllLessonsByModuleId(moduleId);
                if (newPosition > lessons.length - 1) return 'Позиция не должна быть больше, чем (количество уроков - 1).';
                
                if (newPosition != oldPosition) {
                    lessons.forEach( async lesson => {
                        if (newPosition > oldPosition) {
                            if (lesson.position >= oldPosition && lesson.position <= newPosition) {
                                await lesson.update({position: lesson.position - 1});
                            }
                        } else if (newPosition < oldPosition) {
                            if (lesson.position < oldPosition && lesson.position >= newPosition) {
                                await lesson.update({position: lesson.position + 1});
                            }
                        }
                    })
                }
            } else if (operatonType === 'delete') {
                const lessons = await this.getAllLessonsByModuleId(moduleId);
                lessons.forEach(async lesson => {
                    if (lesson.position > oldPosition) await lesson.update({position: lesson.position - 1});
                });
            }
        }
}
