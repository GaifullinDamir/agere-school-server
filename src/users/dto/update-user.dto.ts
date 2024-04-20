import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Course } from "src/courses/courses.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

export class UpdateUserDto {
    @ApiProperty({example: 'Name', description: 'Имя пользователя.'})
    name: string;

    @ApiProperty({example: 'Surname', description: 'Фамилия пользователя.'})
    surname: string;

    @ApiProperty({example: 'Patronimic', description: 'Отчество пользователя.'})
    patronimic: string;

    @ApiProperty({example: 'image.jpeg', description: 'Фотография пользователя.'})
    logo: string;

    @ApiProperty({example: 'name@gmail.com', description: 'Почта пользователя.'})
    email: string;

    @ApiProperty({example: 'password', description: 'Пароль пользователя.'})
    password: string;
}