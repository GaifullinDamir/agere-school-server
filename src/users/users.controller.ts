import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Put, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/auth/get-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { PickupRoleDto } from './dto/pickup-role.dto';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @ApiOperation({summary: 'Создать пользователя.'})
    @ApiResponse({status: 200, type: User})
    @UsePipes(ValidationPipe)
    @Post()
    createUser(@Body() userDto: CreateUserDto) {
        return this.usersService.create(userDto);
    }

    @ApiOperation({summary: 'Получить всех пользователей.'})
    @ApiResponse({status: 200, type: [User]})
    @ApiBearerAuth()
    @Roles('admin')
    @UseGuards(RolesGuard)
    @Get()
    getAllUsers() {
        return this.usersService.getAll();
    }

    @ApiOperation({summary: 'Получить всех пользователей с пагинацией.'})
    @ApiResponse({status: 200})
    @ApiBearerAuth()
    @Roles('admin')
    @UseGuards(RolesGuard)
    @Get('/:page&:size')
    getAllUsersWithPagination(@Param('page') page: number, @Param('size') size: number) {
        return this.usersService.getAllWithPagination(page, size);
    }

    @ApiOperation({summary: 'Получить пользователя по id.'})
    @ApiResponse({status: 200, type: User})
    @ApiBearerAuth()
    @Roles('admin', 'user')
    @UseGuards(RolesGuard)
    @Get('/:id')
    getUserById(@Param('id') id: string) {
        return this.usersService.getById(id);
    }

    @ApiOperation({summary: 'Изменить пользователя по id.'})
    @ApiResponse({status: 200, type: [Number]})
    @ApiBearerAuth()
    @Roles('admin', 'user')
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Put('/:id')
    @UseInterceptors(FileInterceptor('logo'))
    updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto, @GetUser() actor: any, 
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({fileType: /(jpg|jpeg|png)$/}),
                    new MaxFileSizeValidator({ maxSize: 1000 })
                ],
                fileIsRequired: false
            })
        ) file?: Express.Multer.File) {
            return this.usersService.update(id, dto, actor, file);
    }

    @ApiOperation({summary: 'Удалить пользователя по id.'})
    @ApiResponse({status: 200, type: Number})
    @ApiBearerAuth()
    @Roles('admin', 'user')
    @UseGuards(RolesGuard)
    @Delete('/:id')
    deleteUser(@Param('id') id: string, @GetUser() actor: any) {
        this.usersService.delete(id, actor)
    }

    @ApiOperation({summary: 'Выдать роль.'})
    @ApiResponse({status: 200})
    @ApiBearerAuth()
    @Roles('admin')
    @UseGuards(RolesGuard)
    @Post('/role/:id')
    addRole(@Param('id') userId: string, @Body() dto: AddRoleDto) {
        return this.usersService.addRole(userId, dto);
    }

    @ApiOperation({summary: 'Забрать роль.'})
    @ApiResponse({status: 200})
    @ApiBearerAuth()
    @Roles('admin')
    @UseGuards(RolesGuard)
    @Put('/role/:id')
    pickupRole(@Param('id') id: string, @Body() dto: PickupRoleDto) {
        return this.usersService.pickupRole(id, dto);
    }

    @ApiOperation({summary: 'Подписаться на курс.'})
    @ApiResponse({status: 200})
    @ApiBearerAuth()
    @Roles('user')
    @UseGuards(RolesGuard)
    @Post('/course/:id')
    subscribeToCurse(@Param('id') courseId: string, @GetUser() actor: any) {
        return this.usersService.subscribeToCourse(courseId, actor.id);
    }
}
