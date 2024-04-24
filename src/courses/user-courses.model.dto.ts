import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Course } from "./courses.model";

@Table({
    tableName: 'user_courses-info'
})
export class UserCourses extends Model<UserCourses> {
    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Course)
    @Column({type: DataType.UUID})
    courseId: string;

    @ForeignKey(() => User)
    @Column({type: DataType.UUID})
    userId: string;
}
