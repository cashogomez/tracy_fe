import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LavadomanualComponent } from './lavadomanual.component';

const routes: Routes = [
  {
    path: '',
    component: LavadomanualComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LavadomanualRoutingModule { }
