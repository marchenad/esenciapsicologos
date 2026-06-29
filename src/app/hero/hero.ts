import { Component, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.initReveal();
    this.initRipple();
  }

  private initReveal() {
    const reveals = this.el.nativeElement.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => (e.target as HTMLElement).classList.add('visible'), i * 80);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach((el: Element) => observer.observe(el));
  }

  private initRipple() {
    const btns = this.el.nativeElement.querySelectorAll('.btn-primary, .btn-ghost');
    btns.forEach((btn: HTMLElement) => {
      btn.addEventListener('click', (e: MouseEvent) => {
        const ripple = document.createElement('span');
        ripple.classList.add('btn-ripple-effect');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.cssText = [
          'width:' + size + 'px',
          'height:' + size + 'px',
          'left:' + (e.clientX - rect.left - size / 2) + 'px',
          'top:' + (e.clientY - rect.top - size / 2) + 'px'
        ].join(';');
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 700);
      });
    });
  }
}
