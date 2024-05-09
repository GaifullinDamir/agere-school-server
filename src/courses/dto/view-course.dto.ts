import { ApiProperty } from "@nestjs/swagger";
import { ViewUserDto } from "src/users/dto/view-user.dto";
import { Course } from "../courses.model";
import { ViewLearnModuleDto } from "src/learn-modules/dto/view-learn-module.dto";

export class ViewCourseDto{
    constructor(course: Course) {
        this.id = course.id;
        this.name = course.name;
        this.category = course.category;
        this.description = course.description;
        this.logo = course.logo;
        this.rating = course.rating;
        this.isVisible = course.isVisible;
        this.userId = course.userId;
        if(course.author) {
            this.author = new ViewUserDto(course.author);
        }

        if (course.learnModules) {
            this.learnModules = course.learnModules.map(learnModule => new ViewLearnModuleDto(learnModule));
        }
        
    }
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

    @ApiProperty({example: true, description: 'Видимость курса пользователю.'})
    readonly isVisible: boolean;

    @ApiProperty({example: '8364800e-f6ac-11ee-a951-0242ac120002', description: 'id создателя курса.'})
    readonly userId: string;

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
    readonly author: ViewUserDto;

    readonly learnModules: ViewLearnModuleDto[];
}