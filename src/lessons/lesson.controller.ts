import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { Lesson } from './lesson.model';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { LessonsService } from './lesson.service';
import { ViewLessonDto } from './dto/view-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@ApiTags('Уроки')
@Controller('lessons')
export class LessonsController {
    constructor(private lessonService: LessonsService) {}

    @ApiOperation({summary: 'Создать урок.'})
    @ApiResponse({status: 200, type: Lesson})
    @Roles('admin', 'user')
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Post('/:moduleId')
    createLesson(@GetUser() actor: any, @Param('moduleId') moduleId: string, @Body() dto: CreateLessonDto) {
        return this.lessonService.create(actor, moduleId, dto);
    }

    @ApiOperation({summary: 'Получить все уроки.'})
    @ApiResponse({status: 200, type: [Lesson]})
    @Get('module/:moduleId')
    getAllModules(@Param('moduleId') moduleId: string) {
        return this.lessonService.getAll(moduleId);
    }

    @ApiOperation({summary: 'Получить урок по id.'})
    @ApiResponse({status: 200, type: [Lesson]})
    @Get('/:id')
    getLessonById(@Param('id') id: string) {
        return this.lessonService.getById(id);
    }

    @ApiOperation({summary: 'Изменить урок.'})
    @ApiResponse({status: 200, type: Lesson})
    @Roles('admin', 'user')
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Put('/:id')
    updateCourse(@Param('id') id: string, @Body() dto: UpdateLessonDto, @GetUser() actor: any,) {
        return this.lessonService.update(id, dto, actor);
    }

    @ApiOperation({summary: 'Удалить урок по id.'})
    @ApiResponse({status: 200})
    @Roles('admin', 'user')
    @UseGuards(RolesGuard)
    @Delete('/:id')
    deleteModule(@Param('id') id: string,  @GetUser() actor: any) {
        return this.lessonService.delete(id, actor);
    }
}
