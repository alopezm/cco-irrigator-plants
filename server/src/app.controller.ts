import { Controller, Get, Post } from '@nestjs/common';
import { HardwareService } from './hardware/hardware.service';

@Controller()
export class AppController {
  constructor(private readonly hardwareService: HardwareService) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Post('/on')
  async turnOn(): Promise<string> {
    return await this.hardwareService.turnOn();
  }

  @Post('/off')
  async turnOff(): Promise<string> {
    return await this.hardwareService.turnOff();
  }
}
