import { Component, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-formation',
  imports: [],
  templateUrl: './formation.html',
  styleUrl: './formation.css',
})
export class Formation implements AfterViewInit {
  block1Expanded = false;
  block2Expanded = false;

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

  toggleFormation(block: number) {
    if (block === 1) {
      this.block1Expanded = !this.block1Expanded;
    } else {
      this.block2Expanded = !this.block2Expanded;
    }
  }
}
