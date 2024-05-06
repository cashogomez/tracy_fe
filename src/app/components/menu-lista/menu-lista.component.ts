import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';

@Component({
  selector: 'app-menu-lista',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatTooltipModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,

    RouterOutlet,
    RouterLink, 
    RouterLinkActive,
  ],
  templateUrl: './menu-lista.component.html',
  styleUrl: './menu-lista.component.scss'
})
export class MenuListaComponent implements OnInit{
  @Output() menuToggle = new EventEmitter<void>();
  // usuario: fromUser.UserResponse| null ={
  //   nombre: 'Juan',
  //   paterno: 'Perez',
  //   materno: 'perez',
  //   telefono: '2222222222',
  //   foto: '/assets/generales/silueta.jpg',
  //   email: 'juan@gmail.com',
  //   username: 'juanga',
  //   numeroEmpleado: '',
  //   puesto: '',
  //   area: '',
  //   empresa_id: '',
  //   is_active: 'false',
  //   is_admin: 'false',
  //   is_staff: 'false',
  //   is_superadmin: 'false',
  //   response: '',
  //   token: {
  //     access: '',
  //     refresh: '',
  //   }
  // };
  usuario: fromUser.UserResponse | null = null;
  constructor(private store: Store<fromRoot.State>, private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) { 
        this.recargar();
      }
    });
  }

  closeMenu(): void {
    this.menuToggle.emit();
  }

  recargar(): void {
    this.store.select(fromUser.getUserState).subscribe( rs => {
        const indexOfM = Object.keys(rs).indexOf( 'user' );
        const s:fromUser.UserState  = Object.values(rs)[indexOfM];
        this.usuario = JSON.parse(JSON.stringify(s.entity));   
    });
  }
  onMenuToggleDispatch(): void {
    this.menuToggle.emit();
  }

}
