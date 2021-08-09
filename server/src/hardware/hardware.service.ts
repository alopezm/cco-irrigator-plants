import { Injectable } from '@nestjs/common';
import { Board, Pin } from 'johnny-five';
import { filter, first, fromEvent, Observable, Subject } from 'rxjs';

@Injectable()
export class HardwareService {
  private motorSignal$: Subject<boolean>;
  private motorStatus$: Subject<boolean>;
  constructor() {
    const board = new Board({ repl: false });
    // TODO: cehck if we can use BehaviorSubject instead of 2 subjects
    // https://rxjs.dev/guide/subject#behaviorsubject
    this.motorSignal$ = new Subject();
    this.motorStatus$ = new Subject();

    fromEvent(board as any, 'ready').subscribe(() => {
      const motor = new Pin(13);

      this.motorSignal$.subscribe((state) => {
        state ? motor.high() : motor.low();

        motor.query((pinState) => {
          this.motorStatus$.next(pinState.value !== 0);
        });
      });
    });
  }

  async turnOn(): Promise<string> {
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
