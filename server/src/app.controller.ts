import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { HardwareService } from './hardware/hardware.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly hardwareService: HardwareService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/on')
  async turnOn(): Promise<string> {
    return await this.hardwareService.turnOn();
  }

  @Get('/off')
  async turnOff(): Promise<string> {
    return await this.hardwareService.turnOff();
  }
}
