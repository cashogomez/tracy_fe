import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { EmergenteComponent } from './components/emergente/emergente.component';



@Injectable({
  providedIn: 'root',
})
export class DynamicDialogService {
  private dataSource = new Subject<any>();
  data$ = this.dataSource.asObservable();
  constructor(private dialog: MatDialog) {

  }

  showDialog(dynamicComponents$: Observable<any>) {
    this.dialog.open(EmergenteComponent, { data: dynamicComponents$ });
  }
  sendData(data: any) {
    this.dataSource.next(data);
  }
  

}