import { Component, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-services',
  imports: [],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services implements AfterViewInit {
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

  showSvc(event: MouseEvent, panelId: string) {
    const btn = event.currentTarget as HTMLElement;
    document.querySelectorAll('.svc-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.svc-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const panel = document.getElementById(panelId);
    if (panel) {
      panel.classList.add('active');
      setTimeout(() => {
        const top = panel.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top, behavior: 'smooth' });
      }, 60);
    }
  }
}
