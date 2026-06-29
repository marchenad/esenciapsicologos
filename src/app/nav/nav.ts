import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav implements OnInit {
  navCompact = false;
  mobileOpen = false;
  mobileSubOpen = false;

  ngOnInit() {}

  @HostListener('window:scroll')
  onScroll() {
    this.navCompact = window.scrollY > 60;
  }

  toggleMenu() {
    this.mobileOpen = !this.mobileOpen;
    document.body.style.overflow = this.mobileOpen ? 'hidden' : '';
  }

  toggleMobileSub() {
    this.mobileSubOpen = !this.mobileSubOpen;
  }

  activateSvc(panelId: string) {
    const tabs = document.querySelectorAll('.svc-tab');
    const panels = document.querySelectorAll('.svc-panel');
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    const idx = parseInt(panelId.replace('svc', '')) - 1;
    if (tabs[idx]) tabs[idx].classList.add('active');
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
