import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HardwareModule } from './hardware/hardware.module';
import { HardwareService } from './hardware/hardware.service';
import { Scheduler } from './scheduler/scheduler.entity';
import { SchedulerModule } from './scheduler/scheduler.module';

@Module({
  imports: [
    HardwareModule,
    SchedulerModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'shoppingDB',
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      entities: [Scheduler],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, HardwareService],
})
export class AppModule {}
