
import { ApiProperty } from "@nestjs/swagger";
import { Lesson } from "../lesson.model";
import { ViewLearnModuleDto } from "src/learn-modules/dto/view-learn-module.dto";
import { ViewTaskDto } from "src/tasks/dto/view-task.dto";

export class ViewLessonDto {
    constructor(lesson: Lesson) {
        this.id = lesson.id;
        this.name = lesson.name;
        this.description = lesson.description;
        this.position = lesson.position;
        this.ytVideoRef = lesson.ytVideoRef;
        this.moduleId =  lesson.moduleId;
        if (lesson.module) {
            this.module = new ViewLearnModuleDto(lesson.module);
        }

        if (lesson.tasks) {
            this.tasks = lesson.tasks.map(task => new ViewTaskDto(task));
        }
    }
    @ApiProperty({example: '8364800e-f6ac-11ee-a951-0242ac120002', description: 'uuid.'})
    readonly id: string;
    
    @ApiProperty({example: 'Имя модуля.', description: 'Имя модуля.'})
    readonly name: string;

    @ApiProperty({example: {"descriptiom": "В данном модуле..."}, description: 'Описание модуля.'})
    readonly description: string;

    @ApiProperty({example: 0, description: 'Порядковый номер модуля.'})
    readonly position: number;

    @ApiProperty({example: 'https://www.youtube.com/embed/_raVsypTkPI', description: 'Ссылка на видео в YT.'})
    readonly ytVideoRef: string;

    @ApiProperty({example: '8364800e-f6ac-11ee-a951-0242ac120002', description: 'uuid.'})
    readonly moduleId: string;

    @ApiProperty({example: [
        {
            "id": "4954ecf0-03ae-11ef-80d3-9bff3d63672e",
            "name": "2",
            "description": "{\"description\" : {\"short\" : \"description\",\"full\" : \"descriptiondescriptiondescription\"}}",
            "position": 0,
            "courseId": "0a4872f0-fda7-11ee-ab13-e32311b66335",
            "course": {
                "id": "0a4872f0-fda7-11ee-ab13-e32311b66335",
                "name": "Python. Django.",
                "category": "Программирование",
                "description": "\"{\\n    \\\"short_descr\\\": \\\"Курс с базовыми знаниями о веб-разработке.\\\",\\n    \\\"learn_results_descr\\\": \\\"Данный курс поможет вам освоить базовые знания о веб разработке.\\\",\\n    \\\"about_course_descr\\\": \\\"Курс будет состоять из 5 модулей: HTML, CSS, JS, React,React + Redux\\\",\\n    \\\"initial_requirements_descr\\\": \\\"Чтобы начать изучение курса от вас требуется лишь наличие стабильного интернет соединения, компьютер, навыки работы с компьютером.\\\" \\n}\"",
                "logo": "84356d0a-72c6-4181-8596-92b53db1079a.png",
                "rating": 0,
                "userId": "496efa80-fe51-11ee-9fc8-3b0162367e79"
            }
        }
        ], description: 'Модуль в котором содержится урок.'})
    readonly module: ViewLearnModuleDto;

    readonly tasks: ViewTaskDto[];
}