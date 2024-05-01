import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsJSON, IsString } from "class-validator";

export class CreateAttemptDto {
    @ApiProperty({example: {"answer": "В данной задаче..."}, description: 'Тело ответа.'})
    @IsJSON({message: 'answer-должен быть JSON-файл.'})
    readonly answer: string;

    @ApiProperty({example: true, description: 'Правильность ответа.'})
    @IsBoolean({message: 'isRight-должен быть JSON-файл.'})
    readonly isRight: boolean;
}