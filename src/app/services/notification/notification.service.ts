import { Injectable } from '@angular/core';
import { NotificationComponent } from './components';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

error(message: string): void {
  this.snackBar.openFromComponent(NotificationComponent, {
    duration: 4000,
    data: { message },
    panelClass: ['mat-snackbar_error']
  });
}

sucess(message: string): void {
  this.snackBar.openFromComponent(NotificationComponent, {
    duration: 4000,
    data: { message },
    panelClass: ['mat-snackbar_success']
  });
}

}
