import { Body, Controller, Delete, FileTypeValidator, Get, Param, ParseFilePipe, Post, Put, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { CustomValidationPipe } from 'src/pipes/validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/auth/get-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @ApiOperation({summary: 'Создать пользователя.'})
    @ApiResponse({status: 200, type: User})
    @UsePipes(CustomValidationPipe)
    @Post()
    createUser(@Body() userDto: CreateUserDto) {
        return this.usersService.create(userDto);
    }

    @ApiOperation({summary: 'Получить всех пользователей.'})
    @ApiResponse({status: 200, type: [User]})
    @Roles('admin')
    @UseGuards(RolesGuard)
    @Get()
    getAllUsers() {
        return this.usersService.getAll();
    }

    @ApiOperation({summary: 'Получить пользователя по id.'})
    @ApiResponse({status: 200, type: User})
    @Roles('admin')
    @UseGuards(RolesGuard)
    @Get('/:id')
    getUserById(@Param('id') id: string) {
        return this.usersService.getById(id);
    }

    @ApiOperation({summary: 'Изменить пользователя по id.'})
    @ApiResponse({status: 200, type: [Number]})
    @Roles('admin', 'user')
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Put('/:id')
    @UseInterceptors(FileInterceptor('logo'))
    updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto, @GetUser() actor: any, 
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({fileType: /(jpg|jpeg|png)$/})
                ],
                fileIsRequired: false
            })
        ) file?: Express.Multer.File) {
            return this.usersService.update(id, dto, actor, file);
    }

    @ApiOperation({summary: 'Удалить пользщователя по id.'})
    @ApiResponse({status: 200, type: Number})
    @Roles('admin', 'user')
    @UseGuards(RolesGuard)
    @Delete('/:id')
    deleteUser(@Param('id') id: string, @GetUser() actor: any) {
        this.usersService.delete(id, actor)
    }

    @ApiOperation({summary: 'Выдать роль.'})
    @ApiResponse({status: 200})
    @Roles('admin')
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }
}
