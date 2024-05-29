import { Injectable } from '@angular/core';
import { Observable, map, takeWhile, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentaregresivaService {

  constructor() { }

  getRemainingTimeObservable(endTime:string):Observable<any> {
    
    return timer(0, 1000).pipe(
      map(() => {
        const total = Date.parse(endTime) - Date.parse(new Date().toString());
        const seconds =  Math.floor((total / 1000) % 60);
        const minutes =  Math.floor((total / 1000 / 60) % 60);
        const horas =    Math.floor((total /1000  /3600)%60)

        return {total, seconds, minutes, horas}
      }),
      takeWhile(({ total }) => total >= 0, true)
    )
  }
}
