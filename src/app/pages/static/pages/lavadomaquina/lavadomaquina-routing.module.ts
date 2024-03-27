import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LavadomaquinaComponent } from './lavadomaquina.component';

const routes: Routes = [
  {
    path: '',
    component: LavadomaquinaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LavadomaquinaRoutingModule { }
