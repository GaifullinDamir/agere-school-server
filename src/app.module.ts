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
          models: [User, Role, UserRoles, Course],
          autoLoadModels: true
        }),
        ServeStaticModule.forRoot({
          rootPath: path.resolve(__dirname, 'static'),
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        CoursesModule,
        FilesModule,
      ]
})
export class AppModule {

}