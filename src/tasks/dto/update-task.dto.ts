import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateTaskDto {
    @ApiProperty({example: 'Имя задачи.', description: 'Имя задачи.'})
    @IsString({message: 'name-должен быть строкой.'})
    @IsOptional()
    readonly name: string;

    @ApiProperty({example: {"body": "В данной задаче..."}, description: 'Тело задачи.'})
    @IsString({message: 'body-должен быть JSON-файл.'})
    @IsOptional()
    readonly body: string;

    @ApiProperty({example: 0, description: 'Порядковый номер задачи.'})
    @IsNumber()
    @IsOptional()
    readonly position: number;
}