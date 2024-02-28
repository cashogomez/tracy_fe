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
import { Observable, map} from 'rxjs';
import { interval, takeUntil, timer } from 'rxjs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule, Routes }   from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { DATE_PIPE_DEFAULT_OPTIONS } from "@angular/common";
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es');
import { LOCALE_ID } from '@angular/core';
import { IntervalRunner, IntervalRunnerOptions } from '@app/services/tiempo/tiempo.service';

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
  providers: [
    {provide: LOCALE_ID, useValue: 'es-MX' },
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: "longDate" },
    },
    IntervalRunner
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
  usuario: UserResponse | null = null;
  fechaActual !: Observable<any>
  fecha : Date = new Date();
  message: Date = new Date;
  constructor(private store: Store<fromRoot.State>, private router: Router, private runner: IntervalRunner ) {
 
}

  ngOnInit(): void {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) { 
        this.recargar();
      }
    })
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
  start() {
    this.runner.start(
      new IntervalRunnerOptions(e => (this.message = new Date()), 1000, 0, 5)
    );
  }

  stop() {
    this.runner.stop();
  }
}
