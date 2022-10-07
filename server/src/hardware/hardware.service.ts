import { Injectable } from '@nestjs/common';
import { Board, Pin } from 'johnny-five';
import { filter, first, fromEvent, Subject } from 'rxjs';

@Injectable()
export class HardwareService {
  private motorSignal$: Subject<boolean>;
  private motorStatus$: Subject<boolean>;
  private isBoardReady = false;

  constructor() {
    console.log('Starting hardware service');
    const board = new Board({ repl: false });
    // TODO: cehck if we can use BehaviorSubject instead of 2 subjects
    // https://rxjs.dev/guide/subject#behaviorsubject
    this.motorSignal$ = new Subject();
    this.motorStatus$ = new Subject();

    fromEvent(board as any, 'ready').subscribe(() => {
      this.isBoardReady = true;
      console.log('Board ready!');
      const motor = new Pin(13);

      this.motorSignal$.subscribe((state) => {
        state ? motor.high() : motor.low();

        motor.query((pinState) => {
          this.motorStatus$.next(pinState.value !== 0);
          console.log('motor status', pinState.value !== 0);
        });
      });
    });
  }

  isReady(): boolean {
    return this.isBoardReady;
  }

  async turnOn(): Promise<string> {
    console.log('trying to turn on');
    this.motorSignal$.next(true);
    await this.motorStatus$
      .pipe(
        filter((state) => state === true),
        first(),
      )
      .toPromise();

    return 'turn on';
  }

  async turnOff(): Promise<string> {
    console.log('trying to turn off');
    this.motorSignal$.next(false);
    await this.motorStatus$
      .pipe(
        filter((state) => state === false),
        first(),
      )
      .toPromise();

    return 'turn off';
  }
}
