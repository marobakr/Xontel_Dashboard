import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { LanguageService } from '../../core/service/language.service';
import { ButtonComponent } from '../../shared/button/button.component';
import { LayoutComponent } from '../../shared/layout/layout.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    LayoutComponent,
    ButtonModule,
    TranslateModule,
    ButtonComponent,
    AsyncPipe,
    RouterLink,
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent {
  languageService$ = inject(LanguageService).getLanguage();
}
