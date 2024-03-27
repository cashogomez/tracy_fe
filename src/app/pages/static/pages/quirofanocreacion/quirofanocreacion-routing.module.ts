import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuirofanocreacionComponent } from './quirofanocreacion.component';

const routes: Routes = [
  {
    path: '',
    component: QuirofanocreacionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuirofanocreacionRoutingModule { }
