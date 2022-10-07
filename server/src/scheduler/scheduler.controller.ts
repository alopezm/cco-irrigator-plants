import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';

@Controller('scheduler')
export class SchedulerController {
  constructor(private readonly schedulerService: SchedulerService) {}

  @Get(':id')
  async getScheduler(@Param('id') id: number) {
    const scheduler = await this.schedulerService.getSchedulerById(id);
    return scheduler;
  }

  @Get()
  async getAllSchedulers() {
    const schedulers = await this.schedulerService.getAllSchedulers();
    return schedulers;
  }

  @Patch(':id')
  async updateScheduler(
    @Param('id') id: number,
    @Body('startHour') startHour?: string,
    @Body('endHour') endHour?: string,
    @Body('enabled') enabled?: boolean
  ) {
    const scheduler = await this.schedulerService.updateScheduler({
      id,
      startHour,
      endHour,
      enabled,
    });
    return scheduler;
  }

  @Post()
  async createScheduler(
    @Body('startHour') startHour: string,
    @Body('endHour') endHour: string,
  ) {
    const scheduler = await this.schedulerService.createScheduler({
      startHour,
      endHour,
    });
    return scheduler;
  }

  @Delete(':id')
  async deleteScheduler(@Param('id') id: number) {
    const scheduler = await this.schedulerService.deleteScheduler(id);
    return scheduler;
  }
}
