import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Json } from "sequelize/types/utils";
import { User } from "src/users/users.model";


interface CourseCreationAttributes {
    id: string;
    name: string;
    category: string;
    description: object;
    logo: string;
    rating: number;
}

@Table({
    tableName: 'courses'
})
export class Course extends Model<Course, CourseCreationAttributes> {
    @Column({type: DataType.UUID, unique: true, primaryKey: true})
    id: string;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, allowNull: false})
    category: string;

    @Column({type: DataType.JSON, allowNull: false})
    description: string;

    @Column({type: DataType.STRING})
    logo: string;

    @Column({type: DataType.SMALLINT, unique: true, allowNull: false})
    rating: number;

    @ForeignKey(() => User)
    @Column({type: DataType.UUID})
    userId: string;

    @BelongsTo(() => User)
    author: User
}