import { Module } from '@nestjs/common';
import { AttemptsController } from './attempts.controller';
import { AttemptsService } from './attempts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Task } from 'src/tasks/tasks.model';
import { Attempt } from './attempts.model';
import { AuthModule } from 'src/auth/auth.module';
import { TasksModule } from 'src/tasks/tasks.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AttemptsController],
  providers: [AttemptsService],
  imports: [
    SequelizeModule.forFeature([User, Task, Attempt]),
    AuthModule,
    TasksModule,
    UsersModule
  ]
})
export class AttemptsModule {}
