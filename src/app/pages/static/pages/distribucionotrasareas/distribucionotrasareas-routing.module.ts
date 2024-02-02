import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistribucionotrasareasComponent } from './distribucionotrasareas.component';

const routes: Routes = [
  {
    path: '',
    component: DistribucionotrasareasComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistribucionotrasareasRoutingModule { }
