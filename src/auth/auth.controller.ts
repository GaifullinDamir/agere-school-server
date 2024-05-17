import { Body, Controller, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthUserDto } from 'src/users/dto/auth-user.dto';
import { LogoutUserDto } from 'src/users/dto/logout-user.dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    @ApiOperation({summary: 'Авторизация пользователя.'})
    @ApiResponse({status: 200})
    @Post('/login')
    @UsePipes(ValidationPipe)
    login(@Body() userDto: AuthUserDto) {
        return this.authService.login(userDto);
    }

    @ApiOperation({summary: 'Регистрация пользователя.'})
    @ApiResponse({status: 200})
    @Post('/registration')
    @UsePipes(ValidationPipe)
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto);
    }

    @ApiOperation({summary: 'Выход пользователя.'})
    @ApiResponse({status: 200})
    @Post('/logout')
    @UsePipes(ValidationPipe)
    logout(@Body() token: LogoutUserDto) {
        return this.authService.logout(token.refreshToken);
    }

    // @ApiOperation({summary: 'Проверка авторизции пользователя.'})
    // @ApiResponse({status: 200})
    // @Post('/check/:token')
    // checkIsAuth(@Param('token') token: string) {
    //     return this.authService.checkIsAuth(token);
    // }
}
