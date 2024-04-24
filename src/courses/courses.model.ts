import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";


interface CourseCreationAttributes {
    id: string;
    name: string;
    category: string;
    description: string;
    logo: string;
    rating: number;
    userId: string;
}

@Table({
    tableName: 'courses'
})
export class Course extends Model<Course, CourseCreationAttributes> {
    @ApiProperty({example: '8364800e-f6ac-11ee-a951-0242ac120002', description: 'uuid.'})
    @Column({type: DataType.UUID, unique: true, primaryKey: true})
    id: string;

    @ApiProperty({example: 'Course name', description: 'Название курса.'})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @ApiProperty({example: 'Категория', description: 'Категория курса.'})
    @Column({type: DataType.STRING, allowNull: false})
    category: string;

    @ApiProperty(
        {
            example: '{"short_descr": "Короткое описание.", "learn_results_descr": "Результаты обучения.", "about_course_descr": "О чем курс.", "initial_requirements_descr": "Начальные требования." }',
            description: 'Описание курса (JSON-файл. Структура свободная).'
        })
    @Column({type: DataType.JSON, allowNull: false})
    description: string;

    @ApiProperty({example: 'image.jpeg', description: 'Логотип курса. Отправлять файл.'})
    @Column({type: DataType.STRING})
    logo: string;

    @ApiProperty({example: '0', description: 'Средний рейтинг курса.'})
    @Column({type: DataType.SMALLINT, allowNull: false})
    rating: number;

    @ApiProperty({example: '8364800e-f6ac-11ee-a951-0242ac120002', description: 'id создателя курса.'})
    @ForeignKey(() => User)
    @Column({type: DataType.UUID})
    userId: string;

    @BelongsTo(() => User)
    author: User;
}