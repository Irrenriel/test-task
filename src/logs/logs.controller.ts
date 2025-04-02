import {
  Controller,
  Get,
  Param,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LogsService } from './logs.service';

@Controller('log')
export class LogsController {
  constructor(private logsService: LogsService) {}

  @Get('total/:user_id')
  @UseGuards(AuthGuard('jwt'))
  async getTotalPoints(@Param('user_id') userId: string, @Req() req) {
    const id = parseInt(userId, 10);
    if (req.user.id !== id) {
      throw new ForbiddenException('You can only access your own logs');
    }
    return this.logsService.getTotalPointsByStatus(id);
  }

  @Get('range/:user_id/:start_date/:end_date')
  @UseGuards(AuthGuard('jwt'))
  async getPointsInRange(
    @Param('user_id') userId: string,
    @Param('start_date') startDate: string,
    @Param('end_date') endDate: string,
    @Req() req,
  ) {
    const id = parseInt(userId, 10);
    if (req.user.id !== id) {
      throw new ForbiddenException('You can only access your own logs');
    }
    return this.logsService.getPointsInRangeByStatus(id, startDate, endDate);
  }
}
