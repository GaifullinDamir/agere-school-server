import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @ApiProperty({example: 'Name', description: 'Имя пользователя.'})
    @IsString({message: 'name - Должно быть строкой.'})
    @IsOptional()
    readonly name: string;

    @ApiProperty({example: 'Surname', description: 'Фамилия пользователя.'})
    @IsString({message: 'Surname - Должно быть строкой.'})
    @IsOptional()
    readonly surname: string;

    @ApiProperty({example: 'Patronimic', description: 'Отчество пользователя.'})
    @IsString({message: 'Patronimic - Должно быть строкой.'})
    @IsOptional()
    readonly patronimic: string;

    @ApiProperty({example: 'image.jpeg', description: 'Фотография пользователя.'})
    @IsOptional()
    readonly logo: string;

    @ApiProperty({example: 'name@gmail.com', description: 'Почта пользователя.'})
    @IsString({message: 'Email - Должно быть строкой.'})
    @IsOptional()
    readonly email: string;

    @ApiProperty({example: 'password', description: 'Пароль пользователя.'})
    @IsString({message: 'Password - Должно быть строкой.'})
    @IsOptional()
    readonly password: string;
}