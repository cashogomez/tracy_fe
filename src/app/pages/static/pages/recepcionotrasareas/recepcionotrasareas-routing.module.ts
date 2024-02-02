import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecepcionotrasareasComponent } from './recepcionotrasareas.component';

const routes: Routes = [
  {
    path: '',
    component: RecepcionotrasareasComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecepcionotrasareasRoutingModule { }
