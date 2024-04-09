import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreationAttributes {
    id: string;
    name: string;
    surname: string;
    patronimic: string;
    email: string;
    password: string;
    role: string;
}

@Table({
    tableName: 'users'
})
export class User extends Model<User, UserCreationAttributes> {
    @Column({type: DataType.UUID, unique: true, primaryKey: true})
    id: string;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, allowNull: false})
    surname: string;

    @Column({type: DataType.STRING, allowNull: false})
    patronimic: string;

    @Column({type: DataType.STRING})
    logo: string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @Column({type: DataType.STRING, allowNull: false})
    role: string;
}