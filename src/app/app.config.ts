import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { requestInterceptorInterceptor } from './Authentication/request-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes)), 
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([requestInterceptorInterceptor])),
  ]
};
