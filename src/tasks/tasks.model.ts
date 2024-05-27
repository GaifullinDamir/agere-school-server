import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Attempt } from "src/attempts/attempts.model";
import { Lesson } from "src/lessons/lesson.model";

interface TaskCreationAttributes {
    id: string;
    name: string;
    body: string;
    position: number;
    lessonId: string;
}

@Table({
    tableName: 'tasks'
})
export class Task extends Model<Task, TaskCreationAttributes> {
    @ApiProperty({example: '8364800e-f6ac-11ee-a951-0242ac120002', description: 'uuid.'})
    @Column({type: DataType.UUID, unique: true, primaryKey: true})
    id: string;

    @ApiProperty({example: 'Имя задачи.', description: 'Имя задачи.'})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @ApiProperty({example: {"asnwer": "5"}, description: 'Данные для задачи.'})
    @Column({type: DataType.JSON})
    body: string;

    @ApiProperty({example: 0, description: 'Порядковый номер задачи.'})
    @Column({type: DataType.INTEGER})
    position: number;

    @ApiProperty({example: '8364800e-f6ac-11ee-a951-0242ac120002', description: 'uuid.'})
    @ForeignKey(() => Lesson)
    @Column({type: DataType.UUID})
    lessonId: string;

    @BelongsTo(() => Lesson)
    lesson: Lesson;

    @HasMany(() => Attempt)
    attempt: Attempt;
}