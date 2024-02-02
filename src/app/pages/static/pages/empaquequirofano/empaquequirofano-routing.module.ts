import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpaquequirofanoComponent } from './empaquequirofano.component';

const routes: Routes = [
  {
    path: '',
    component: EmpaquequirofanoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpaquequirofanoRoutingModule { }
