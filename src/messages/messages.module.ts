import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Lesson } from 'src/lessons/lesson.model';
import { User } from 'src/users/users.model';
import { Message } from './messages.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService],
  imports: [
    SequelizeModule.forFeature([Lesson, User, Message]),
    AuthModule
  ]
})
export class MessagesModule {}
