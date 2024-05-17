import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { CoursesService } from './courses.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Course } from './courses.model';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { UpdateCourseDto } from './dto/update-course.dto';

@ApiTags('Курсы')
@Controller('courses')
export class CoursesController {
    constructor(private courseService: CoursesService) {}

    @ApiOperation({summary: 'Создать курс.'})
    @ApiResponse({status: 200, type: Course})
    @ApiBearerAuth()
    @Roles("user")
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Post()
    @UseInterceptors(FileInterceptor('logo'))
    createCourse(@GetUser() user: any, @Body() dto: CreateCourseDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({fileType: /(jpg|jpeg|png)$/}),
                ]
            })
        ) logo: Express.Multer.File) {
        return this.courseService.create(dto,user.id, logo);
    }

    @ApiOperation({summary: 'Получить все курсы.'})
    @ApiResponse({status: 200, type: [Course]})
    @ApiBearerAuth()
    @Roles('admin')
    @UseGuards(RolesGuard)
    @Get()
    getAllCourses() {
        return this.courseService.getAll();
    }

    @ApiOperation({summary: 'Получить все курсы с пагинацией.'})
    @ApiResponse({status: 200})
    @ApiBearerAuth()
    @Roles('admin')
    @UseGuards(RolesGuard)
    @Get('/:page&:size')
    getAllCoursesWithPagination(@Param('page') page: number, @Param('size') size: number) {
        return this.courseService.getAllWithPagination(page, size);
    }

    @ApiOperation({summary: 'Получить курс по id.'})
    @ApiResponse({status: 200, type: Course})
    @Get('/:id')
    getCourseById(@Param('id') id: string) {
        return this.courseService.getById(id);
    }

    @ApiOperation({summary: 'Получить все видимые крусы с пагинацией.'})
    @ApiResponse({status: 200})
    @Get('/visible/:page&:size')
    getAllVisibleCoursesWithPagination(@Param('page') page: number, @Param('size') size: number) {
        return this.courseService.getAllVisibleWithPagination(page, size);
    }

    @ApiOperation({summary: 'Изменить курс.'})
    @ApiResponse({status: 200, type: [Number]})
    @ApiBearerAuth()
    @Roles('admin', 'user')
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Put('/:id')
    @UseInterceptors(FileInterceptor('logo'))
    updateCourse(@Param('id') id: string, @Body() dto: UpdateCourseDto, @GetUser() user: any,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({fileType: /(jpg|jpeg|png)$/}),
                ],
                fileIsRequired: false
            })
        ) file?: Express.Multer.File) {
        return this.courseService.update(id, dto, user.id, file);
    }

    @ApiOperation({summary: 'Удалить курс по id.'})
    @ApiResponse({status: 200, type: Number})
    @ApiBearerAuth()
    @Roles('admin', 'user')
    @UseGuards(RolesGuard)
    @Delete('/:id')
    deleteCourse(@Param('id') id: string,  @GetUser() user: any) {
        return this.courseService.delete(id, user);
    }

    
}
