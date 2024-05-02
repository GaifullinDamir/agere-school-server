import { ViewLessonDto } from "src/lessons/dto/view-lesson.dto";
import { Message } from "../messages.model";
import { ViewUserDto } from "src/users/dto/view-user.dto";
import { ApiProperty } from "@nestjs/swagger";

export class ViewMessageDto {
    constructor(message: Message) {
        this.id = message.id;
        this.text = message.text;
        this.lessonId = message.lessonId;
        if (message.lesson) {
            this.lesson = new ViewLessonDto(message.lesson);
        }
        this.userId = message.userId;
        if(message.user) {
            this.user = new ViewUserDto(message.user);
        }
    }
    @ApiProperty({example: '8364800e-f6ac-11ee-a951-0242ac120002', description: 'uuid.'})
    readonly id: string;

    @ApiProperty({example: 'Раскройте данную тему более подробно, пожалуйста.', description: 'text.'})
    readonly text: string;

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

    @ApiProperty({example: '8364800e-f6ac-11ee-a951-0242ac120002', description: 'uuid.'})
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
    readonly user: ViewUserDto;
}