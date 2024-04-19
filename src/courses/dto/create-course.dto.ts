import { ApiProperty } from "@nestjs/swagger";
import { IsJSON, IsString } from "class-validator";

export class CreateCourseDto{
    @ApiProperty({example: 'Course name', description: 'Название курса.'})
    @IsString({message: 'Должно быть строкой.'})
    readonly name: string;

    @IsString({message: 'Должно быть строкой.'})
    @ApiProperty({example: 'Категория', description: 'Категория курса.'})
    readonly category: string; 

    @IsJSON({message: 'Должен быть JSON-файл'})
    @ApiProperty(
        {
            example: '{"short_descr": "Короткое описание.", "learn_results_descr": "Результаты обучения.", "about_course_descr": "О чем курс.", "initial_requirements_descr": "Начальные требования." }',
            description: 'Описание курса (JSON-файл. Структура свободная).'
        })
    readonly description: string;

    @ApiProperty({example: 'image.jpeg', description: 'Логотип курса. Отправлять файл.'})
    readonly logo: string;
}