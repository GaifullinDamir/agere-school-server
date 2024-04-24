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

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Course, UserCourses]),
    RolesModule,
    FilesModule,
    forwardRef(() => AuthModule)
  ],
  exports: [
    UsersService, 
  ]
})
export class UsersModule {}
