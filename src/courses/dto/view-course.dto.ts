import { ApiProperty } from "@nestjs/swagger";
import { ViewUserDto } from "src/users/dto/view-user.dto";
import { Course } from "../courses.model";

export class ViewCourseDto{
    constructor(course: Course) {
        this.id = course.id;
        this.name = course.name;
        this.category = course.category;
        this.description = course.description;
        this.logo = course.logo;
        this.rating = course.rating;
        this.userId = course.userId;
        this.author = new ViewUserDto(course.author);
    }
    @ApiProperty({example: '8364800e-f6ac-11ee-a951-0242ac120002', description: 'uuid.'})
    id: string;

    @ApiProperty({example: 'Course name', description: 'Название курса.'})
    name: string;

    @ApiProperty({example: 'Категория', description: 'Категория курса.'})
    category: string;

    @ApiProperty(
        {
            example: '{"short_descr": "Короткое описание.", "learn_results_descr": "Результаты обучения.", "about_course_descr": "О чем курс.", "initial_requirements_descr": "Начальные требования." }',
            description: 'Описание курса (JSON-файл. Структура свободная).'
        })
    description: string;

    @ApiProperty({example: 'image.jpeg', description: 'Логотип курса. Отправлять файл.'})
    logo: string;

    @ApiProperty({example: '0', description: 'Средний рейтинг курса.'})
    rating: number;

    @ApiProperty({example: '8364800e-f6ac-11ee-a951-0242ac120002', description: 'id создателя курса.'})
    userId: string;

    @ApiProperty({
        example: {
            "id": "dc255b20-f911-11ee-a962-23956c5947c1",
            "name": "Андрей",
            "surname": "Горохов",
            "patronimic": "Сергеевич",
            "logo": null,
            "email": "andrew@mail.ru",
            "password": "12345",
            "createdAt": "2024-04-12T21:15:59.829Z",
            "updatedAt": "2024-04-12T21:15:59.829Z"
        },
        description: 'Создатель курса.'
    })
    author: ViewUserDto;
}