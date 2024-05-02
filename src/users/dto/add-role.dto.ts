import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AddRoleDto {
    @ApiProperty({example: 'user', description: 'Роль.'})
    @IsString({message: 'Value - должно быть string.'})
    readonly value: string;
}