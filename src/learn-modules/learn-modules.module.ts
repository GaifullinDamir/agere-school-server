import { Module } from '@nestjs/common';
import { LearnModulesController } from './learn-modules.controller';
import { LearnModulesService } from './learn-modules.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Course } from 'src/courses/courses.model';
import { LearnModule } from './learn-modules.model';
import { AuthModule } from 'src/auth/auth.module';
import { CoursesModule } from 'src/courses/courses.module';

@Module({
  controllers: [LearnModulesController],
  providers: [LearnModulesService],
  imports: [
    SequelizeModule.forFeature([Course, LearnModule]),
    AuthModule,
    CoursesModule
  ],
  exports: [LearnModulesService]
})
export class LearnModulesModule {}
