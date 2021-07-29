import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HardwareModule } from './hardware/hardware.module';
import { HardwareService } from './hardware/hardware.service';

@Module({
  imports: [HardwareModule],
  controllers: [AppController],
  providers: [AppService, HardwareService],
})
export class AppModule {}
