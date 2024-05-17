import { ApiProperty } from "@nestjs/swagger";
import { IsString} from "class-validator";

export class LogoutUserDto {
    @ApiProperty({example: 'token', description: 'Refresh token пользователя.'})
    @IsString({message: 'Должно быть строкой.'})
    readonly refreshToken: string;
}