import { ApiProperty } from "@nestjs/swagger";
import { Attempt } from "../attempts.model";
import { ViewTaskDto } from "src/tasks/dto/view-task.dto";
import { ViewUserDto } from "src/users/dto/view-user.dto";


export class ViewAttemptDto {
    constructor(attempt: Attempt) {
        this.id = attempt.id;
        this.answer = attempt.answer;
        this.isRight = attempt.isRight;
        this.taskId = attempt.taskId;
        if (attempt.task) {
            this.task = new ViewTaskDto(attempt.task);
        }
        this.userId = attempt.userId;
        if (attempt.user) {
            this.user = new ViewUserDto(attempt.user);
        }
    }
    @ApiProperty({example: '8364800e-f6ac-11ee-a951-0242ac120002', description: 'uuid.'})
    id: string;

    @ApiProperty({example: {"asnwer": "5"}, description: 'Данные для ответа.'})
    answer: string;

    @ApiProperty({example: true, description: 'Правильность ответа.'})
    isRight: boolean;

    @ApiProperty({example: '8364800e-f6ac-11ee-a951-0242ac120002', description: 'uuid.'})
    taskId: string;

    @ApiProperty({example: {
        "id": "a8024860-0610-11ef-a973-bb503a5a86b1",
        "name": "Задание 2",
        "body": "{\"body\": \"task\"}",
        "position": 0,
        "lessonId": "fbff9140-04b0-11ef-b569-47fd305d5520",
        "lesson": {
            "id": "fbff9140-04b0-11ef-b569-47fd305d5520",
            "name": "5",
            "description": "{\"description\":\"message\"}",
            "position": 0,
            "ytVideoRef": "tqipC5TXSz8",
            "moduleId": "7397fd70-03fb-11ef-ba10-458326fa9ca9"
        }
    }, description: 'task'})
    task: ViewTaskDto;

    @ApiProperty({example: '8364800e-f6ac-11ee-a951-0242ac120002', description: 'uuid.'})
    userId: string;

    @ApiProperty({example: {
        "id": "67ffe430-fd6d-11ee-9c62-cb1fbf8b4db9",
        "name": "Данил",
        "surname": "Калеев",
        "patronimic": "Андреевич",
        "logo": null,
        "email": "kaleev@gmail.com",
        "password": "$2a$05$3Kqv29uB.fk8jc.LyGNysOjqjEHfcDTulIi7pWbouv/uBHqbhOPpG",
        "createdAt": "2024-04-18T10:21:23.391Z",
        "updatedAt": "2024-04-18T10:21:23.391Z",
        "UserRoles": {
            "id": 5,
            "roleId": "1a70ddae-f80a-11ee-a951-0242ac120002",
            "userId": "67ffe430-fd6d-11ee-9c62-cb1fbf8b4db9"}}, description: 'user'})
    user: ViewUserDto;
}