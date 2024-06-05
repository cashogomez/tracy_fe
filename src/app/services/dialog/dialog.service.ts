import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogoComponent } from '@app/pages/static/pages/dialogos/dialogo/dialogo.component';
import { Distrib1Component } from '@app/pages/static/pages/dialogos/distrib1/distrib1.component';
import { Distrib22Component } from '@app/pages/static/pages/dialogos/distrib2-2/distrib2-2.component';
import { Distrib23Component } from '@app/pages/static/pages/dialogos/distrib2-3/distrib2-3.component';
import { Distrib2Component } from '@app/pages/static/pages/dialogos/distrib2/distrib2.component';
import { TransfAlmacenComponent } from '@app/pages/static/pages/dialogos/transf-almacen/transf-almacen.component';
@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor( private matDialog: MatDialog) { }


  emergente1(){
    this.matDialog.open(DialogoComponent)
  }

  ditribucion1emergente(){
    this.matDialog.open(Distrib1Component)
  }

  ditribucion2emergente(){
    this.matDialog.open(Distrib2Component)
  }

  ditribucion2emergente2(){
    this.matDialog.open(Distrib22Component)
  }

  ditribucion2emergente3(){
    this.matDialog.open(Distrib23Component)
  }

  transfalmacen(){
    this.matDialog.open(TransfAlmacenComponent)
  }

}
