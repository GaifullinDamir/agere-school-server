import { ApiProperty } from "@nestjs/swagger";
import { IsJSON, IsString } from "class-validator";

export class CreateLearnModuleDto {
    @ApiProperty({example: 'Имя модуля.', description: 'Имя модуля.'})
    @IsString({message: 'name-должен быть строкой.'})
    readonly name: string;

    @ApiProperty({example: '{"description": "В данном модуле..."}', description: 'Описание модуля.'})
    // @IsJSON({message: 'description-должен быть JSON-файл.'})
    readonly description: string;
}