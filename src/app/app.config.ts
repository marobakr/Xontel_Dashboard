import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { routes } from './app.routes';
import { provideTranslation } from './core/i18n/translat-loader.config';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    MessageService,
    importProvidersFrom(TranslateModule.forRoot(provideTranslation())),
    provideHttpClient(withFetch(), withInterceptors([loadingInterceptor])),
  ],
};
