import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as fromActions from './user.actions';
import { Injectable, effect } from '@angular/core';
import { AuthService, NotificationService } from '@app/services';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '@src/environments/environment'
import { UserResponse } from './user.models';


type Action = fromActions.All;

@Injectable()
export class UserEffects {
    constructor(
        private httpClient: HttpClient,
        private actions: Actions,
        private notification: NotificationService,
        private router: Router,
        private authService : AuthService
    ) { }
    

    signUpEmail: Observable<Action> = createEffect(() =>
        this.actions.pipe(
            ofType(fromActions.Types.SIGIN_UP_EMAIL),
            map((action: fromActions.SignUpEmail) => action.user),
            switchMap(userData =>
                this.authService.signUp(userData)
                    .pipe(
                        tap((response: UserResponse) => {
                            console.log('+++++++++++++++');
                            console.log(userData)
                            console.log('+++++++++++++++');
                            localStorage.setItem('token', response.token.access);
                            this.router.navigate(['/']);
                            this.notification.success("¡El usuario se registró correctamente!");
                        }),
 
                        map((response: UserResponse) => new fromActions.SignUpEmailSuccess(response.email, response || null)),
                        catchError(err => {
                            this.notification.error("Errores al registrar un nuevo usuario");
                            return of(new fromActions.SignUpEmailError(err.message));
                        })
                    )
            )
        )
    );

    signInEmail: Observable<Action> = createEffect(() =>
        this.actions.pipe(
            ofType(fromActions.Types.SIGIN_IN_EMAIL),
            map((action: fromActions.SignInEmail) => action.credentials),
            switchMap(userData =>
                this.authService.logIn(userData)
                    .pipe(               
                        tap((response: UserResponse) => {
                            localStorage.setItem('token', response.token.access);
                            this.router.navigate(['/']);
                            this.notification.success("El usuario ingresó correctamente");
                        }),
                        map((response: UserResponse) => new fromActions.SignInEmailSuccess(response.email, response || null)),
                        catchError(err => {
                            this.notification.error("Las credenciales son incorrectas");
                            return of(new fromActions.SignInEmailError(err.message));
                        })
                    )
            )
        )
    );

    init: Observable<Action> = createEffect(() =>
        this.actions.pipe(
            ofType(fromActions.Types.INIT),
            switchMap(async () => localStorage.getItem('token')),
            switchMap(token => {
                if(token)
                {
                    return this.httpClient.get<UserResponse>(`${environment.url}cuenta/session/`)
                    .pipe(
                        tap((response: UserResponse) => {
                            console.log('Data del usuario en sesión que viene del servidor', response);
                        }),
                        map((response: UserResponse) => new fromActions.InitAuthorized(response.email, response || null)),
                        catchError(err => {
                            return of(new fromActions.InitError(err.message));
                        })
                    )
                }
                else {
                    return of(new fromActions.InitUnauthorized() );
                }

            }

            )
        )
    );

    SignOut: Observable<Action> = createEffect(() =>
        this.actions.pipe(
            ofType(fromActions.Types.SIGIN_OUT_EMAIL),
            switchMap(async () => localStorage.getItem('token')),
            switchMap(token =>
                this.authService.logout(token!)
                    .pipe(               
                        tap((response: any) => {
                            localStorage.removeItem('token');
                            this.router.navigate(['/']);
                            this.notification.success("Salida del usuario exitosa");
                        }),
                        map((response: any) => new fromActions.SignOutSuccess()),
                        catchError(err => {
                            this.notification.error("Las credenciales son incorrectas");
                            return of(new fromActions.SignOutError(err.message));
                        })
                    )
            )
        )
    );



}