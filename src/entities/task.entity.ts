import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

export enum TaskStatus {
  CREATED = 'created',
  PROGRESS = 'progress',
  HOLD = 'hold',
  DONE = 'done',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.CREATED })
  status: TaskStatus;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
