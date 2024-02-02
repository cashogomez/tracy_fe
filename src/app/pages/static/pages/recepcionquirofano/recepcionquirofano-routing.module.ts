import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecepcionquirofanoComponent } from './recepcionquirofano.component';

const routes: Routes = [
  {
    path: '',
    component: RecepcionquirofanoComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecepcionquirofanoRoutingModule { }
