import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { LearnModule } from "src/learn-modules/learn-modules.model";


interface LessonCreationAttributes {
    id: string;
    name: string;
    description: string;
    position: number;
    ytVideoRef: string;
    moduleId: string;
}

@Table({
    tableName: 'lessons'
})
export class Lesson extends Model<Lesson, LessonCreationAttributes> {
    @ApiProperty({example: '8364800e-f6ac-11ee-a951-0242ac120002', description: 'uuid.'})
    @Column({type: DataType.UUID, unique: true, primaryKey: true})
    id: string;

    @ApiProperty({example: 'Имя модуля.', description: 'Имя модуля.'})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @ApiProperty({example: {"description": "В данном модуле..."}, description: 'Описание модуля.'})
    @Column({type: DataType.JSON})
    description: string;

    @ApiProperty({example: 0, description: 'Порядковый номер модуля.'})
    @Column({type: DataType.INTEGER})
    position: number;

    @ApiProperty({example: 'https://www.youtube.com/embed/_raVsypTkPI', description: 'Ссылка на видео в YT.'})
    @Column({type: DataType.STRING, allowNull: false})
    ytVideoRef: string;

    @ApiProperty({example: '8364800e-f6ac-11ee-a951-0242ac120002', description: 'uuid.'})
    @ForeignKey(() => LearnModule)
    @Column({type: DataType.UUID})
    moduleId: string;

    @BelongsTo(() => LearnModule)
    module: LearnModule;
}