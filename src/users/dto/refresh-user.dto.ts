import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString} from "class-validator";

export class RefreshUserDto {
    @ApiProperty({example: 'token', description: 'Refresh token пользователя.'})
    @IsString({message: 'Должно быть строкой.'})
    @IsOptional()
    readonly refreshToken: string;
}