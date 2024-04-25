import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdatetLearnModuleDto {
    @ApiProperty({example: 'Имя модуля.', description: 'Имя модуля.'})
    @IsString({message: 'name-должен быть строкой.'})
    @IsOptional()
    name: string;

    @ApiProperty({example: {"description": "В данном модуле..."}, description: 'Описание модуля.'})
    @IsString({message: 'description-должен быть JSON-файл.'})
    @IsOptional()
    description: string;

    @ApiProperty({example: 0, description: 'Порядковый номер модуля.'})
    @IsNumber()
    @IsOptional()
    readonly position: number;
}