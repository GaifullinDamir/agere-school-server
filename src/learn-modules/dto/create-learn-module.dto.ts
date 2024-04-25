import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateLearnModuleDto {
    @ApiProperty({example: 'Имя модуля.', description: 'Имя модуля.'})
    @IsString({message: 'name-должен быть строкой.'})
    name: string;

    @ApiProperty({example: {"description": "В данном модуле..."}, description: 'Описание модуля.'})
    @IsString({message: 'description-должен быть JSON-файл.'})
    description: string;
}