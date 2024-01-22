import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'auth',
                loadChildren: () => import('./pages/auth/auth.module').then(m=>m.AuthModule)
            },
            {
                path: 'static',
                loadChildren: () => import('./pages/static/static.module').then(m=>m.StaticModule)
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'static/welcome'
            }
        ]
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'static/404'
    }
];
