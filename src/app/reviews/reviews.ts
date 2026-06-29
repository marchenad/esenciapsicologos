import { Component, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-reviews',
  imports: [],
  templateUrl: './reviews.html',
  styleUrl: './reviews.css',
})
export class Reviews implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
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

  toggleReview(event: MouseEvent) {
    const btn = event.currentTarget as HTMLElement;
    const card = btn.closest('.review-card')!;
    const text = card.querySelector('.review-text')!;
    const isOpen = text.classList.contains('review-open');
    text.classList.toggle('review-open', !isOpen);
    btn.classList.toggle('open', !isOpen);
    btn.setAttribute('aria-expanded', String(!isOpen));
    btn.innerHTML = !isOpen
      ? 'Ver menos <span class="expand-arrow">&#9662;</span>'
      : 'Ver más <span class="expand-arrow">&#9662;</span>';
  }
}
