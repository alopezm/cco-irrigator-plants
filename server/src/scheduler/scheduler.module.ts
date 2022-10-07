import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SchedulerController } from "./scheduler.controller";
import { Scheduler } from "./scheduler.entity";
import { SchedulerService } from "./scheduler.service";

@Module({
  imports: [TypeOrmModule.forFeature([Scheduler])],
  controllers: [SchedulerController],
  providers: [SchedulerService],
})
export class SchedulerModule {}