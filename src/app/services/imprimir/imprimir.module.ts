import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImprimirService } from './imprimir.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ImprimirModule { 
  static forRoot(): ModuleWithProviders<ImprimirModule>{
    return {
      ngModule: ImprimirModule,
      providers: [

      ]
    };
  }
}
