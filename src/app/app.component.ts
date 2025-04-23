import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { ToastModule } from 'primeng/toast';
import { LanguageService } from './core/service/language.service';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterOutlet, NgxSpinnerComponent, TranslateModule, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  _languageService = inject(LanguageService);

  title = 'Dashboard-task';
}
