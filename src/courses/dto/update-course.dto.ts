import { ApiProperty } from "@nestjs/swagger";

export class UpdateCourseDto{
    @ApiProperty({example: '8364800e-f6ac-11ee-a951-0242ac120002', description: 'uuid.'})
    readonly id: string;
    
    @ApiProperty({example: 'Course name', description: 'Название курса.'})
    readonly name: string;

    @ApiProperty({example: 'Категория', description: 'Категория курса.'})
    readonly category: string; 

    @ApiProperty(
        {
            example: '{"short_descr": "Короткое описание.", "learn_results_descr": "Результаты обучения.", "about_course_descr": "О чем курс.", "initial_requirements_descr": "Начальные требования." }',
            description: 'Описание курса (JSON-файл. Структура свободная).'
        })
    readonly description: string;

    @ApiProperty({example: 'image.jpeg', description: 'Логотип курса. Отправлять файл.'})
    readonly logo: string;

    @ApiProperty({example: '0', description: 'Средний рейтинг курса.'})
    readonly rating: number;
}