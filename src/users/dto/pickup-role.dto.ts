import { ApiProperty } from "@nestjs/swagger";

export class PickupRoleDto {
    @ApiProperty({example: 'user', description: 'Роль.'})
    readonly value: string;
}