import { Controller, Post } from '@nestjs/common';
import { HardwareService } from './hardware.service';

@Controller('hardwares')
export class HardwareController {
  constructor(private readonly hardwareService: HardwareService) {}

  @Post('on')
  async turnOn() {
    return await this.hardwareService.turnOn();
  }

  @Post('off')
  async turnOff() {
    return await this.hardwareService.turnOff();
  }
}
