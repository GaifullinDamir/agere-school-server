import { ApiProperty } from "@nestjs/swagger";
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
    @ApiProperty({example: '8364800e-f6ac-11ee-a951-0242ac120002', description: 'uuid.'})
    @Column({type: DataType.UUID, unique: true, primaryKey: true})
    id: string;

    @ApiProperty({example: 'Name', description: 'Имя пользователя.'})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @ApiProperty({example: 'Surname', description: 'Фамилия пользователя.'})
    @Column({type: DataType.STRING, allowNull: false})
    surname: string;

    @ApiProperty({example: 'Patronimic', description: 'Отчество пользователя.'})
    @Column({type: DataType.STRING, allowNull: false})
    patronimic: string;

    @ApiProperty({example: 'image.jpeg', description: 'Фотография пользователя.'})
    @Column({type: DataType.STRING})
    logo: string;

    @ApiProperty({example: 'name@gmail.com', description: 'Почта пользователя.'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: 'password', description: 'Пароль пользователя.'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;
}