import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Task } from './task.entity';

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Task)
  task: Task;

  @Column()
  points: number;

  @Column()
  new_status: string;

  @CreateDateColumn()
  timestamp: Date;
}
