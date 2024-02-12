import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramacioncirugiaComponent } from './programacioncirugia.component';

const routes: Routes = [
  {
    path: '',
    component: ProgramacioncirugiaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramacioncirugiaRoutingModule { }
