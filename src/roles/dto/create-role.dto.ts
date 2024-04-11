import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto  {
    @ApiProperty({example: '8364800e-f6ac-11ee-a951-0242ac120002', description: 'uuid.'})
    readonly d: string;

    @ApiProperty({example: 'admin', description: 'Значение роли пользователя.'})
    readonly value: string;

    @ApiProperty({example: 'Пользователь', description: 'Описание роли пользователя.'})
    readonly description: string;
}