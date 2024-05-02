import { Module } from '@nestjs/common';
import { LessonsController } from './lesson.controller';
import { LessonsService } from './lesson.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { LearnModule } from 'src/learn-modules/learn-modules.model';
import { Lesson } from './lesson.model';
import { AuthModule } from 'src/auth/auth.module';
import { LearnModulesModule } from 'src/learn-modules/learn-modules.module';
import { ParsersModule } from 'src/common/utils/parsers/parsers.module';
import { Message } from 'src/messages/messages.model';

@Module({
  controllers: [LessonsController],
  providers: [LessonsService],
  imports: [
    SequelizeModule.forFeature([LearnModule, Lesson, Message]),
    AuthModule,
    LearnModulesModule,
    ParsersModule
  ],
  exports: [LessonsService]
})
export class LessonsModule {}
