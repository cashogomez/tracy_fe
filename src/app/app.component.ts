import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { IndicatorsModule } from './shared/indicators';
import { PopupsModule } from './shared/popups';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    IndicatorsModule,
    PopupsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'tracy_fe';
  showSpinner = false;
  constructor() {}

  ngOnInit() {

  }

  onToggleSpinner(): void {
    this.showSpinner = !this.showSpinner;
  }
}
