import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateRoleDto  {
    @ApiProperty({example: 'admin', description: 'Значение роли пользователя.'})
    @IsString({message: 'value - Должно быть строкой.'})
    @IsOptional()
    readonly value: string;

    @ApiProperty({example: 'Пользователь', description: 'Описание роли пользователя.'})
    @IsString({message: 'description - Должно быть строкой.'})
    @IsOptional()
    readonly description: string;
}