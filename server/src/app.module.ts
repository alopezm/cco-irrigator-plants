import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HardwareModule } from './hardware/hardware.module';
import { HardwareService } from './hardware/hardware.service';
import { SchedulerModule } from './scheduler/scheduler.module';

@Module({
  imports: [
    HardwareModule,
    SchedulerModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'irrigator-plants.db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService, HardwareService],
})
export class AppModule {}
