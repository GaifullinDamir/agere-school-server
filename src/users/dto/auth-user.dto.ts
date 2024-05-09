import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString} from "class-validator";

export class AuthUserDto {
    @ApiProperty({example: 'name@gmail.com', description: 'Почта пользователя.'})
    @IsString({message: 'Должно быть строкой.'})
    @IsEmail({}, {message: 'Некорректный email.'})
    readonly email: string;

    @ApiProperty({example: 'password', description: 'Пароль пользователя.'})
    @IsString({message: 'Должно быть строкой.'})
    readonly password: string;
}