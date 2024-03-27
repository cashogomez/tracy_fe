import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpaqueotrasareasComponent } from './empaqueotrasareas.component';

const routes: Routes = [
  {
    path: '',
    component: EmpaqueotrasareasComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpaqueotrasareasRoutingModule { }
