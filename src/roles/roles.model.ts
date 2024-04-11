import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface RoleCreationAttributes {
    id: string;
    value: string;
    description: string;
}

@Table({
    tableName: 'roles'
})
export class Role extends Model<Role, RoleCreationAttributes> {
    @ApiProperty({example: '8364800e-f6ac-11ee-a951-0242ac120002', description: 'uuid.'})
    @Column({type: DataType.UUID, unique: true, primaryKey: true})
    id: string;

    @ApiProperty({example: 'admin', description: 'Значение роли пользователя.'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;

    @ApiProperty({example: 'Пользователь', description: 'Описание роли пользователя.'})
    @Column({type: DataType.STRING, allowNull: false})
    description: string;
}