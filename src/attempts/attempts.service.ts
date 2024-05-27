import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { v1 as uuidv1 } from 'uuid';
import { Attempt } from './attempts.model';
import { CreateAttemptDto } from './dto/create-attempt.dto';
import { Task } from 'src/tasks/tasks.model';
import { ViewAttemptDto } from './dto/view-attempt.dto';
import { UserCourses } from 'src/courses/user-courses.model.dto';
import { Course } from 'src/courses/courses.model';
import { LearnModule } from 'src/learn-modules/learn-modules.model';
import { UpdateAttemptDto } from './dto/update-attempt.dto';

@Injectable()
export class AttemptsService {
    constructor(@InjectModel(Attempt) private attemptRepository: typeof Attempt,
        @InjectModel(Task) private taskRepository: typeof Task,
        @InjectModel(UserCourses) private userCoursesRepository: typeof UserCourses,
        @InjectModel(Course) private courseRepository: typeof Course,
        @InjectModel(LearnModule) private learnModuleRepository: typeof LearnModule) {}

    async create(actor: any, taskId: string, dto: CreateAttemptDto): Promise<ViewAttemptDto> {
        const task = await this.taskRepository.findByPk(taskId, {include: {all: true}});
        if (task) {
            const module = await this.learnModuleRepository.findByPk(task.lesson.moduleId, {include: {all: true}});
            const course = module.course;
            const userCourseInfo = await this.userCoursesRepository.findAll({where: {
                userId: actor.id,
                courseId: course.id
            }});
            if (userCourseInfo) {
                const id = uuidv1();
                const attempt = await this.attemptRepository.findOne({where: {
                    userId: actor.id,
                    taskId
                }});
                if (attempt) {
                    throw new HttpException('Такая попытка уже есть.', HttpStatus.BAD_REQUEST);
                }
                const newAttempt = await this.attemptRepository.create({...dto, id, userId: actor.id, taskId});
                return new ViewAttemptDto(newAttempt);
            }
            throw new HttpException('Данный пользователь не имеет доступа к прохождению данного курса.', HttpStatus.FORBIDDEN);
        }
        throw new HttpException("Задача не найдена.", HttpStatus.NOT_FOUND);
    }

    async getAllByLessonId(actor: any, lessonId: string): Promise<ViewAttemptDto[]> {
        const tasks = await this.taskRepository.findAll({
            where: {lessonId: lessonId},
            include: {all: true}
        });

        if (tasks.length) {
            let attempts = [];
            attempts = tasks.map(async (task) => {
                const attempt = await this.attemptRepository.findOne({where: {
                    userId: actor.id,
                    taskId: task.id
                }});
                
                if (attempt) {
                    return new ViewAttemptDto(attempt);
                }
            })
            let result = await Promise.all(attempts);
            result = result.filter(item => item);
            console.log(result)
            return result;
        }
        return [];
    } 

    async getByTaskId(actor: any, taskId: string): Promise<ViewAttemptDto> {
        const attempt = await this.attemptRepository.findOne({where: {
            userId: actor.id,
            taskId
        }});
        if (attempt) {
            return new ViewAttemptDto(attempt);
        }
        // throw new HttpException('Попытка не найдена.', HttpStatus.NOT_FOUND);
    }

    async update(actor: any, taskId: string, dto: UpdateAttemptDto) {
        const task = await this.taskRepository.findByPk(taskId, {include: {all: true}});
        if (task) {
            
            const module = await this.learnModuleRepository.findByPk(task.lesson.moduleId, {include: {all: true}});
            const course = module.course;
            const userCourseInfo = await this.userCoursesRepository.findAll({where: {
                userId: actor.id,
                courseId: course.id
            }});
            
            if (userCourseInfo) {
                
                const attempt = await this.attemptRepository.findOne({where: {
                    userId: actor.id,
                    taskId
                }})
                if (attempt) {
                    console.log(dto)
                    return new ViewAttemptDto(await attempt.update({...dto}));
                }
                throw new HttpException('Попытка не найдена', HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Данный пользователь не имеет доступа к прохождению данного курса.', HttpStatus.FORBIDDEN);
        }
        throw new HttpException("Задача не найдена.", HttpStatus.NOT_FOUND);
    }
}
