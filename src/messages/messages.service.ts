import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './messages.model';
import { Lesson } from 'src/lessons/lesson.model';
import { CreateMessageDto } from './dto/create-message.dto';
import { ViewMessageDto } from './dto/view-message.dto';
import { UserCourses } from 'src/courses/user-courses.model.dto';
import { v1 as uuidv1 } from 'uuid';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
    constructor(@InjectModel(Message) private messageRepository: typeof Message,
        @InjectModel(Lesson) private lessonRepository: typeof Lesson,
        @InjectModel(UserCourses) private userCourseRepository: typeof UserCourses) {}
    
    async create(actor: any, lessonId: string, dto: CreateMessageDto): Promise<ViewMessageDto>{
        const lesson = await this.lessonRepository.findByPk(lessonId, {include: {all: true}});
        if (lesson) {
            const userCourseInfo = await this.userCourseRepository.findOne({where: {
                userId: actor.id,
                courseId: lesson.module.courseId
            }})
            if (userCourseInfo) {
                const id = uuidv1();
                const message = await this.messageRepository.create({...dto, id, userId: actor.id, lessonId});
                if (message) {
                    return new ViewMessageDto(message);
                }
                throw new HttpException('Не удалось создать сообщение.', HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Пользователь не подписан на курс.', HttpStatus.FORBIDDEN);
        }
        throw new HttpException('Урок не найден.', HttpStatus.NOT_FOUND);
    }

    async getAll(actor: any, lessonId: string): Promise<ViewMessageDto[]> {
        const lesson = await this.lessonRepository.findByPk(lessonId, {include: {all: true}});
        if (lesson) {
            const userCourseInfo = await this.userCourseRepository.findOne({where: {
                userId: actor.id,
                courseId: lesson.module.courseId
            }})
            if (userCourseInfo) {
                const messages = await this.messageRepository.findAll({where: {
                        userId: actor.id,
                        lessonId
                    },
                        include: {all: true}
                });
                if (messages.length) {
                    return messages.map(message => new ViewMessageDto(message));
                }
                return [];
            }
            throw new HttpException('Пользователь не подписан на курс.', HttpStatus.FORBIDDEN);
        }
        throw new HttpException('Урок не найден.', HttpStatus.NOT_FOUND);
    }

    async getAllWithPagination(actor: any, lessonId: string, page: number, size: number): Promise<{rows: ViewMessageDto[], count: number}> {
        const limit = size;
        const offset = (page - 1) * size;
        const lesson = await this.lessonRepository.findByPk(lessonId, {include: {all: true}});
        if (lesson) {
            const userCourseInfo = await this.userCourseRepository.findOne({where: {
                userId: actor.id,
                courseId: lesson.module.courseId
            }})
            if (userCourseInfo) {
                const messages = await this.messageRepository.findAndCountAll({
                        where: {
                            userId: actor.id,
                            lessonId
                        },
                        limit: limit,
                        offset: offset,
                        include: {all: true}
                });
                const messagesViews = {rows: [], count: 0};
                if (messages.count) {
                    messages.rows.forEach(message => {
                        messagesViews.rows.push(new ViewMessageDto(message));
                    });
                    messagesViews.count = messages.count;
                }
                return messagesViews;
            }
            throw new HttpException('Пользователь не подписан на курс.', HttpStatus.FORBIDDEN);
        }
        throw new HttpException('Урок не найден.', HttpStatus.NOT_FOUND);

    }

    async update(actor: any, messageId: string, dto: UpdateMessageDto): Promise<ViewMessageDto> {
        const message = await this.messageRepository.findByPk(messageId, {include: {all: true}});
        if (message) {
            const lesson = await this.lessonRepository.findByPk(message.lessonId, {include: {all: true}});
            if (lesson) {
                const userCourseInfo = await this.userCourseRepository.findOne({where: {
                    userId: actor.id,
                    courseId: lesson.module.courseId
                }})
                if (userCourseInfo) {
                    const updatedMessage = await message.update(
                        {...dto},
                        {
                            where: {
                                userId: actor.id,
                                lessonId: message.lessonId
                            }
                        });
                    return new ViewMessageDto(updatedMessage);

                }
                throw new HttpException('Пользователь не подписан на курс.', HttpStatus.FORBIDDEN);
            }
            throw new HttpException('Урок не найден.', HttpStatus.NOT_FOUND);
        }
        throw new HttpException('Сообщение не найдено', HttpStatus.NOT_FOUND);
    }

    async delete(actor: any, messageId: string) {
        const message = await this.messageRepository.findByPk(messageId, {include: {all: true}});
        if (message) {
            const lesson = await this.lessonRepository.findByPk(message.lessonId, {include: {all: true}});
            if (lesson) {
                const userCourseInfo = await this.userCourseRepository.findOne({where: {
                    userId: actor.id,
                    courseId: lesson.module.courseId
                }})
                const role = actor.roles.find(role => role.value === 'admin');
                if (userCourseInfo || role) {
                    return await message.destroy();

                }
                throw new HttpException('Пользователь не подписан на курс.', HttpStatus.FORBIDDEN);
            }
            throw new HttpException('Урок не найден.', HttpStatus.NOT_FOUND);
        }
        throw new HttpException('Сообщение не найдено', HttpStatus.NOT_FOUND);
    }
}
