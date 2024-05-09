import { Module, NestModule, RequestMethod, forwardRef } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Course } from './courses.model';
import { FilesModule } from 'src/files/files.module';
import { UsersModule } from 'src/users/users.module';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserCourses } from './user-courses.model.dto';
import { LearnModule } from 'src/learn-modules/learn-modules.model';

@Module({
  providers: [CoursesService],
  controllers: [CoursesController],
  imports: [
    SequelizeModule.forFeature([User, Course, UserCourses, LearnModule]),
    FilesModule,
    AuthModule
  ],
  exports: [CoursesService]
})

export class CoursesModule {}