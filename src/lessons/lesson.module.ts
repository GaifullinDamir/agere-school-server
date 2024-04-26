import { Module } from '@nestjs/common';
import { LessonsController } from './lesson.controller';
import { LessonsService } from './lesson.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { LearnModule } from 'src/learn-modules/learn-modules.model';
import { Lesson } from './lesson.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [LessonsController],
  providers: [LessonsService],
  imports: [
    SequelizeModule.forFeature([LearnModule, Lesson]),
    AuthModule
  ],
  exports: [LessonsService]
})
export class LessonsModule {}
