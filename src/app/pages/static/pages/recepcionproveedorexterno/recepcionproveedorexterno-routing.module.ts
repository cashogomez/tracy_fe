import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecepcionproveedorexternoComponent } from './recepcionproveedorexterno.component';

const routes: Routes = [
  {
    path: '',
    component: RecepcionproveedorexternoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecepcionproveedorexternoRoutingModule { }
