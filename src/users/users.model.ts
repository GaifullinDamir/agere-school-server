import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Attempt } from "src/attempts/attempts.model";
import { Course } from "src/courses/courses.model";
import { UserCourses } from "src/courses/user-courses.model.dto";
import { Message } from "src/messages/messages.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttributes {
    id: string;
    name: string;
    surname: string;
    patronimic: string;
    email: string;
    password: string;
    refreshToken: string;
}

@Table({
    tableName: 'users'
})
export class User extends Model<User, UserCreationAttributes> {
    @ApiProperty({example: '8364800e-f6ac-11ee-a951-0242ac120002', description: 'uuid.'})
    @Column({type: DataType.UUID, unique: true, primaryKey: true})
    id: string;

    @ApiProperty({example: 'Name', description: 'Имя пользователя.'})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @ApiProperty({example: 'Surname', description: 'Фамилия пользователя.'})
    @Column({type: DataType.STRING, allowNull: false})
    surname: string;

    @ApiProperty({example: 'Patronimic', description: 'Отчество пользователя.'})
    @Column({type: DataType.STRING, allowNull: false})
    patronimic: string;

    @ApiProperty({example: 'image.jpeg', description: 'Фотография пользователя.'})
    @Column({type: DataType.STRING})
    logo: string;

    @ApiProperty({example: 'name@gmail.com', description: 'Почта пользователя.'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: 'password', description: 'Пароль пользователя.'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: 'token', description: 'Refresh token пользователя.'})
    @Column({type: DataType.STRING})
    refreshToken: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    @BelongsToMany(() => Course, () => UserCourses)
    studentCourses: Course[];

    @HasMany(() => Course)
    courses: Course[];

    @HasMany(() => Attempt)
    attempts: Attempt[];

    @HasMany(() => Message)
    messages: Message[];
}