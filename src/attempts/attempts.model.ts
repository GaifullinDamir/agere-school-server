import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Lesson } from "src/lessons/lesson.model";
import { Task } from "src/tasks/tasks.model";
import { User } from "src/users/users.model";

interface AttemptCreationAttributes {
    id: string;
    answer: string;
    isRight: boolean;
    taskId: string;
    userId: string;
}

@Table({
    tableName: 'attempts'
})
export class Attempt extends Model<Attempt, AttemptCreationAttributes> {
    @ApiProperty({example: '8364800e-f6ac-11ee-a951-0242ac120002', description: 'uuid.'})
    @Column({type: DataType.UUID, unique: true, primaryKey: true})
    id: string;

    @ApiProperty({example: {"asnwer": "5"}, description: 'Данные для ответа.'})
    @Column({type: DataType.JSON})
    answer: string;

    @ApiProperty({example: true, description: 'Правильность ответа.'})
    @Column({type: DataType.BOOLEAN})
    isRight: boolean;

    @ApiProperty({example: '8364800e-f6ac-11ee-a951-0242ac120002', description: 'uuid.'})
    @ForeignKey(() => Task)
    @Column({type: DataType.UUID})
    taskId: string;

    @BelongsTo(() => Task)
    task: Task;

    @ApiProperty({example: '8364800e-f6ac-11ee-a951-0242ac120002', description: 'uuid.'})
    @ForeignKey(() => User)
    @Column({type: DataType.UUID})
    userId: string;

    @BelongsTo(() => User)
    user: User;
}