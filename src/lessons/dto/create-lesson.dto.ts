import { ApiProperty } from "@nestjs/swagger";
import { IsJSON, IsOptional, IsString } from "class-validator";

export class CreateLessonDto {
    @ApiProperty({example: 'Имя модуля.', description: 'Имя модуля.'})
    @IsString({message: 'name-должен быть строкой.'})
    readonly name: string;

    @ApiProperty({example: '{"description": "В данном модуле..."}', description: 'Описание модуля.'})
    @IsJSON({message: 'description-должен быть JSON-файл.'})
    readonly description: string;

    @ApiProperty({example: 'https://www.youtube.com/embed/_raVsypTkPI', description: 'Ссылка на видео в YT.'})    
    @IsString({message: 'ytVideoRef-должен быть строкой.'})
    @IsOptional()
    readonly ytVideoRef: string;
}