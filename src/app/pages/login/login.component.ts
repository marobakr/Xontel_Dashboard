import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { ILogin } from '../../core/interfaces/http';
import { AuthService } from '../../core/service/auth.service';
import { LanguageService } from '../../core/service/language.service';
import { NotifecationsService } from '../../core/service/notifecations.service';
import { ButtonComponent } from '../../shared/button/button.component';
import { LayoutComponent } from '../../shared/layout/layout.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    MessagesModule,
    ButtonModule,
    LayoutComponent,
    ButtonComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  _authService = inject(AuthService);

  _notificationService = inject(NotifecationsService);

  currentLang$ = inject(LanguageService);

  _router = inject(Router);

  email!: FormControl;

  password!: FormControl;

  loginForm!: FormGroup;

  constructor() {
    this.initFormControls();
    this.initFormGroupe();
  }

  initFormControls(): void {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]);
  }

  initFormGroupe(): void {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  submit() {
    if (this.loginForm.valid) {
      this.signIn(this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
      Object.keys(this.loginForm.controls).forEach((control) =>
        this.loginForm.controls[control].markAsDirty()
      );
    }
  }

  signIn(data: ILogin): void {
    this._authService.login(data).subscribe({
      next: (response) => {
        if (response._id) {
          this._notificationService.showSuccess('success', 'success login');
          localStorage.setItem('token', response._id);
        }
        let lang = 'ar';
        this.currentLang$.getLanguage().subscribe((next) => {
          lang = next;
        });
        console.log(lang);
        this._router.navigate(['/', lang, 'home']);
      },
      error: (err) => {
        this._notificationService.showError('Error', err.error.error);
      },
    });
  }
}
