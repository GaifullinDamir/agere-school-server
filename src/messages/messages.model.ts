import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Lesson } from "src/lessons/lesson.model";
import { User } from "src/users/users.model";


interface MessagesCreationAttributes {
    id: string;
    text: string;
    lessonId: string;
    userId: string;
}

@Table({
    tableName: 'messages'
})
export class Message extends Model<Message, MessagesCreationAttributes> {
    @ApiProperty({example: '8364800e-f6ac-11ee-a951-0242ac120002', description: 'uuid.'})
    @Column({type: DataType.UUID, unique: true, primaryKey: true})
    id: string;

    @ApiProperty({example: 'Раскройте данную тему более подробно, пожалуйста.', description: 'text.'})
    @Column({type: DataType.STRING})
    text: string;

    @ApiProperty({example: '8364800e-f6ac-11ee-a951-0242ac120002', description: 'uuid.'})
    @ForeignKey(() => Lesson)
    @Column({type: DataType.UUID})
    lessonId: string;

    @BelongsTo(() => Lesson)
    lesson: Lesson;

    @ApiProperty({example: '8364800e-f6ac-11ee-a951-0242ac120002', description: 'uuid.'})
    @ForeignKey(() => User)
    @Column({type: DataType.UUID})
    userId: string;

    @BelongsTo(() => User)
    user: User;
}