import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Lesson } from 'src/lessons/lesson.model';
import { Task } from './tasks.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTaskDto } from './dto/create-task.dto';
import { ViewTaskDto } from './dto/view-task.dto';
import { v1 as uuidv1 } from 'uuid';
import { Course } from 'src/courses/courses.model';
import { UpdateTaskDto } from './dto/update-task.dto';
import { LearnModule } from 'src/learn-modules/learn-modules.model';

@Injectable()
export class TasksService {
    constructor(@InjectModel(Lesson) private lessonRepository: typeof Lesson,
        @InjectModel(Task) private taskRepository: typeof Task,
        @InjectModel(Course) private courseRepository: typeof Course,
        @InjectModel(LearnModule) private learnModuleRepository: typeof LearnModule) {}
    
    async create(actor: any, lessonId: string, dto: CreateTaskDto): Promise<ViewTaskDto> {
        const lesson = await this.lessonRepository.findByPk(lessonId, {include: {all: true}});
        if (lesson) {
            const role = actor.roles.find(role => role.value === 'admin');
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

    async getAll(lessonId: string): Promise<ViewTaskDto[]> {
        const tasks = await this.taskRepository.findAll({where: {lessonId}, include: {all: true}});
        if (tasks.length) {
            return tasks.map(task => new ViewTaskDto(task)).sort((t1, t2) => t1.position - t2.position);
        }
        throw new HttpException('Задачи не найдены.', HttpStatus.NOT_FOUND);
    }

    async getById(taskId: string): Promise<ViewTaskDto> {
        const task = await this.taskRepository.findByPk(taskId, {include: {all: true}});
        if (task) {
            return new ViewTaskDto(task);
        }
        throw new HttpException('Задание не найдено.', HttpStatus.NOT_FOUND);
    }

    async update(id: string, dto: UpdateTaskDto, actor: any): Promise<ViewTaskDto>  {
        const task = await this.taskRepository.findByPk(id, {include: {all: true}});
        if (task) {
            const role = actor.roles.find(role => role.value === 'admin');
            const module = await this.learnModuleRepository.findByPk(task.lesson.moduleId, {include: {all: true}});
            const course = module.course;
            if (course.userId === actor.id || role) {
                const message = await this.changePosition('update', task.lessonId, task.position, dto.position);
                if (message) throw new HttpException(message, HttpStatus.BAD_REQUEST);
                const result = await task.update({...dto});
                return new ViewTaskDto(result);
            }
            throw new HttpException('Данное задание не доступно этому пользователю.', HttpStatus.FORBIDDEN);
        }
        throw new HttpException('Задание не найдено.', HttpStatus.NOT_FOUND);
    }

    async delete(id: string, actor: any) {
        const task = await this.taskRepository.findByPk(id, {include: {all: true}});
        if (task) {
            const role = actor.roles.find(role => role.value === 'admin');
            const module = await this.learnModuleRepository.findByPk(task.lesson.moduleId, {include: {all: true}});
            const course = module.course;
            if (course.userId === actor.id || role) {
                const message = await this.changePosition('delete', task.lessonId, task.position);
                if (message) throw new HttpException(message, HttpStatus.BAD_REQUEST);
                return await task.destroy();
            }
            throw new HttpException('Данное задание не доступно этому пользователю.', HttpStatus.FORBIDDEN);
        }
        throw new HttpException('Задание не найдено.', HttpStatus.NOT_FOUND);
    }

    private async getAllTaskByLessonId(lessonId: string) {
        const tasks = await this.taskRepository.findAll({where:{lessonId}});
        return tasks;
    }

    private async changePosition(operatonType: string, lessonId: string, oldPosition: number, newPosition?: number | undefined,) {
        if (operatonType === 'update' && (newPosition || newPosition === 0) ) {
            if (newPosition < 0) return 'Позиция не может быть меньше 0.'
            const tasks = await this.getAllTaskByLessonId(lessonId);
            if (newPosition > tasks.length - 1) return 'Позиция не должна быть больше, чем (количество элементов - 1).';
            
            if (newPosition != oldPosition) {
                tasks.forEach( async task => {
                    if (newPosition > oldPosition) {
                        if (task.position >= oldPosition && task.position <= newPosition) {
                            await task.update({position: task.position - 1});
                        }
                    } else if (newPosition < oldPosition) {
                        if (task.position < oldPosition && task.position >= newPosition) {
                            await task.update({position: task.position + 1});
                        }
                    }
                })
            }
        } else if (operatonType === 'delete') {
            const tasks = await this.getAllTaskByLessonId(lessonId);
            tasks.forEach(async task => {
                if (task.position > oldPosition) await task.update({position: task.position - 1});
            });
        }
    }
}
