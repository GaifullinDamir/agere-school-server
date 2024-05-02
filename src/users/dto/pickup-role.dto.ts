import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class PickupRoleDto {
    @ApiProperty({example: 'user', description: 'Роль.'})
    @IsString({message: 'Value - Должно быть string.'})
    readonly value: string;
}