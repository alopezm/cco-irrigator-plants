import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HardwareModule } from "src/hardware/hardware.module";
import { SchedulerController } from "./scheduler.controller";
import { Scheduler } from "./scheduler.entity";
import { SchedulerService } from "./scheduler.service";

@Module({
  imports: [TypeOrmModule.forFeature([Scheduler]), HardwareModule],
  controllers: [SchedulerController],
  providers: [SchedulerService],
})
export class SchedulerModule {}