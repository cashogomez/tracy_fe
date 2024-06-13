import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Observable, Subject } from 'rxjs';
import { DialogoComponent } from '@app/pages/static/pages/dialogos/dialogo/dialogo.component';
import { Distrib1Component } from '@app/pages/static/pages/dialogos/distrib1/distrib1.component';
import { Distrib22Component } from '@app/pages/static/pages/dialogos/distrib2-2/distrib2-2.component';
import { Distrib23Component } from '@app/pages/static/pages/dialogos/distrib2-3/distrib2-3.component';
import { Distrib2Component } from '@app/pages/static/pages/dialogos/distrib2/distrib2.component';
import { TransfAlmacenComponent } from '@app/pages/static/pages/dialogos/transf-almacen/transf-almacen.component';

import { EmergenteComponent } from './components/emergente/emergente.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private dataSource = new Subject<any>();
  data$ = this.dataSource.asObservable();
  constructor(
    private dialog: MatDialog
  ) {

  }
  showDialog(dynamicComponents$: Observable<any>) {
    this.dialog.open(EmergenteComponent, { data: dynamicComponents$ });
  }
  sendData(data: any) {
    this.dataSource.next(data);
  }
  

  emergente1(){
    this.dialog.open(DialogoComponent)
  }

  ditribucion1emergente(){
    this.dialog.open(Distrib1Component)
  }

  ditribucion2emergente(){
    this.dialog.open(Distrib2Component)
  }

  ditribucion2emergente2(){
    this.dialog.open(Distrib22Component)
  }

  ditribucion2emergente3(){
    this.dialog.open(Distrib23Component)
  }

  transfalmacen(){
    this.dialog.open(TransfAlmacenComponent)
  }

}
