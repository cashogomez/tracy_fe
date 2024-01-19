import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations} from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire/compat';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getPerformance, providePerformance } from '@angular/fire/performance';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import { getAuth, provideAuth} from '@angular/fire/auth';
import {getStorage, provideStorage} from '@angular/fire/storage';
import {
  getAnalytics,
  provideAnalytics,
} from '@angular/fire/analytics';

import { environment } from '@src/environments/environment';
import { NotificationModule } from './services';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(environment.firebase.config)),
      provideFirestore(() => getFirestore()),
      provideStorage(() => getStorage()),
      provideAuth(() => getAuth()),

      AngularFireModule.initializeApp(environment.firebase.config),

      provideAnalytics(() => getAnalytics()),
      provideFunctions(() => getFunctions()),
      provideMessaging(() => getMessaging()),
      providePerformance(() => getPerformance()),
      NotificationModule.forRoot(),
      
    ]),
    provideClientHydration(), 
    provideAnimations(),

  ]
};
