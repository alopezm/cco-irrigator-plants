import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { HardwareModule } from './hardware/hardware.module';
import { TimeSlot } from './time-slot/time-slot.entity';
import { TimeSlotModule } from './time-slot/time-slot.module';

@Module({
  imports: [
    HardwareModule,
    TimeSlotModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'irrigator-plants.db',
      entities: [TimeSlot],
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
})
export class AppModule {}
