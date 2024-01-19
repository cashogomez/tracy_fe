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
    panelClass: ['error-snackbar']
  });
}

success(message: string): void {
  this.snackBar.openFromComponent(NotificationComponent, {
    duration: 4000,
    data: { message },
    panelClass: ['success-snackbar']
  });
}

}
