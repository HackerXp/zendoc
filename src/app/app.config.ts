import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
// Importações do ngx-permissions
import { NgxPermissionsService, NgxPermissionsStore, NgxRolesService, NgxPermissionsModule } from 'ngx-permissions';
import { USE_PERMISSIONS_STORE, NgxPermissionsConfigurationService, USE_CONFIGURATION_STORE } from 'ngx-permissions';
import { authInterceptor } from '@core/interceptors/Auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideToastr(),
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor])),

    // ✅ Provedores do ngx-permissions
    importProvidersFrom(NgxPermissionsModule.forRoot()),
    NgxPermissionsService,
    NgxPermissionsStore,
    NgxRolesService,
    NgxPermissionsConfigurationService,
    { provide: USE_PERMISSIONS_STORE, useValue: true },
    { provide: USE_CONFIGURATION_STORE, useValue: true } // ✅ ESSENCIAL PARA EVITAR O ERRO
  ]
};