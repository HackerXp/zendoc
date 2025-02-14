import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '@core/interfaces/auth';
import { AuthService } from '@core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule,],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit, OnDestroy {
  unsubscribeSubject = new Subject();
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  errorMessage = signal<string | null>(null);
  formLogin!: FormGroup;
  credentials: Auth = {};
  constructor(
    private fb: FormBuilder,
  ) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dash']); // Redireciona se estiver logado
    }
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm = () => {
    this.formLogin = this.fb.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required],
    });
  };


  authenticate = () => {
    this.credentials = this.formLogin.value as Auth;
    this.authService.authenticate(this.credentials)
      .pipe(takeUntil(this.unsubscribeSubject)).subscribe({
        next: (cb) => {
          if (cb.codigo == 200) {
            this.router.navigate(['/dash']);
            localStorage.setItem('reload', 'reload');
          }
          // else
          //   this.toastr.error(cb.mensagem, 'Erro');

        }, // Redireciona após login
        error: () => {
          // this.toastr.error('Erro ao fazer a autênticação', 'Erro');
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribeSubject.next(null);
    this.unsubscribeSubject.complete();
  }
}
