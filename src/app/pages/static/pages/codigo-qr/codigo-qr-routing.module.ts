import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodigoQRComponent } from './codigo-qr.component';

const routes: Routes = [
  {
    path: '',
    component: CodigoQRComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodigoQRRoutingModule { }
