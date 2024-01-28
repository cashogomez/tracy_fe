import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserResponse } from '@app/store/user';
import { Store } from '@ngrx/store';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import { concatAll } from 'rxjs';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule, Routes }   from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink, 
    RouterLinkActive,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatSidenavModule,
    MatTooltipModule,
    MatExpansionModule,
    MatListModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Output() menuToggle = new EventEmitter<void>();
  // usuario: UserResponse | null ={
  //   nombre: 'Juan',
  //   paterno: 'Perez',
  //   materno: 'perez',
  //   telefono: '2222222222',
  //   foto: '/assets/generales/silueta.jpg',
  //   email: 'juan@gmail.com',
  //   username: 'juanga',
  //   token: {
  //     access: '',
  //     refresh: '',
  //   }
  // };
  usuario: UserResponse | null = null;

  constructor(private store: Store<fromRoot.State>, private router: Router) {
    
  }

  ngOnInit(): void {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) { 
        this.recargar();
      }
    });
  }

  onMenuToggleDispatch(): void {
    this.menuToggle.emit();
  }
  recargar(): void {
    this.store.select(fromUser.getUserState).subscribe( rs => {
        const indexOfM = Object.keys(rs).indexOf( 'user' );
        const s:fromUser.UserState  = Object.values(rs)[indexOfM];
        this.usuario = JSON.parse(JSON.stringify(s.entity));   
    });
  }

  logout() {
    this.store.dispatch(new fromUser.SignOut());
  }
}
