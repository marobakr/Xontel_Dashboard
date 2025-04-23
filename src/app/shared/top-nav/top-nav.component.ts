import { AsyncPipe, NgClass } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LanguageService } from '../../core/service/language.service';
import { ExpandMoreIconComponent } from '../icons/expand-more/expand-more.component';
import { NotificationIconComponent } from '../icons/notification-icon/notification-icon.component';
import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [
    FormsModule,
    NotificationIconComponent,
    ExpandMoreIconComponent,
    TranslateModule,
    AsyncPipe,
    NgClass,
  ],
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.css',
})
export class TopNavComponent implements OnDestroy {
  showMenu!: boolean;
  showMenuLogout!: boolean;
  currentLang: string = '';

  private destroy$ = new Subject<void>();
  private _router = inject(Router);
  private _languageService = inject(LanguageService);
  private sidebarService = inject(SidebarService);

  currentLang$ = this._languageService.getLanguage();

  constructor() {
    // Subscribe in the constructor or ngOnInit
    this.currentLang$.pipe(takeUntil(this.destroy$)).subscribe((lang) => {
      this.currentLang = lang;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidebar() {
    this.sidebarService.toggle();
  }

  changeLang(lang: string): void {
    const currentUrl = this._router.url;
    this._languageService.changeLanguage(lang, currentUrl);
    this.toggleMenu();
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  toggleMenuLogout(): void {
    this.showMenuLogout = !this.showMenuLogout;
  }

  logout(): void {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }
}
