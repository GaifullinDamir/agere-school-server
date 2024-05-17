import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ViewRoleDto } from './dto/view-role.dto';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) {}

    @ApiOperation({summary: 'Создать роль.'})
    @ApiResponse({status: 200, type: ViewRoleDto})
    // @ApiBearerAuth()
    // @Roles('admin')
    // @UseGuards(RolesGuard)
    // @UsePipes(ValidationPipe)
    @Post()
    createRole(@Body() dto: CreateRoleDto) {
        return this.roleService.create(dto);
    }

    @ApiOperation({summary: 'Получить все роли.'})
    @ApiResponse({status: 200, type: [ViewRoleDto]})
    @Get()
    getAllRoles() {
        return this.roleService.getAll();
    }

    @ApiOperation({summary: 'Получить роль по значению.'})
    @ApiResponse({status: 200, type: ViewRoleDto})
    @Get('/:value')
    getRoleByValue(@Param('value') value: string) {
        return this.roleService.getByValue(value);
    }

    @ApiOperation({summary: 'Изменить роль.'})
    @ApiResponse({status: 200, type: [Number]})
    @ApiBearerAuth()
    @Roles('admin')
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Put('/:id')
    updateRole(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
        return this.roleService.update(id, dto);
    }

    @ApiOperation({summary: 'Удалить роль.'})
    @ApiResponse({status: 200, type: Number})
    @ApiBearerAuth()
    @Roles('admin')
    @UseGuards(RolesGuard)
    @Delete('/:id')
    deleteRole(@Param('id') id: string) {
        return this.roleService.delete(id);
    }

}
