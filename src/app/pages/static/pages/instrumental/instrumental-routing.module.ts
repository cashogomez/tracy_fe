import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstrumentalComponent } from './instrumental.component';

const routes: Routes = [
  {
    path: '',
    component: InstrumentalComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstrumentalRoutingModule { }
