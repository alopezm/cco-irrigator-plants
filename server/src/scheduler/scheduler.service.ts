import { Injectable } from '@nestjs/common';
import { Cron } from "@nestjs/schedule";
import { InjectRepository } from '@nestjs/typeorm';
import { HardwareService } from "src/hardware/hardware.service";
import { Repository } from 'typeorm';
import { Scheduler } from './scheduler.entity';

@Injectable()
export class SchedulerService {
  constructor(
    @InjectRepository(Scheduler)
    private schedulerRepository: Repository<Scheduler>,
    private hardwareService: HardwareService,
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

  async deleteScheduler(id: string) {
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
    id: string;
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

  async getSchedulerById(id: string) {
    return await this.schedulerRepository.findOneBy({ id });
  }

  private async getOnScheduler() {
    const schedulers = await this.schedulerRepository.find({ 
      where: { enabled: true } 
    });

    return schedulers.map(scheduler => {
      const startDate = new Date();
      const endDate = new Date();
      const [startTimeHour, startTimeMinute] = scheduler.startHour.split(':');
      const [endTimeHour, endTimeMinute] = scheduler.endHour.split(':');
      startDate.setHours(parseInt(startTimeHour), parseInt(startTimeMinute));
      endDate.setHours(parseInt(endTimeHour), parseInt(endTimeMinute));
      return {
        ...scheduler,
        startDate: startDate,
        endDate: endDate,
      }    
    }).filter(scheduler => {
      const now = new Date();
      return now >= scheduler.startDate && now <= scheduler.endDate;
    })
  
  }

  @Cron('60 * * * * *')
  async executeScheduler() {
    // TODO: implement this
    const onSchedulers = await this.getOnScheduler()
    if(onSchedulers.length > 0) {
      await this.hardwareService.turnOn();
    }
    else {
      await this.hardwareService.turnOff();
    }
  }
  
}
