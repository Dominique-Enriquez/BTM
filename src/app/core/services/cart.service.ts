import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CartItem, Product } from '../models/shop.models';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly key = 'btm-demo-cart';
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly state = signal<CartItem[]>(this.load());
  readonly items = this.state.asReadonly();
  readonly itemCount = computed(() => this.state().reduce((sum, item) => sum + item.quantity, 0));
  readonly subtotal = computed(() =>
    this.state().reduce((sum, item) => sum + this.price(item.product) * item.quantity, 0),
  );

  add(product: Product, quantity = 1): boolean {
    if (quantity < 1 || product.stock < 1) return false;
    const items = [...this.state()];
    const existing = items.find((item) => item.product.id === product.id);
    const next = Math.min(product.stock, (existing?.quantity ?? 0) + quantity);
    if (existing) existing.quantity = next;
    else items.push({ product, quantity: Math.min(quantity, product.stock) });
    this.save(items);
    return true;
  }
  update(id: string, quantity: number): void {
    const items = this.state().map((item) =>
      item.product.id === id
        ? { ...item, quantity: Math.max(1, Math.min(quantity, item.product.stock)) }
        : item,
    );
    this.save(items);
  }
  remove(id: string): void {
    this.save(this.state().filter((item) => item.product.id !== id));
  }
  clear(): void {
    this.save([]);
  }
  price(product: Product): number {
    return product.salePrice ?? product.price;
  }
  private save(items: CartItem[]): void {
    this.state.set(items);
    if (this.browser) localStorage.setItem(this.key, JSON.stringify(items));
  }
  private load(): CartItem[] {
    if (!this.browser) return [];
    try {
      return JSON.parse(localStorage.getItem(this.key) ?? '[]') as CartItem[];
    } catch {
      return [];
    }
  }
}
