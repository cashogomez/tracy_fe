import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmonempaquesComponent } from './admonempaques.component';

const routes: Routes = [
  {
    path: '',
    component: AdmonempaquesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmonempaquesRoutingModule { }
