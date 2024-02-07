import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EmergenteComponent } from './components/emergente/emergente.component';

@Injectable({
  providedIn: 'root',
})
export class DynamicDialogService {
  constructor(private dialog: MatDialog) {}

  showDialog(dynamicComponents$: Observable<any>) {
    this.dialog.open(EmergenteComponent, { data: dynamicComponents$ });
  }
}
