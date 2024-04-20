import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateRoleDto  {
    @ApiProperty({example: 'admin', description: 'Значение роли пользователя.'})
    @IsString({message: 'value - Должно быть строкой.'})
    readonly value: string;

    @ApiProperty({example: 'Пользователь', description: 'Описание роли пользователя.'})
    @IsString({message: 'description - Должно быть строкой.'})
    readonly description: string;
}