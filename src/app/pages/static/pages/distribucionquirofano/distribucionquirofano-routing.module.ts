import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistribucionquirofanoComponent } from './distribucionquirofano.component';

const routes: Routes = [
  {
    path: '',
    component: DistribucionquirofanoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistribucionquirofanoRoutingModule { }
