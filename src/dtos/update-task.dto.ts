import { IsEnum } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';

export class UpdateTaskDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
