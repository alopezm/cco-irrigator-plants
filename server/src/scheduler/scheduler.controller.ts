import { Controller, Delete, Get, Param, Post } from "@nestjs/common";

@Controller('scheduler')
export class SchedulerController {
  @Get(':id')
  async getScheduler(
    @Param('id') id: string,
  ) {
    return id;
  }

  @Post()
  async createScheduler() {
    return 'create';
  }

  @Delete(':id')
  async deleteScheduler(
    @Param('id') id: string,
  ) {
    return 'delete'
  }

  @Get()
  async getAllSchedulers() {
    return 'getAll';
  }
}