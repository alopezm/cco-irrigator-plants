import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HardwareService } from "src/hardware/hardware.service";
import { SchedulerController } from "./scheduler.controller";
import { Scheduler } from "./scheduler.entity";
import { SchedulerService } from "./scheduler.service";

@Module({
  imports: [TypeOrmModule.forFeature([Scheduler]), HardwareService],
  controllers: [SchedulerController],
  providers: [SchedulerService, HardwareService],
})
export class SchedulerModule {}