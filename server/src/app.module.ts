import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { HardwareModule } from './hardware/hardware.module';
import { Scheduler } from './scheduler/scheduler.entity';
import { SchedulerModule } from './scheduler/scheduler.module';

@Module({
  imports: [
    HardwareModule,
    SchedulerModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'irrigator-plants.db',
      entities: [Scheduler],
      synchronize: true,
    }),
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
})
export class AppModule {}
