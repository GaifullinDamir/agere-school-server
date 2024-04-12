import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto  {
    @ApiProperty({example: 'admin', description: 'Значение роли пользователя.'})
    readonly value: string;

    @ApiProperty({example: 'Пользователь', description: 'Описание роли пользователя.'})
    readonly description: string;
}