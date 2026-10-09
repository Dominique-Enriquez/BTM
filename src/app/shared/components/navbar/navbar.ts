import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  template: `<header class="nav" [class.scrolled]="scrolled()">
    <a class="brand" routerLink="/" (click)="close()"><span>BTM</span><b>Beat That Meat!</b></a>
    <button
      class="menu"
      type="button"
      (click)="open.update((v) => !v)"
      [attr.aria-expanded]="open()"
      aria-label="Toggle navigation"
    >
      ☰
    </button>
    <nav [class.open]="open()" aria-label="Main navigation">
      <a routerLink="/" fragment="top" (click)="close()">Home</a
      ><a routerLink="/" fragment="products" (click)="close()">Products</a>
      <a routerLink="/" fragment="categories" (click)="close()">Categories</a
      ><a routerLink="/" fragment="about" (click)="close()">About</a>
      <a
        class="account"
        routerLink="/auth"
        (click)="close()"
        [attr.aria-label]="auth.signedIn() ? 'Account' : 'Login'"
        >{{ auth.signedIn() ? '● ' + auth.user()?.name : 'Sign in' }}</a
      >
      <a class="cart" routerLink="/cart" (click)="close()" aria-label="Shopping cart"
        >Bag <span>{{ cart.itemCount() }}</span></a
      >
    </nav>
  </header>`,
  styles: `
    .nav {
      position: fixed;
      inset: 0 0 auto;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px max(24px, 5vw);
      color: #fff;
      transition: 0.3s;
      background: linear-gradient(#24070bb8, transparent);
    }
    .nav.scrolled {
      padding-block: 11px;
      background: #fffdf9ed;
      color: #242424;
      backdrop-filter: blur(14px);
      box-shadow: 0 5px 25px #35101612;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 11px;
      color: inherit;
      text-decoration: none;
    }
    .brand span {
      display: grid;
      place-items: center;
      width: 43px;
      height: 43px;
      border-radius: 50%;
      background: #9e2633;
      color: #fff;
      font: 700 14px Inter;
    }
    .brand b {
      font:
        700 1.18rem 'Playfair Display',
        serif;
    }
    .nav nav {
      display: flex;
      align-items: center;
      gap: 24px;
    }
    .nav nav a {
      color: inherit;
      text-decoration: none;
      font-size: 0.91rem;
    }
    .nav nav a:hover {
      color: #d75b69;
    }
    .cart {
      display: flex;
      align-items: center;
      gap: 7px;
      background: #9e2633;
      color: #fff !important;
      padding: 10px 16px;
      border-radius: 99px;
    }
    .cart span {
      display: grid;
      place-items: center;
      min-width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #fff;
      color: #651b24;
      font-size: 0.75rem;
      font-weight: 800;
    }
    .menu {
      display: none;
      border: 0;
      background: none;
      color: inherit;
      font-size: 1.4rem;
    }
    @media (max-width: 800px) {
      .nav {
        background: #651b24;
        padding: 11px 18px;
      }
      .nav.scrolled {
        color: #fff;
        background: #651b24;
      }
      .menu {
        display: block;
      }
      .nav nav {
        display: none;
        position: absolute;
        top: 64px;
        left: 12px;
        right: 12px;
        flex-direction: column;
        align-items: stretch;
        padding: 20px;
        border-radius: 18px;
        background: #fff;
        color: #242424;
        box-shadow: 0 20px 50px #0003;
      }
      .nav nav.open {
        display: flex;
      }
      .nav nav a {
        padding: 7px;
      }
      .brand b {
        font-size: 1rem;
      }
    }
  `,
})
export class Navbar {
  readonly cart = inject(CartService);
  readonly auth = inject(AuthService);
  readonly open = signal(false);
  readonly scrolled = signal(false);
  @HostListener('window:scroll') onScroll() {
    this.scrolled.set(scrollY > 30);
  }
  close() {
    this.open.set(false);
  }
}
