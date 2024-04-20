import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../roles.model";
import { ViewUserDto } from "src/users/dto/view-user.dto";

export class ViewRoleDto  {
    constructor(role: Role) {
        this.id = role.id;
        this.value = role.value;
        this.description = role.description;
        if(role.users) {
            this.users = role.users.map(user => new ViewUserDto(user));
        }
    }
    @ApiProperty({example: '8364800e-f6ac-11ee-a951-0242ac120002', description: 'id-роли.'})
    readonly id: string;

    @ApiProperty({example: 'admin', description: 'Значение роли пользователя.'})
    readonly value: string;

    @ApiProperty({example: 'Пользователь', description: 'Описание роли пользователя.'})
    readonly description: string;

    @ApiProperty({example: 'Пользователя', description: 'Пользователи.'})
    users: ViewUserDto[];
}