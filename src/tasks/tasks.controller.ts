import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { CreateTaskDto } from './dto/create-task.dto';

@ApiTags('Задания')
@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @ApiOperation({summary: 'Создать задание.'})
    @ApiResponse({status: 200, type: Task})
    @Roles('admin', 'user')
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Post('/:lessonId')
    createTask(@GetUser() actor: any, @Param('lessonId') moduleId: string, @Body() dto: CreateTaskDto) {
        return this.taskService.create(actor, moduleId, dto);
    }

    @ApiOperation({summary: 'Получить все задачи урока.'})
    @ApiResponse({status: 200, type: [Task]})
    @Get('lessons/:lessonId')
    getAllModules(@Param('lessonId') lessonId: string) {
        return this.taskService.getAll(lessonId);
    }
}
