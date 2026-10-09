import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../directives/reveal.directive';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  template: `<footer appReveal>
    <div>
      <a class="logo" routerLink="/">BTM</a>
      <h3>Better cuts.<br />Better meals.</h3>
      <p>A frontend demonstration of a premium Filipino meat shop.</p>
    </div>
    <div>
      <b>Explore</b><a routerLink="/">Shop</a><a routerLink="/cart">Cart</a
      ><a routerLink="/checkout">Checkout</a><a routerLink="/auth">Account</a>
    </div>
    <div>
      <b>Contact placeholder</b>
      <p>hello&#64;beatthatmeat.example</p>
      <p>+63 900 000 0000</p>
      <span class="social">Instagram · Facebook</span>
    </div>
    <small>© 2026 Beat That Meat! Demo. Sample products, prices and availability only.</small>
  </footer>`,
  styles: `
    footer {
      display: grid;
      grid-template-columns: 2fr 1fr 1.2fr;
      gap: 50px;
      padding: 70px max(24px, 7vw) 30px;
      background: #25171a;
      color: #f7eee7;
    }
    footer h3 {
      font-size: 2.2rem;
      margin: 18px 0 10px;
    }
    .logo {
      display: grid;
      place-items: center;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #9e2633;
      color: #fff;
      text-decoration: none;
      font-weight: 800;
    }
    footer > div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 11px;
    }
    footer a {
      color: #f7eee7;
      text-decoration: none;
    }
    footer p,
    .social {
      color: #b9aaad;
      font-size: 0.9rem;
      line-height: 1.6;
      margin: 0;
    }
    footer small {
      grid-column: 1/-1;
      border-top: 1px solid #ffffff1a;
      padding-top: 24px;
      color: #92868a;
    }
    @media (max-width: 700px) {
      footer {
        grid-template-columns: 1fr;
        gap: 32px;
      }
      footer small {
        grid-column: auto;
      }
    }
  `,
})
export class Footer {}
