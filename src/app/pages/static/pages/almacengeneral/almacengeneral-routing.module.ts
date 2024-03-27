import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlmacengeneralComponent } from './almacengeneral.component';

const routes: Routes = [
  {
    path: '',
    component: AlmacengeneralComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlmacengeneralRoutingModule { }
