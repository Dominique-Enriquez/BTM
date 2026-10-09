import { afterNextRender, Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { CartService } from '../../core/services/cart.service';
import { QuantitySelector } from '../../shared/components/quantity-selector/quantity-selector';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, QuantitySelector],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  readonly cart = inject(CartService);
  readonly delivery = 80;
  constructor() {
    afterNextRender(() => {
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches)
        gsap.from('.cart-card,.summary', {
          y: 28,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
        });
    });
  }
  remove(id: string, event: Event) {
    const el = (event.currentTarget as HTMLElement).closest('.cart-card');
    if (el && !matchMedia('(prefers-reduced-motion: reduce)').matches)
      gsap.to(el, { opacity: 0, x: -25, duration: 0.25, onComplete: () => this.cart.remove(id) });
    else this.cart.remove(id);
  }
  clear() {
    if (confirm('Clear every item from your cart?')) this.cart.clear();
  }
}
