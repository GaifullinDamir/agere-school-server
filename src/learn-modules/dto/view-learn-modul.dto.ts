import { ViewCourseDto } from "src/courses/dto/view-course.dto";
import { LearnModule } from "../learn-modules.model";
import { ApiProperty } from "@nestjs/swagger";
export class ViewLearnModuleDto {
    constructor(learnModule: LearnModule) {
        this.id = learnModule.id;
        this.name = learnModule.name;
        this.description = learnModule.description;
        this.courseId =  learnModule.courseId;
        if (learnModule.course) {
            this.course = new ViewCourseDto(learnModule.course);
        }
    }
    @ApiProperty({example: '8364800e-f6ac-11ee-a951-0242ac120002', description: 'uuid.'})
    id: string;
    
    @ApiProperty({example: 'Имя модуля.', description: 'Имя модуля.'})
    name: string;

    @ApiProperty({example: {"descriptiom": "В данном модуле..."}, description: 'Описание модуля.'})
    description: string;

    @ApiProperty({example: '8364800e-f6ac-11ee-a951-0242ac120002', description: 'uuid.'})
    courseId: string;

    @ApiProperty({example: [
        {
            "id": "0a4872f0-fda7-11ee-ab13-e32311b66335",
            "name": "Python. Django.",
            "category": "Программирование",
            "description": "\"{\\n    \\\"short_descr\\\": \\\"Курс с базовыми знаниями о веб-разработке.\\\",\\n    \\\"learn_results_descr\\\": \\\"Данный курс поможет вам освоить базовые знания о веб разработке.\\\",\\n    \\\"about_course_descr\\\": \\\"Курс будет состоять из 5 модулей: HTML, CSS, JS, React,React + Redux\\\",\\n    \\\"initial_requirements_descr\\\": \\\"Чтобы начать изучение курса от вас требуется лишь наличие стабильного интернет соединения, компьютер, навыки работы с компьютером.\\\" \\n}\"",
            "logo": "84356d0a-72c6-4181-8596-92b53db1079a.png",
            "rating": 0,
            "userId": "dc255b20-f911-11ee-a962-23956c5947c1",
            "createdAt": "2024-04-18T17:13:56.897Z",
            "updatedAt": "2024-04-18T20:04:47.801Z"
        }
        ], description: 'Курс модуля.'})
    course: ViewCourseDto;
}