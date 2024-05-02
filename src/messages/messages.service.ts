import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './messages.model';
import { Lesson } from 'src/lessons/lesson.model';
import { CreateMessageDto } from './dto/create-message.dto';
import { ViewMessageDto } from './dto/view-message.dto';
import { UserCourses } from 'src/courses/user-courses.model.dto';
import { v1 as uuidv1 } from 'uuid';

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
}
