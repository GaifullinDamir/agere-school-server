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
                const attempt = await this.attemptRepository.create({...dto, id, userId: actor.id, taskId});
                return new ViewAttemptDto(attempt);
            }
            throw new HttpException('Данный пользователь не имеет доступа к прохождению данного курса.', HttpStatus.FORBIDDEN);
        }
        throw new HttpException("Задача не найдена.", HttpStatus.NOT_FOUND);
    }
}
