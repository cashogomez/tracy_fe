import { Injectable } from "@angular/core";
import { Subscription, timer } from "rxjs";
import { switchMap } from "rxjs/operators";

export class IntervalRunnerOptions {
  constructor(
    public callback: (e: any) => void,
    public period: number = 1000,
    public initialDelay: number = 0,
    public TotalTime: number
  ) {}
}

export class IntervalRunner {
  subscription: Subscription | null = null;

  start(options: IntervalRunnerOptions) {
    if (this.subscription == null) {
      this.subscription = timer(options.initialDelay, options.period).subscribe(
        result => options.callback(result)
      );
    }
  }

  stop() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
