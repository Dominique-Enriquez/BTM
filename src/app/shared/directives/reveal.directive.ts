import {
  afterNextRender,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  Input,
  NgZone,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Directive({ selector: '[appReveal]', standalone: true })
export class RevealDirective {
  @Input() revealDelay = 0;
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);
  constructor() {
    afterNextRender(() => {
      if (
        typeof window === 'undefined' ||
        !window.matchMedia ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      )
        return;
      this.zone.runOutsideAngular(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(
          () =>
            gsap.from(this.el.nativeElement, {
              y: 36,
              opacity: 0,
              duration: 0.8,
              delay: this.revealDelay,
              ease: 'power3.out',
              scrollTrigger: { trigger: this.el.nativeElement, start: 'top 88%', once: true },
            }),
          this.el.nativeElement,
        );
        this.destroyRef.onDestroy(() => ctx.revert());
        requestAnimationFrame(() => ScrollTrigger.refresh());
      });
    });
  }
}
