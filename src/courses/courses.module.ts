import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Course } from './courses.model';
import { SetUuidMiddleware } from 'src/middlewares/set-uuid.middleware';
import { FilesModule } from 'src/files/files.module';

@Module({
  providers: [CoursesService],
  controllers: [CoursesController],
  imports: [
    SequelizeModule.forFeature([User, Course]),
    FilesModule,
  ],
  exports: [CoursesService]
})

export class CoursesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SetUuidMiddleware)
      .forRoutes({
        path: 'courses',
        method: RequestMethod.POST
      })
  }
}