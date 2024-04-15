import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'Name', description: 'Имя пользователя.'})
    @IsString({message: 'Должно быть строкой.'})
    readonly name: string;

    @ApiProperty({example: 'Surname', description: 'Фамилия пользователя.'})
    @IsString({message: 'Должно быть строкой.'})
    readonly surname: string;    

    @ApiProperty({example: 'Patronimic', description: 'Отчество пользователя.'})
    @IsString({message: 'Должно быть строкой.'})
    readonly patronimic: string;

    @ApiProperty({example: 'name@gmail.com', description: 'Почта пользователя.'})
    @IsString({message: 'Должно быть строкой.'})
    @IsEmail({}, {message: 'Некорректный email.'})
    readonly email: string;

    @ApiProperty({example: 'password', description: 'Пароль пользователя.'})
    @IsString({message: 'Должно быть строкой.'})
    @Length(8, 16, {message: 'Длине не менее 8 символов и не более 16 символов.'})
    readonly password: string;
}