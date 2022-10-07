import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Scheduler } from './scheduler.entity';

@Injectable()
export class SchedulerService {
  constructor(
    @InjectRepository(Scheduler)
    private schedulerRepository: Repository<Scheduler>,
  ) {}

  async createScheduler({
    startHour,
    endHour,
    enabled,
  }: {
    startHour: string;
    endHour: string;
    enabled?: boolean;
  }) {
    return await this.schedulerRepository.save({
      startHour,
      endHour,
      enabled,
    });
  }

  async deleteScheduler(id: number) {
    return await this.schedulerRepository.delete(id);
  }

  async getAllSchedulers() {
    return await this.schedulerRepository.find();
  }

  async updateScheduler({
    id,
    startHour,
    endHour,
    enabled,
  }: {
    id: number;
    startHour?: string;
    endHour?: string;
    enabled?: boolean;
  }) {
    return await this.schedulerRepository.update(id, {
      startHour,
      endHour,
      enabled,
    });
  }

  async getSchedulerById(id: number) {
    return await this.schedulerRepository.findOneBy({ id });
  }

  async executeScheduler() {
    // TODO: implement this
  }
}
