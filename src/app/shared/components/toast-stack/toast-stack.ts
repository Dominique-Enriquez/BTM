import { Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';
@Component({
  selector: 'app-toast-stack',
  standalone: true,
  template: `<div class="stack" aria-live="polite">
    @for (toast of service.toasts(); track toast.id) {
      <button class="toast" [class]="toast.kind" (click)="service.dismiss(toast.id)">
        <span>{{ toast.kind === 'success' ? '✓' : toast.kind === 'error' ? '!' : 'i' }}</span
        >{{ toast.message }}
      </button>
    }
  </div>`,
  styles: `
    .stack {
      position: fixed;
      right: 20px;
      bottom: 20px;
      z-index: 1000;
      display: grid;
      gap: 10px;
    }
    .toast {
      display: flex;
      gap: 10px;
      align-items: center;
      max-width: min(360px, calc(100vw - 40px));
      border: 0;
      border-radius: 14px;
      padding: 14px 18px;
      color: #fff;
      background: #242424;
      box-shadow: 0 16px 40px #0004;
      cursor: pointer;
      animation: toast-in 0.35s ease both;
    }
    .toast span {
      display: grid;
      place-items: center;
      width: 23px;
      height: 23px;
      border-radius: 50%;
      background: #ffffff24;
    }
    .toast.success {
      background: #3e8050;
    }
    .toast.error {
      background: #9e2633;
    }
    @keyframes toast-in {
      from {
        opacity: 0;
        transform: translateY(18px);
      }
    }
  `,
})
export class ToastStack {
  readonly service = inject(ToastService);
}
