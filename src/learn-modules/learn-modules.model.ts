import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model } from "sequelize-typescript";
import { Course } from "src/courses/courses.model";


interface LearnModuleCreationAttributes {
    id: string;
    name: string;
    description: string;
    position: number;
    courseId: string;
}

export class LearnModule extends Model<LearnModule, LearnModuleCreationAttributes> {
    @ApiProperty({example: '8364800e-f6ac-11ee-a951-0242ac120002', description: 'uuid.'})
    @Column({type: DataType.UUID, unique: true, primaryKey: true})
    id: string;

    @ApiProperty({example: 'Имя модуля.', description: 'Имя модуля.'})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @ApiProperty({example: {"descriptiom": "В данном модуле..."}, description: 'Описание модуля.'})
    @Column({type: DataType.JSON})
    description: string;

    @ApiProperty({example: 0, description: 'Порядковый номер модуля.'})
    @Column({type: DataType.INTEGER})
    position: number;

    @ApiProperty({example: '8364800e-f6ac-11ee-a951-0242ac120002', description: 'uuid.'})
    @ForeignKey(() => Course)
    @Column({type: DataType.UUID})
    courseId: string;

    @BelongsTo(() => Course)
    course: Course;
}