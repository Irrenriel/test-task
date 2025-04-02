import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
  Patch,
  Delete,
  UsePipes,
  ValidationPipe,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async createTask(@Body() createTaskDto: CreateTaskDto, @Req() req) {
    return this.tasksService.createTask(createTaskDto, req.user);
  }

  @Get('/users/:id/tasks')
  @UseGuards(AuthGuard('jwt'))
  async getTasks(@Param('id') id: string, @Req() req) {
    const userId = parseInt(id, 10);
    if (req.user.id !== userId) {
      throw new ForbiddenException('You can only access your own tasks');
    }
    return this.tasksService.getTasksByUser(userId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req,
  ) {
    const taskId = parseInt(id, 10);
    return this.tasksService.updateTask(taskId, updateTaskDto, req.user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteTask(@Param('id') id: string, @Req() req) {
    const taskId = parseInt(id, 10);
    return this.tasksService.deleteTask(taskId, req.user);
  }
}
