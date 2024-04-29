import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateTaskDto {
    @ApiProperty({example: 'Имя задачи.', description: 'Имя задачи.'})
    @IsString({message: 'name-должен быть строкой.'})
    readonly name: string;

    @ApiProperty({example: {"body": "В данной задаче..."}, description: 'Тело задачи.'})
    @IsString({message: 'body-должен быть JSON-файл.'})
    readonly body: string;
}