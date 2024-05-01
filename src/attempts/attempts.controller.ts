import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AttemptsService } from './attempts.service';
import { Attempt } from './attempts.model';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { CreateAttemptDto } from './dto/create-attempt.dto';

@ApiTags('Попытки')
@Controller('attempts')
export class AttemptsController {
    constructor(private attemptService: AttemptsService) {}

    @ApiOperation({summary: 'Создать попытку.'})
    @ApiResponse({status: 200, type: Attempt})
    @Roles('admin', 'user')
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Post('/:taskId')
    createAttempt(@GetUser() actor: any, @Param('taskId') taskId: string, @Body() dto: CreateAttemptDto) {
        return this.attemptService.create(actor, taskId, dto);
    }

    @ApiOperation({summary: 'Получить попытку по id задачи.'})
    @ApiResponse({status: 200, type: Attempt})
    @Roles('admin', 'user')
    @UseGuards(RolesGuard)
    @Get('/:taskId')
    getAttemptByTeskId(@GetUser() actor: any, @Param('taskId') taskId: string) {
        return this.attemptService.getByTaskId(actor, taskId);
    }
}
