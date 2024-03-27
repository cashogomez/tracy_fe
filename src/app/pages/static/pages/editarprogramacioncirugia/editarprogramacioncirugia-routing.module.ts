import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarprogramacioncirugiaComponent } from './editarprogramacioncirugia.component';

const routes: Routes = [
  {
    path: '',
    component: EditarprogramacioncirugiaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditarprogramacioncirugiaRoutingModule { }
