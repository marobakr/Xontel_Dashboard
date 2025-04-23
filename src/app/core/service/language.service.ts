import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private selectedLanguage$ = new BehaviorSubject<string>('en');
  private isArabic$ = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private title: Title,

    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const routeLang =
          this.route.snapshot.firstChild?.paramMap.get('lang') || 'en';

        this.selectedLanguage$.next(routeLang);
        this.isArabic$.next(routeLang === 'ar');

        // ✅ Check if it's in browser before using `document`
        if (isPlatformBrowser(this.platformId)) {
          document.documentElement.lang = routeLang;
          document.documentElement.dir = routeLang === 'ar' ? 'rtl' : 'ltr';
        }

        this.translate.use(routeLang);

        // ✅ Set dynamic title Routes  using data.titleKey
        let currentRoute = this.route.root;
        while (currentRoute.firstChild) {
          currentRoute = currentRoute.firstChild;
        }

        const titleKey = currentRoute.snapshot.data['titleKey'];
        if (titleKey) {
          this.translate.get(titleKey).subscribe((translatedTitle) => {
            const finalTitle = translatedTitle.toUpperCase(); // 🔁 uppercase logic
            this.title.setTitle(finalTitle);
          });
        }
      });
  }

  getLanguage() {
    return this.selectedLanguage$.asObservable();
  }

  getIsArabic() {
    return this.isArabic$.asObservable();
  }

  changeLanguage(lang: string, currentUrl: string) {
    const segments = currentUrl.split('/');
    segments[1] = lang;
    this.router.navigate([segments.join('/')]);
    this.translate.use(lang);
  }
}
