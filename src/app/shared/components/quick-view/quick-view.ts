import { Component, input, output, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../../core/models/shop.models';
import { QuantitySelector } from '../quantity-selector/quantity-selector';
@Component({
  selector: 'app-quick-view',
  standalone: true,
  imports: [CurrencyPipe, QuantitySelector],
  template: `<div class="backdrop" (click)="closed.emit()">
    <section
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-title"
      (click)="$event.stopPropagation()"
    >
      <button class="close" type="button" (click)="closed.emit()" aria-label="Close quick view">
        ×
      </button>
      <div class="image atlas" [style.background-position]="product().imagePosition"></div>
      <div class="copy">
        <small>{{ product().category }}</small>
        <h2 id="quick-title">{{ product().name }}</h2>
        <p>{{ product().description }}</p>
        <strong
          >{{
            product().salePrice ?? product().price | currency: 'PHP' : 'symbol-narrow' : '1.0-0'
          }}
          <span>/ {{ product().unit }}</span></strong
        >
        <p>{{ product().stock }} available</p>
        <div class="row">
          <app-quantity-selector
            [value]="quantity()"
            [max]="product().stock"
            (valueChange)="quantity.set($event)"
          /><button
            class="btn btn-primary"
            [disabled]="!product().stock"
            (click)="added.emit(quantity())"
          >
            Add to bag
          </button>
        </div>
      </div>
    </section>
  </div>`,
  styles: `
    .backdrop {
      position: fixed;
      inset: 0;
      z-index: 500;
      display: grid;
      place-items: center;
      padding: 20px;
      background: #1c090db8;
      backdrop-filter: blur(6px);
      animation: fade 0.2s;
    }
    .backdrop section {
      position: relative;
      display: grid;
      grid-template-columns: 1fr 1fr;
      width: min(820px, 100%);
      max-height: 90vh;
      overflow: auto;
      border-radius: 26px;
      background: #faf7f2;
      box-shadow: 0 30px 80px #0006;
    }
    .image {
      min-height: 430px;
      background-size: 300% 200%;
      background-repeat: no-repeat;
    }
    .copy {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 45px;
    }
    .copy small {
      color: #9e2633;
      text-transform: uppercase;
      font-weight: 800;
    }
    .copy h2 {
      font-size: 2.5rem;
      margin: 10px 0;
    }
    .copy p {
      color: #6e6465;
      line-height: 1.7;
    }
    .copy strong {
      font-size: 1.5rem;
      color: #651b24;
    }
    .copy strong span {
      font-size: 0.8rem;
      color: #777;
    }
    .row {
      display: flex;
      gap: 12px;
      align-items: center;
      margin-top: 15px;
    }
    .close {
      position: absolute;
      right: 15px;
      top: 15px;
      z-index: 2;
      width: 38px;
      height: 38px;
      border: 0;
      border-radius: 50%;
      background: #fff;
      font-size: 1.5rem;
      cursor: pointer;
    }
    @media (max-width: 650px) {
      .backdrop section {
        grid-template-columns: 1fr;
      }
      .image {
        min-height: 240px;
      }
      .copy {
        padding: 28px;
      }
      .copy h2 {
        font-size: 2rem;
      }
    }
    @keyframes fade {
      from {
        opacity: 0;
      }
    }
  `,
})
export class QuickView {
  product = input.required<Product>();
  closed = output<void>();
  added = output<number>();
  quantity = signal(1);
}
