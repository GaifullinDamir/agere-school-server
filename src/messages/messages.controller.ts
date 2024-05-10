import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { Message } from './messages.model';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@ApiTags('Сообщения')
@Controller('messages')
export class MessagesController {
    constructor(private messageService: MessagesService) {}
    
    @ApiOperation({summary: 'Создать сообщение.'})
    @ApiResponse({status: 200, type: Message})
    @ApiBearerAuth()
    @Roles('user')
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Post('/:lessonId')
    createMessage(@GetUser() actor: any, @Param('lessonId') lessonId: string, @Body() dto: CreateMessageDto) {
        return this.messageService.create(actor, lessonId, dto);
    }

    @ApiOperation({summary: 'Получить все сообщения урока.'})
    @ApiResponse({status: 200, type: [Message]})
    @ApiBearerAuth()
    @Roles('user')
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Get('/:lessonId')
    getAllMessages(@GetUser() actor: any, @Param('lessonId') lessonId: string) {
        return this.messageService.getAll(actor, lessonId);
    }

    @ApiOperation({summary: 'Получить все сообщения урока с пагинацией.'})
    @ApiResponse({status: 200, type: [Message]})
    @ApiBearerAuth()
    @Roles('user')
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Get('/:lessonId/:page&:size')
    getAllMessagesWithPagination(@GetUser() actor: any, @Param('lessonId') lessonId: string, @Param('page') page: number, @Param('size') size: number) {
        return this.messageService.getAllWithPagination(actor, lessonId, page, size);
    }

    @ApiOperation({summary: 'Изменить сообщение.'})
    @ApiResponse({status: 200, type: Message})
    @ApiBearerAuth()
    @Roles('admin', 'user')
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Put('/:messageId')
    updateMessage(@GetUser() actor: any, @Param('messageId') messageId: string, @Body() dto: UpdateMessageDto) {
        return this.messageService.update(actor, messageId, dto);
    }

    @ApiOperation({summary: 'Удалить сообщение.'})
    @ApiResponse({status: 200})
    @ApiBearerAuth()
    @Roles('admin', 'user')
    @UseGuards(RolesGuard)
    @Delete('/:messageId')
    deleteMessage(@GetUser() actor: any, @Param('messageId') messageId: string,) {
        return this.messageService.delete(actor, messageId);
    }
}
