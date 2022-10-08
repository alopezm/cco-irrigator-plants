import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HardwareModule } from 'src/hardware/hardware.module';
import { TimeSlotController } from './time-slot.controller';
import { TimeSlot } from './time-slot.entity';
import { TimeSlotService } from './time-slot.service';

@Module({
  imports: [TypeOrmModule.forFeature([TimeSlot]), HardwareModule],
  controllers: [TimeSlotController],
  providers: [TimeSlotService],
})
export class TimeSlotModule {}
