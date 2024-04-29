import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Lesson } from 'src/lessons/lesson.model';
import { Task } from './tasks.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTaskDto } from './dto/create-task.dto';
import { ViewTaskDto } from './dto/view-task.dto';
import { v1 as uuidv1 } from 'uuid';
import { Course } from 'src/courses/courses.model';

@Injectable()
export class TasksService {
    constructor(@InjectModel(Lesson) private lessonRepository: typeof Lesson,
        @InjectModel(Task) private taskRepository: typeof Task,
        @InjectModel(Course) private courseRepository: typeof Course) {}
    
    async create(actor: any, lessonId: string, dto: CreateTaskDto): Promise<ViewTaskDto> {
        const lesson = await this.lessonRepository.findByPk(lessonId, {include: {all: true}});
        if (lesson) {
            const role = actor.roles.find(role => role.value === 'admin');
            // console.log(lesson.module)
            const course = await this.courseRepository.findByPk(lesson.module.courseId, {include: {all: true}});
            if (course.userId === actor.id || role) {
                const tasks = await this.taskRepository.findAll({where:{lessonId}});
                const sortedTasks = tasks.sort((t1, t2) => t1.position - t2.position);
                let position: number;
                if (!sortedTasks.length) {
                    position = 0;
                } else {
                    position = sortedTasks[sortedTasks.length - 1].position + 1;
                }
                const id = uuidv1();
                const task = await this.taskRepository.create({...dto, id, lessonId, position});
                return new ViewTaskDto(task);
            }
            throw new HttpException('Данный урок не доступен этому пользователю.', HttpStatus.FORBIDDEN);
        }
        throw new HttpException('Урок не найден.', HttpStatus.NOT_FOUND);
    }
}
