import { ApiProperty } from "@nestjs/swagger";
import { Task } from "../tasks.model";
import { ViewLessonDto } from "src/lessons/dto/view-lesson.dto";

export class ViewTaskDto {
    constructor(task: Task) {
        this.id = task.id;
        this.name = task.name;
        this.body = task.body;
        this.position = task.position;
        this.lessonId =  task.lessonId;
        if (task.lesson) {
            this.lesson = new ViewLessonDto(task.lesson);
        }
    }
    @ApiProperty({example: '8364800e-f6ac-11ee-a951-0242ac120002', description: 'uuid.'})
    readonly id: string;
    
    @ApiProperty({example: 'Имя урока.', description: 'Имя урока.'})
    readonly name: string;

    @ApiProperty({example: {"descriptiom": "В данном модуле..."}, description: 'Описание урока.'})
    readonly body: string;

    @ApiProperty({example: 0, description: 'Порядковый номер урока.'})
    readonly position: number;

    @ApiProperty({example: '8364800e-f6ac-11ee-a951-0242ac120002', description: 'uuid.'})
    readonly lessonId: string;

    @ApiProperty({example: [
        {
            "id": "fbff9140-04b0-11ef-b569-47fd305d5520",
            "name": "5",
            "description": "{\"description\":\"message\"}",
            "position": 0,
            "ytVideoRef": "tqipC5TXSz8",
            "moduleId": "7397fd70-03fb-11ef-ba10-458326fa9ca9",
            "module": {
                "id": "7397fd70-03fb-11ef-ba10-458326fa9ca9",
                "name": "0",
                "description": "{\"description\" : {\"short\" : \"description\",\"full\" : \"descriptiondescriptiondescription\"}}",
                "position": 1,
                "courseId": "0a4872f0-fda7-11ee-ab13-e32311b66335"
            }
        }
        ], description: 'Урок в котором содержится задача.'})
    readonly lesson: ViewLessonDto;
}