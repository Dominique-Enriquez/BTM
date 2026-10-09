# Beat That Meat! (BTM)

A polished, responsive Angular e-commerce frontend for a Filipino online meat and frozen-goods shop. The application combines a premium landing page with a searchable 34-product catalog, persistent cart, demo account flow, and validated checkout.

> This is a frontend demonstration. Authentication, product availability, prices, orders, delivery estimates, and payments are simulated. Do not use the localStorage demo authentication or order flow in production.

## Features

- Four lazy-loaded routes: `/`, `/auth`, `/cart`, and `/checkout`
- 34 strongly typed sample products across six categories
- Product search, category filters, availability filter, sorting, and reset
- Responsive cards, quantity limits, quick-view dialog, and animated toast feedback
- Signal-based cart with live navbar count, totals, and localStorage persistence
- Login/register toggle with reactive validation and clearly labeled local demo sessions
- Philippine-friendly checkout form, standard/express delivery, and four demo payment choices
- Duplicate-submit protection, local demo order record, and confirmation dialog
- GSAP and ScrollTrigger reveals with reduced-motion support
- Responsive mobile navigation and layouts
- Local AI-generated photography assets with no hot-linked product images
- Vercel SPA rewrite configuration for direct route refreshes

## Project structure

```text
src/
├── app/
│   ├── core/
│   │   ├── models/shop.models.ts
│   │   └── services/{auth,cart,toast}.service.ts
│   ├── data/products.ts
│   ├── features/
│   │   ├── auth/
│   │   ├── cart/
│   │   ├── checkout/
│   │   └── home/
│   ├── shared/
│   │   ├── components/{footer,navbar,product-card,quantity-selector,quick-view,toast-stack}/
│   │   └── directives/reveal.directive.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── index.html
├── main.ts
└── styles.scss
public/
└── images/{btm-hero,product-atlas}.jpg
vercel.json
```

## Local development

Requirements: Node.js 20.19+ (or a version supported by the Angular version in `package.json`) and npm.

```bash
npm install
npm start
```

Open `http://localhost:4200`.

## Tests and production build

```bash
npm test
npm run build
```

The verified Angular build output is:

```text
dist/beat-that-meat/browser
```

## Push to GitHub

Create an empty repository on GitHub, then run from this directory:

```bash
git init
git add .
git commit -m "Build Beat That Meat ecommerce frontend"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

Do not commit secrets. This project does not require environment variables in demo mode.

## Deploy to Vercel

1. Push the project to GitHub.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Vercel should detect Angular. The committed `vercel.json` sets:
   - Build command: `npm run build`
   - Output directory: `dist/beat-that-meat/browser`
4. Deploy. The SPA rewrite makes `/cart`, `/checkout`, and `/auth` work when opened or refreshed directly.
5. For later updates, commit and push to `main`; Vercel automatically creates a new deployment. You can also use **Redeploy** from the Vercel deployment menu.

## Production work still required

- Replace localStorage authentication with a secure server-backed provider such as Supabase or Firebase.
- Source live catalog, stock, and pricing from a protected backend.
- Integrate a PCI-compliant payment provider; never collect card numbers, PINs, or OTPs in this frontend.
- Validate and create orders server-side, add inventory reservation, fulfillment, and notification workflows.
- Replace placeholder contact details and review generated photography for final commercial usage requirements.
- Add analytics, monitoring, broader browser/device testing, and a production privacy/terms review.

## Generated image assets

The local assets were created with the built-in image generation workflow for this project:

- `public/images/btm-hero.jpg`: premium mixed meat and seafood hero, dark editorial butcher-counter composition with copy space.
- `public/images/product-atlas.jpg`: six-tile beef, pork, chicken, frozen goods, seafood, and processed-meat catalog atlas.

Both prompts required photorealistic commercial food photography with no text, logos, people, gore, or watermarks.
