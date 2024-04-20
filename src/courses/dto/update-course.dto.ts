import { ApiProperty } from "@nestjs/swagger";
import { IsJSON, IsNumberString, IsOptional, IsString} from "class-validator";

export class UpdateCourseDto{
    @ApiProperty({example: 'Course name', description: 'Название курса.'})
    @IsString({message: 'name - Должно быть строкой.'})
    @IsOptional()
    readonly name: string;

    @ApiProperty({example: 'Категория', description: 'Категория курса.'})
    @IsString({message: 'category - Должно быть строкой.'})
    @IsOptional()
    readonly category: string; 

    @ApiProperty(
        {
            example: '{"short_descr": "Короткое описание.", "learn_results_descr": "Результаты обучения.", "about_course_descr": "О чем курс.", "initial_requirements_descr": "Начальные требования." }',
            description: 'Описание курса (JSON-файл. Структура свободная).'
        })
    @IsJSON({message: 'description - Должен быть JSON-файл.'})
    @IsOptional()
    readonly description: string;

    @ApiProperty({example: 'image.jpeg', description: 'Логотип курса. Отправлять файл.'})
    @IsOptional()
    readonly logo: string;

    @ApiProperty({example: '0', description: 'Средний рейтинг курса.'})
    @IsNumberString()
    @IsOptional()
    readonly rating: number;
}