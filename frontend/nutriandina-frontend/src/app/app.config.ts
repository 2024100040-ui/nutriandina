import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '../services/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    providePrimeNG({
        theme: {
            preset: Aura, options:{
              darkModeSelector: false
            }
        }, 
        license: 'eyJpZCI6IjBkZWQ0YjkyLWFhZTUtNDAwOC05NjQ1LTVhNjAxOTc3ZTAyOSIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3OTI1OTk0MDQsImV4cCI6MTgyNDEzNTQwNH0.77e9nC32O8ze-uQHpvVusYvW5vvsVbWnpIGt_xSmafXO7uYAnOSISMUxll0jfgyyjvjad6FwE0vAxxR-KmofCQ'

    }),
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
}
