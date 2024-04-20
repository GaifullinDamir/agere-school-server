import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
    @ApiProperty({example: 'Name', description: 'Имя пользователя.'})
    readonly name: string;

    @ApiProperty({example: 'Surname', description: 'Фамилия пользователя.'})
    readonly surname: string;

    @ApiProperty({example: 'Patronimic', description: 'Отчество пользователя.'})
    readonly patronimic: string;

    @ApiProperty({example: 'image.jpeg', description: 'Фотография пользователя.'})
    readonly logo: string;

    @ApiProperty({example: 'name@gmail.com', description: 'Почта пользователя.'})
    readonly email: string;

    @ApiProperty({example: 'password', description: 'Пароль пользователя.'})
    readonly password: string;
}