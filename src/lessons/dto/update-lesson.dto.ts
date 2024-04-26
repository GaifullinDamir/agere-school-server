import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateLessonDto {
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

    @ApiProperty({example: 'https://www.youtube.com/embed/_raVsypTkPI', description: 'Ссылка на видео в YT.'})
    @IsString({message: 'ytVideoRef-должен быть строкой.'})
    @IsOptional()
    readonly ytVideoRef: string;
}