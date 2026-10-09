import { afterNextRender, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { gsap } from 'gsap';
import { CATEGORIES, PRODUCTS } from '../../data/products';
import { Category, Product } from '../../core/models/shop.models';
import { CartService } from '../../core/services/cart.service';
import { ToastService } from '../../core/services/toast.service';
import { ProductCard } from '../../shared/components/product-card/product-card';
import { QuickView } from '../../shared/components/quick-view/quick-view';
import { RevealDirective } from '../../shared/directives/reveal.directive';
type Sort = 'featured' | 'low' | 'high' | 'az';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, ProductCard, QuickView, RevealDirective],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  readonly products = PRODUCTS;
  readonly categories = CATEGORIES;
  private cart = inject(CartService);
  private toast = inject(ToastService);
  readonly search = signal('');
  readonly category = signal<Category | 'All'>('All');
  readonly sort = signal<Sort>('featured');
  readonly availableOnly = signal(false);
  readonly quick = signal<Product | null>(null);
  readonly limit = signal(12);
  readonly filtered = computed(() => {
    const term = this.search().trim().toLowerCase();
    let items = this.products.filter(
      (p) =>
        (!term || p.name.toLowerCase().includes(term)) &&
        (this.category() === 'All' || p.category === this.category()) &&
        (!this.availableOnly() || p.stock > 0),
    );
    return [...items].sort((a, b) =>
      this.sort() === 'low'
        ? (a.salePrice ?? a.price) - (b.salePrice ?? b.price)
        : this.sort() === 'high'
          ? (b.salePrice ?? b.price) - (a.salePrice ?? a.price)
          : this.sort() === 'az'
            ? a.name.localeCompare(b.name)
            : Number(b.featured) - Number(a.featured),
    );
  });
  readonly visible = computed(() => this.filtered().slice(0, this.limit()));
  constructor() {
    afterNextRender(() => {
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.from('.hero-copy > *', {
          y: 35,
          opacity: 0,
          duration: 0.85,
          stagger: 0.11,
          ease: 'power3.out',
        });
        gsap.from('.hero-proof', {
          x: 40,
          opacity: 0,
          duration: 1,
          delay: 0.45,
          ease: 'power3.out',
        });
      }
    });
  }
  selectCategory(category: Category) {
    this.category.set(category);
    this.limit.set(12);
    setTimeout(() => document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' }));
  }
  add(product: Product, quantity: number) {
    if (this.cart.add(product, quantity))
      this.toast.show(`${quantity} × ${product.name} added to your bag`);
  }
  addQuick(quantity: number) {
    const product = this.quick();
    if (product) {
      this.add(product, quantity);
      this.quick.set(null);
    }
  }
  reset() {
    this.search.set('');
    this.category.set('All');
    this.sort.set('featured');
    this.availableOnly.set(false);
    this.limit.set(12);
  }
}
