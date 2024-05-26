import { ApiProperty } from "@nestjs/swagger";
import { IsJSON, IsString } from "class-validator";

export class CreateLearnModuleDto {
    @IsString({message: 'name-должен быть строкой.'})
    @ApiProperty({example: 'Имя модуля.', description: 'Имя модуля.'})
    readonly name: string;

    @IsJSON({message: 'description-должен быть JSON-файл.'})
    @ApiProperty({example: '{"description": "В данном модуле..."}', description: 'Описание модуля.'})
    readonly description: string;
}