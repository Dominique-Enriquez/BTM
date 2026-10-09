import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
@Component({
  selector: 'app-quantity-selector',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="qty" aria-label="Quantity selector">
    <button
      type="button"
      (click)="change(value() - 1)"
      [disabled]="value() <= 1"
      aria-label="Decrease quantity"
    >
      −
    </button>
    <span aria-live="polite">{{ value() }}</span>
    <button
      type="button"
      (click)="change(value() + 1)"
      [disabled]="value() >= max()"
      aria-label="Increase quantity"
    >
      +
    </button>
  </div>`,
  styles: `
    .qty {
      display: inline-flex;
      align-items: center;
      border: 1px solid #dfd8d1;
      border-radius: 99px;
      overflow: hidden;
      background: #fff;
    }
    .qty button {
      width: 34px;
      height: 34px;
      border: 0;
      background: transparent;
      font-size: 1.15rem;
      cursor: pointer;
    }
    .qty button:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
    .qty span {
      min-width: 26px;
      text-align: center;
      font-weight: 700;
      font-size: 0.875rem;
    }
  `,
})
export class QuantitySelector {
  value = input.required<number>();
  max = input(99);
  valueChange = output<number>();
  change(value: number): void {
    this.valueChange.emit(Math.max(1, Math.min(value, this.max())));
  }
}
