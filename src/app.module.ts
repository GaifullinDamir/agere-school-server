import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { Course } from "./courses/courses.model";
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";
import { UserCourses } from "./courses/user-courses.model.dto";
import { LearnModule } from "./learn-modules/learn-modules.model";
import { LearnModulesModule } from "./learn-modules/learn-modules.module";
import { LessonsModule } from './lessons/lesson.module';
import { Lesson } from "./lessons/lesson.model";
import { ParsersModule } from "./common/utils/parsers/parsers.module";
import { TasksModule } from './tasks/tasks.module';
import { Task } from "./tasks/tasks.model";
import { AttemptsModule } from './attempts/attempts.module';
import { Attempt } from "./attempts/attempts.model";
import { MessagesModule } from './messages/messages.module';
import { Message } from "./messages/messages.model";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
          dialect: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: Number(process.env.POSTGRES_PORT),
          username: process.env.POSTGRES_USERNAME,
          password: process.env.POSTGRES_PASSWORD ,
          database: process.env.POSTGRES_DATABASE,
          models: [User, Role, UserRoles, Course, UserCourses, LearnModule, Lesson, Task, Attempt, Message],
          autoLoadModels: true
        }),
        ServeStaticModule.forRoot({
          rootPath: path.resolve(__dirname, '..',  'static'),
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        CoursesModule,
        FilesModule,
        LearnModulesModule,
        LessonsModule,
        ParsersModule,
        TasksModule,
        AttemptsModule,
        MessagesModule
      ]
})
export class AppModule {
}