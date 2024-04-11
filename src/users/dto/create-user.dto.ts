import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: '8364800e-f6ac-11ee-a951-0242ac120002', description: 'uuid.'})
    readonly id: string;

    @ApiProperty({example: 'Name', description: 'Имя пользователя.'})
    readonly name: string;

    @ApiProperty({example: 'Surname', description: 'Фамилия пользователя.'})
    readonly surname: string;

    @ApiProperty({example: 'Patronimic', description: 'Отчество пользователя.'})
    readonly patronimic: string;

    @ApiProperty({example: 'name@gmail.com', description: 'Почта пользователя.'})
    readonly email: string;

    @ApiProperty({example: 'password', description: 'Пароль пользователя.'})
    readonly password: string;
    
    @ApiProperty({example: 'student', description: 'Роль пользователя.'})
    readonly role: string;
}