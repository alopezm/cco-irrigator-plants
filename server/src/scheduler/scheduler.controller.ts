import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateSchedulerDto } from './dto/create-scheduler.dto';
import { UpdateSchedulerDto } from './dto/update-scheduler.dto';
import { SchedulerService } from './scheduler.service';

@Controller('scheduler')
export class SchedulerController {
  constructor(private readonly schedulerService: SchedulerService) {}

  @Get(':id')
  async getScheduler(@Param('id') id: string) {
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
    @Param('id') id: string,
    @Body() body: UpdateSchedulerDto,
  ) {
    const { startHour, endHour, enabled } = body;
    const scheduler = await this.schedulerService.updateScheduler({
      id,
      startHour,
      endHour,
      enabled,
    });
    return scheduler;
  }

  @Post()
  async createScheduler(@Body() body: CreateSchedulerDto) {
    const { startHour, endHour, enabled } = body;
    const scheduler = await this.schedulerService.createScheduler({
      startHour,
      endHour,
      enabled,
    });
    return scheduler;
  }

  @Delete(':id')
  async deleteScheduler(@Param('id') id: string) {
    const scheduler = await this.schedulerService.deleteScheduler(id);
    return scheduler;
  }
}
