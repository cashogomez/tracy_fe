import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuirofanoinformacionComponent } from './quirofanoinformacion.component';

const routes: Routes = [
  {
    path: '',
    component: QuirofanoinformacionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuirofanoinformacionRoutingModule { }
