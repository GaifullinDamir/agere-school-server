import { MiddlewareConsumer, Module, NestModule, RequestMethod, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Role } from 'src/roles/roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserRoles } from 'src/roles/user-roles.model';
import { Course } from 'src/courses/courses.model';
import { FilesModule } from 'src/files/files.module';
import { UserCourses } from 'src/courses/user-courses.model.dto';
import { CoursesModule } from 'src/courses/courses.module';;
import { Attempt } from 'src/attempts/attempts.model';
import { AttemptsModule } from 'src/attempts/attempts.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Course, UserCourses, Attempt]),
    RolesModule,
    FilesModule,
    forwardRef(() => AuthModule),
    forwardRef(() => CoursesModule),
    AttemptsModule
  ],
  exports: [
    UsersService, 
  ]
})
export class UsersModule {}
