import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from '../entities/log.entity';
import { User } from '../entities/user.entity';
import { Task } from '../entities/task.entity';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(Log)
    private logsRepository: Repository<Log>,
  ) {}

  async createLog(user: User, task: Task, points: number, new_status: string) {
    const log = this.logsRepository.create({ user, task, points, new_status });
    await this.logsRepository.save(log);
  }

  async getTotalPointsByStatus(userId: number) {
    const result = await this.logsRepository
      .createQueryBuilder('log')
      .select('log.new_status', 'status')
      .addSelect('SUM(log.points)', 'total')
      .where('log.userId = :userId', { userId })
      .groupBy('log.new_status')
      .getRawMany();

    const totalPoints = {};
    result.forEach((row) => {
      totalPoints[row.status] = parseInt(row.total, 10);
    });
    return totalPoints;
  }

  async getPointsInRangeByStatus(
    userId: number,
    startDate: string,
    endDate: string,
  ) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const result = await this.logsRepository
      .createQueryBuilder('log')
      .select('log.new_status', 'status')
      .addSelect('SUM(log.points)', 'total')
      .where('log.userId = :userId', { userId })
      .andWhere('log.timestamp >= :start', { start })
      .andWhere('log.timestamp <= :end', { end })
      .groupBy('log.new_status')
      .getRawMany();

    const totalPoints = {};
    result.forEach((row) => {
      totalPoints[row.status] = parseInt(row.total, 10);
    });
    return totalPoints;
  }
}
