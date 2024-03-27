import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EsterilizacionComponent } from './esterilizacion.component';

const routes: Routes = [
  {
    path: '',
    component: EsterilizacionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EsterilizacionRoutingModule { }
