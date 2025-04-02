import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { User } from '../entities/user.entity';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { LogsService } from '../logs/logs.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private logsService: LogsService,
  ) {}

  async createTask(createTaskDto: CreateTaskDto, user: User) {
    const task = this.tasksRepository.create({ ...createTaskDto, user });
    await this.tasksRepository.save(task);
    return task;
  }

  async getTasksByUser(userId: number) {
    return this.tasksRepository.find({ where: { user: { id: userId } } });
  }

  async updateTask(taskId: number, updateTaskDto: UpdateTaskDto, user: User) {
    const task = await this.tasksRepository.findOne({
      where: { id: taskId, user: { id: user.id } },
    });
    if (!task) throw new NotFoundException('Task not found');
    task.status = updateTaskDto.status;
    await this.tasksRepository.save(task);
    await this.logsService.createLog(user, task, 2, updateTaskDto.status);
    return task;
  }

  async deleteTask(taskId: number, user: User) {
    const task = await this.tasksRepository.findOne({
      where: { id: taskId, user: { id: user.id } },
    });
    if (!task) throw new NotFoundException('Task not found');
    await this.tasksRepository.remove(task);
    return { message: 'Task deleted' };
  }
}
