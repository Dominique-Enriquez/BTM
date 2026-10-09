import { Injectable, signal } from '@angular/core';
export interface Toast {
  id: number;
  message: string;
  kind: 'success' | 'info' | 'error';
}
@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly toasts = signal<Toast[]>([]);
  show(message: string, kind: Toast['kind'] = 'success'): void {
    const id = Date.now();
    this.toasts.update((items) => [...items, { id, message, kind }]);
    setTimeout(() => this.dismiss(id), 3200);
  }
  dismiss(id: number): void {
    this.toasts.update((items) => items.filter((item) => item.id !== id));
  }
}
