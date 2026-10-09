import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    title: 'Beat That Meat! | Premium Meat Shop',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'auth',
    title: 'Sign in | Beat That Meat!',
    loadComponent: () => import('./features/auth/auth').then((m) => m.Auth),
  },
  {
    path: 'cart',
    title: 'Your Cart | Beat That Meat!',
    loadComponent: () => import('./features/cart/cart').then((m) => m.Cart),
  },
  {
    path: 'checkout',
    title: 'Checkout | Beat That Meat!',
    loadComponent: () => import('./features/checkout/checkout').then((m) => m.Checkout),
  },
  { path: '**', redirectTo: '' },
];
