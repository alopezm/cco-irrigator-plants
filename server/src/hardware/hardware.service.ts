import { Injectable } from '@nestjs/common';

@Injectable()
export class HardwareService {
  async turnOn(): Promise<string> {
    console.log('turn on')
    return 'turn on'
  }

  async turnOff(): Promise<string> {
    console.log('turn off')
    return 'turn off'
  }
}
