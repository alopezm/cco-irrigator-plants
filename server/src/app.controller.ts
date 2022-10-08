import { Controller, Get } from '@nestjs/common';
import { HardwareService } from './hardware/hardware.service';

@Controller()
export class AppController {
  constructor(private readonly hardwareService: HardwareService) {}

  @Get()
  getHelloWorld(): string {
    return 'Hello World!';
  }
}
