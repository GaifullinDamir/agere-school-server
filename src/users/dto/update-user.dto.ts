import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Course } from "src/courses/courses.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

export class UpdateUserDto {
    @ApiProperty({example: '8364800e-f6ac-11ee-a951-0242ac120002', description: 'uuid.'})
    id: string;

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

    @ApiProperty({example: [
            {
                "id": "1a70ddae-f80a-11ee-a951-0242ac120002",
                "value": "user",
                "description": "Пользователь",
                "createdAt": "2024-04-11T13:48:06.435Z",
                "updatedAt": "2024-04-11T13:48:06.435Z",
                "UserRoles": {
                    "id": 1,
                    "roleId": "1a70ddae-f80a-11ee-a951-0242ac120002",
                    "userId": "dc255b20-f911-11ee-a962-23956c5947c1"
                }
            }
        ], description: 'Роли пользователя.'})
    roles: Role[];

    @ApiProperty({example: [
            {
                "id": "0a4872f0-fda7-11ee-ab13-e32311b66335",
                "name": "Python. Django.",
                "category": "Программирование",
                "description": "\"{\\n    \\\"short_descr\\\": \\\"Курс с базовыми знаниями о веб-разработке.\\\",\\n    \\\"learn_results_descr\\\": \\\"Данный курс поможет вам освоить базовые знания о веб разработке.\\\",\\n    \\\"about_course_descr\\\": \\\"Курс будет состоять из 5 модулей: HTML, CSS, JS, React,React + Redux\\\",\\n    \\\"initial_requirements_descr\\\": \\\"Чтобы начать изучение курса от вас требуется лишь наличие стабильного интернет соединения, компьютер, навыки работы с компьютером.\\\" \\n}\"",
                "logo": "84356d0a-72c6-4181-8596-92b53db1079a.png",
                "rating": 0,
                "userId": "dc255b20-f911-11ee-a962-23956c5947c1",
                "createdAt": "2024-04-18T17:13:56.897Z",
                "updatedAt": "2024-04-18T20:04:47.801Z"
            }
        ], description: 'Курсы пользователя.'})
    courses: Course[];
}