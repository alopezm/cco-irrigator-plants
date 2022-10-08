import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTImeSlotDto } from './dto/create-time-slot.dto';
import { DeleteTimeSlotParamsDto } from './dto/delete-time-slot-params.dto';
import { UpdateTimeSlotParamsDto } from './dto/update-time-slot-params.dto';
import { UpdateTimeSlotDto } from './dto/update-time-slot.dto';
import { TimeSlotService } from './time-slot.service';

@Controller('time-slots')
export class TimeSlotController {
  constructor(private readonly timeSlotService: TimeSlotService) {}

  @Get(':id')
  async getById(@Param('id') id: string) {
    const timeSlot = await this.timeSlotService.getById(id);

    if (!timeSlot) {
      throw new NotFoundException(`Time slot ${id} not found`);
    }

    return timeSlot;
  }

  @Get()
  async get() {
    const timeSlots = await this.timeSlotService.get();

    return timeSlots;
  }

  @Patch(':id')
  async update(
    @Param() params: UpdateTimeSlotParamsDto,
    @Body() body: UpdateTimeSlotDto,
  ) {
    const { id } = params;
    const { startHour, endHour, enabled } = body;
    const response = await this.timeSlotService.update({
      id,
      startHour,
      endHour,
      enabled,
    });

    const { affected = 0 } = response;
    if (affected === 0) {
      throw new NotFoundException(`Time slot ${id} not found`);
    }
  }

  @Post()
  async create(@Body() body: CreateTImeSlotDto) {
    const { startHour, endHour, enabled } = body;
    const timeSlot = await this.timeSlotService.create({
      startHour,
      endHour,
      enabled,
    });

    return timeSlot;
  }

  @Delete(':id')
  async deleteSchedule(@Param() params: DeleteTimeSlotParamsDto) {
    const { id } = params;
    const response = await this.timeSlotService.delete(id);
    const { affected = 0 } = response;

    if (affected === 0) {
      throw new NotFoundException(`Time slot ${id} not found`);
    }
  }
}
