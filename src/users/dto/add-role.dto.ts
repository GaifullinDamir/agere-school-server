import { ApiProperty } from "@nestjs/swagger";

export class AddRoleDto {
    @ApiProperty({example: 'user', description: 'Роль.'})
    readonly value: string;
}