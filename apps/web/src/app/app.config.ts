import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { webShellRoutes } from '@ecosystem/web-shell-feature';
import { environment } from '../environments/environment.development';

import en from '@angular/common/locales/en';
registerLocaleData(en);

/** config ng-zorro-antd i18n **/
import { provideNzI18n, en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import { ApiInterceptor } from './interceptors/api.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(webShellRoutes),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
     {
      provide: HTTP_INTERCEPTORS,
      useValue: new ApiInterceptor(environment.baseUrl),
      multi: true
    },
    provideNzI18n(en_US)
  ]
};