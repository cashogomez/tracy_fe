import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule} from '@angular/material/list';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-menu-lista',
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule,
    MatButtonModule,
    RouterOutlet,
    RouterLink, 
    RouterLinkActive
  ],
  templateUrl: './menu-lista.component.html',
  styleUrl: './menu-lista.component.scss'
})
export class MenuListaComponent implements OnInit{
  @Output() menuToggle = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {

  }

  closeMenu(): void {
    this.menuToggle.emit();
  }
}
