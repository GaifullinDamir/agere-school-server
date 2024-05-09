import { Module, forwardRef } from '@nestjs/common';
import { AttemptsController } from './attempts.controller';
import { AttemptsService } from './attempts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Task } from 'src/tasks/tasks.model';
import { Attempt } from './attempts.model';
import { AuthModule } from 'src/auth/auth.module';
import { TasksModule } from 'src/tasks/tasks.module';
import { UsersModule } from 'src/users/users.module';
import { UserCourses } from 'src/courses/user-courses.model.dto';
import { Course } from 'src/courses/courses.model';
import { LearnModule } from 'src/learn-modules/learn-modules.model';

@Module({
  controllers: [AttemptsController],
  providers: [AttemptsService],
  imports: [
    SequelizeModule.forFeature([User, Task, Attempt, UserCourses, Course, LearnModule]),
    AuthModule
  ]
})
export class AttemptsModule {}
