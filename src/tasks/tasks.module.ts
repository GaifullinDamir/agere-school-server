import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Lesson } from 'src/lessons/lesson.model';
import { LessonsModule } from 'src/lessons/lesson.module';
import { AuthModule } from 'src/auth/auth.module';
import { Task } from './tasks.model';
import { Course } from 'src/courses/courses.model';
import { CoursesModule } from 'src/courses/courses.module';

@Module({
  providers: [TasksService],
  controllers: [TasksController],
  imports: [
    SequelizeModule.forFeature([Lesson, Task, Course]),
    AuthModule,
    LessonsModule
  ],
  exports: [TasksService]
})
export class TasksModule {}
