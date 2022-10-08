import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { HardwareService } from 'src/hardware/hardware.service';
import { Repository } from 'typeorm';
import { TimeSlot } from './time-slot.entity';

@Injectable()
export class TimeSlotService {
  constructor(
    @InjectRepository(TimeSlot)
    private timeSlotRepository: Repository<TimeSlot>,
    private hardwareService: HardwareService,
  ) {}

  async create({
    startHour,
    endHour,
    enabled,
  }: {
    startHour: string;
    endHour: string;
    enabled?: boolean;
  }) {
    return await this.timeSlotRepository.save({
      startHour,
      endHour,
      enabled,
    });
  }

  async delete(id: string) {
    return await this.timeSlotRepository.delete(id);
  }

  async get() {
    return await this.timeSlotRepository.find();
  }

  async update({
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
    return await this.timeSlotRepository.update(id, {
      startHour,
      endHour,
      enabled,
    });
  }

  async getById(id: string) {
    return await this.timeSlotRepository.findOneBy({ id });
  }

  private async findCurrentTimeSlot() {
    const timeSlots = await this.timeSlotRepository.find({
      where: { enabled: true },
    });

    const currentTimeSlot: TimeSlot | void = timeSlots.find((timeSlot) => {
      const startDate = new Date();
      const endDate = new Date();
      const [startTimeHour, startTimeMinute] = timeSlot.startHour.split(':');
      const [endTimeHour, endTimeMinute] = timeSlot.endHour.split(':');
      startDate.setHours(parseInt(startTimeHour), parseInt(startTimeMinute));
      endDate.setHours(parseInt(endTimeHour), parseInt(endTimeMinute));
      const now = new Date();

      // TODO: use library to is now is in the range at minutes level
      const shouldTurnOn = now >= startDate && now <= endDate;

      return shouldTurnOn;
    });

    return currentTimeSlot;
  }

  @Cron('59 * * * * *')
  async executeSchedule() {
    if (!this.hardwareService.isReady()) {
      return;
    }

    const currentTimeSlot = await this.findCurrentTimeSlot();
    if (currentTimeSlot) {
      await this.hardwareService.turnOn();
    } else {
      await this.hardwareService.turnOff();
    }
  }
}
