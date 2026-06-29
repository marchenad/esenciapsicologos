import { Component, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-approach',
  imports: [],
  templateUrl: './approach.html',
  styleUrl: './approach.css',
})
export class Approach implements AfterViewInit {
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
}
