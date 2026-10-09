import { afterNextRender, Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { CartService } from '../../core/services/cart.service';
import { DeliveryMethod, DemoOrder, PaymentMethod } from '../../core/models/shop.models';
import { ToastService } from '../../core/services/toast.service';
import { RevealDirective } from '../../shared/directives/reveal.directive';
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe, RouterLink, RevealDirective],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  private fb = inject(FormBuilder);
  readonly cart = inject(CartService);
  private toast = inject(ToastService);
  readonly delivery = signal<DeliveryMethod>('standard');
  readonly payment = signal<PaymentMethod | null>(null);
  readonly submitted = signal(false);
  readonly processing = signal(false);
  readonly order = signal<DemoOrder | null>(null);
  readonly fee = computed(() => (this.delivery() === 'express' ? 150 : 80));
  readonly total = computed(() => this.cart.subtotal() + this.fee());
  readonly form = this.fb.nonNullable.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', [Validators.required, Validators.pattern(/^(\+63|0)9\d{9}$/)]],
    street: ['', Validators.required],
    barangay: ['', Validators.required],
    city: ['', Validators.required],
    province: ['', Validators.required],
    zip: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
    instructions: [''],
  });
  constructor() {
    afterNextRender(() => {
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches)
        gsap.from('.checkout-main,.checkout-summary', {
          y: 28,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
        });
    });
  }
  choosePayment(method: PaymentMethod) {
    this.payment.set(method);
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches)
      gsap.fromTo('.payment-note', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3 });
  }
  placeOrder() {
    this.submitted.set(true);
    if (this.processing() || this.form.invalid || !this.payment() || !this.cart.items().length) {
      this.form.markAllAsTouched();
      this.toast.show(
        !this.cart.items().length
          ? 'Your cart is empty.'
          : 'Please complete the required checkout details.',
        'error',
      );
      return;
    }
    this.processing.set(true);
    setTimeout(() => {
      const method = this.payment()!;
      const placed: DemoOrder = {
        reference: `BTM-DEMO-${Date.now().toString(36).toUpperCase()}`,
        customer: this.form.getRawValue(),
        items: this.cart.items(),
        delivery: this.delivery(),
        payment: method,
        total: this.total(),
        timestamp: new Date().toISOString(),
        status: 'Demo order recorded',
      };
      try {
        const existing = JSON.parse(localStorage.getItem('btm-demo-orders') ?? '[]');
        localStorage.setItem('btm-demo-orders', JSON.stringify([placed, ...existing].slice(0, 10)));
      } catch {}
      this.order.set(placed);
      this.cart.clear();
      this.processing.set(false);
      setTimeout(() =>
        gsap.from('.success-mark', {
          scale: 0,
          rotation: -25,
          duration: 0.65,
          ease: 'back.out(1.8)',
        }),
      );
    }, 700);
  }
}
