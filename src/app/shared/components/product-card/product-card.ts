import { Component, input, output, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../../core/models/shop.models';
import { QuantitySelector } from '../quantity-selector/quantity-selector';
import { RevealDirective } from '../../directives/reveal.directive';
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe, QuantitySelector, RevealDirective],
  template: `<article class="product-card" appReveal>
    <div class="photo atlas" [style.background-position]="product().imagePosition">
      <span [class.out]="product().stock === 0">{{
        product().stock ? 'In stock' : 'Sold out'
      }}</span>
      @if (product().salePrice) {
        <b class="sale">Sale</b>
      }
    </div>
    <div class="body">
      <small>{{ product().category }}</small>
      <h3>{{ product().name }}</h3>
      <p class="desc">{{ product().description }}</p>
      <div class="price">
        {{ product().salePrice ?? product().price | currency: 'PHP' : 'symbol-narrow' : '1.0-0' }}
        <span>/ {{ product().unit }}</span>
        @if (product().salePrice) {
          <del>{{ product().price | currency: 'PHP' : 'symbol-narrow' : '1.0-0' }}</del>
        }
      </div>
      <div class="actions">
        <app-quantity-selector
          [value]="quantity()"
          [max]="product().stock"
          (valueChange)="quantity.set($event)"
        />
        <button
          class="add"
          type="button"
          [disabled]="product().stock === 0"
          (click)="add.emit(quantity())"
        >
          Add to bag
        </button>
      </div>
      <button class="quick" type="button" (click)="quickView.emit()">Quick view →</button>
    </div>
  </article>`,
  styles: `
    .product-card {
      height: 100%;
      border-radius: 22px;
      background: #fff;
      overflow: hidden;
      box-shadow: 0 10px 35px #3111150c;
      transition:
        transform 0.3s,
        box-shadow 0.3s;
    }
    .product-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 18px 45px #31111518;
    }
    .photo {
      height: 230px;
      position: relative;
      background-size: 300% 200%;
      background-repeat: no-repeat;
    }
    .photo span,
    .sale {
      position: absolute;
      top: 13px;
      padding: 7px 10px;
      border-radius: 99px;
      background: #edf7ee;
      color: #3e8050;
      font-size: 0.7rem;
      font-weight: 800;
    }
    .photo span {
      left: 13px;
    }
    .photo span.out {
      background: #eee;
      color: #777;
    }
    .sale {
      right: 13px;
      background: #9e2633;
      color: #fff;
    }
    .body {
      padding: 20px;
    }
    .body small {
      color: #9e2633;
      font-weight: 750;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .body h3 {
      font-size: 1.35rem;
      margin: 7px 0;
    }
    .desc {
      height: 38px;
      overflow: hidden;
      color: #6c6364;
      font-size: 0.86rem;
      line-height: 1.45;
    }
    .price {
      font-weight: 800;
      margin: 16px 0;
      color: #651b24;
    }
    .price span,
    del {
      color: #857c7d;
      font-weight: 500;
      font-size: 0.74rem;
      margin-left: 5px;
    }
    .actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }
    .add {
      flex: 1;
      padding: 11px;
      border: 0;
      border-radius: 99px;
      background: #9e2633;
      color: #fff;
      font-weight: 750;
      cursor: pointer;
    }
    .add:disabled {
      background: #aaa;
    }
    .quick {
      display: block;
      margin: 13px auto 0;
      border: 0;
      background: none;
      color: #651b24;
      font-weight: 700;
      cursor: pointer;
    }
  `,
})
export class ProductCard {
  product = input.required<Product>();
  add = output<number>();
  quickView = output<void>();
  quantity = signal(1);
}
