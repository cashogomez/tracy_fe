import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { IndicatorsModule } from './shared/indicators';
import { PopupsModule } from './shared/popups';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { NotificationService } from '@app/services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    IndicatorsModule,
    PopupsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'tracy_fe';
  showSpinner = false;
  constructor(
    private fs:AngularFirestore,
    private notification: NotificationService
    ) {}

  ngOnInit() {
    this.fs.collection('test').stateChanges().subscribe(personas => {
      console.log(personas.map(x => x.payload.doc.data()))
    })
  }

  onToggleSpinner(): void {
    this.showSpinner = !this.showSpinner;
  }

  onFilesChanged(urls: string | string[]): void {
    console.log('url', urls);
  }

  onSuccess() : void {
    this.notification.sucess("El procedimiento fue exitoso");
  }

  onError() : void {
    this.notification.error("Se encontraron errores en el proceso");
  }
}
