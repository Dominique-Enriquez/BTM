import { afterNextRender, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { gsap } from 'gsap';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastService);
  readonly mode = signal<'login' | 'register'>('login');
  readonly show = signal(false);
  readonly submitted = signal(false);
  readonly login = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [true],
  });
  readonly register = this.fb.nonNullable.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', [Validators.required, Validators.pattern(/^(\+63|0)9\d{9}$/)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirm: ['', Validators.required],
    terms: [false, Validators.requiredTrue],
  });
  constructor() {
    afterNextRender(() => {
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches)
        gsap.from('.auth-panel>*', {
          y: 28,
          opacity: 0,
          duration: 0.75,
          stagger: 0.09,
          ease: 'power3.out',
        });
    });
  }
  toggle() {
    this.mode.update((v) => (v === 'login' ? 'register' : 'login'));
    this.submitted.set(false);
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches)
      gsap.fromTo('.form-wrap', { opacity: 0, x: 18 }, { opacity: 1, x: 0, duration: 0.45 });
  }
  submitLogin() {
    this.submitted.set(true);
    if (this.login.invalid) return;
    const v = this.login.getRawValue();
    this.auth.signIn(v.email, v.remember);
    this.toast.show('Welcome back — demo sign-in successful');
    this.router.navigateByUrl('/');
  }
  submitRegister() {
    this.submitted.set(true);
    const v = this.register.getRawValue();
    if (this.register.invalid || v.password !== v.confirm) return;
    this.auth.register(v.fullName, v.email);
    this.toast.show('Demo account created successfully');
    this.router.navigateByUrl('/');
  }
  forgot() {
    this.toast.show('Demo mode: password recovery needs a secure authentication backend.', 'info');
  }
}
