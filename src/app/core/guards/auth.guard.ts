import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { LanguageService } from '../service/language.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const auth = inject(AuthService);
  let currentLang = 'ar';

  inject(LanguageService)
    .getLanguage()
    .subscribe((next) => (currentLang = next));

  if (auth.authorized()) {
    return true;
  } else {
    return router.createUrlTree(['/', currentLang, 'login']);
  }
};
