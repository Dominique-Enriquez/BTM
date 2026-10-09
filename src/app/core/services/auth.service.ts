import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface DemoUser {
  name: string;
  email: string;
}
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly userState = signal<DemoUser | null>(this.load());
  readonly user = this.userState.asReadonly();
  readonly signedIn = computed(() => !!this.userState());
  signIn(email: string, remember: boolean): void {
    this.set({ name: email.split('@')[0], email }, remember);
  }
  register(name: string, email: string): void {
    this.set({ name, email }, true);
  }
  signOut(): void {
    this.userState.set(null);
    if (this.browser) localStorage.removeItem('btm-demo-user');
  }
  private set(user: DemoUser, persist: boolean): void {
    this.userState.set(user);
    if (this.browser)
      persist
        ? localStorage.setItem('btm-demo-user', JSON.stringify(user))
        : localStorage.removeItem('btm-demo-user');
  }
  private load(): DemoUser | null {
    if (!this.browser) return null;
    try {
      return JSON.parse(localStorage.getItem('btm-demo-user') ?? 'null');
    } catch {
      return null;
    }
  }
}
