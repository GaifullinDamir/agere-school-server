import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsJSON, IsOptional, IsString } from "class-validator";

export class UpdateAttemptDto {
    @ApiProperty({example: {"answer": "В данной задаче..."}, description: 'Тело ответа.'})
    @IsJSON({message: 'answer-должен быть JSON-файл.'})
    @IsOptional()
    readonly answer: string;

    @ApiProperty({example: true, description: 'Правильность ответа.'})
    @IsBoolean({message: 'isRight-должен быть boolean.'})
    @IsOptional()
    readonly isRight: boolean;
}