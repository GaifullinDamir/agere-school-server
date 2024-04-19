import { MiddlewareConsumer, Module, NestModule, RequestMethod, forwardRef } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Course } from './courses.model';
import { FilesModule } from 'src/files/files.module';
import { UsersModule } from 'src/users/users.module';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [CoursesService],
  controllers: [CoursesController],
  imports: [
    SequelizeModule.forFeature([User, Course]),
    FilesModule,
    UsersModule,
    RolesModule,
    forwardRef(() => AuthModule)
  ],
  exports: [CoursesService]
})

export class CoursesModule {}