import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements AfterViewInit {
  formData = {
    nombre: '',
    email: '',
    motivo: '',
    mensaje: ''
  };

  sending = false;
  submitLabel = 'Enviar consulta';
  successMsg = '';
  errorMsg = '';

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

  sendForm(event: Event) {
    event.preventDefault();
    this.sending = true;
    this.submitLabel = 'Enviando...';
    this.successMsg = '';
    this.errorMsg = '';

    emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        nombre: this.formData.nombre,
        email: this.formData.email,
        motivo: this.formData.motivo,
        mensaje: this.formData.mensaje,
      },
      'YOUR_PUBLIC_KEY'
    ).then(() => {
      this.sending = false;
      this.submitLabel = 'Enviar consulta';
      this.successMsg = 'Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.';
      this.formData = { nombre: '', email: '', motivo: '', mensaje: '' };
      setTimeout(() => { this.successMsg = ''; }, 5000);
    }).catch((err) => {
      console.error('EmailJS error:', err);
      this.sending = false;
      this.submitLabel = 'Enviar consulta';
      this.errorMsg = 'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo o contáctanos por WhatsApp.';
      setTimeout(() => { this.errorMsg = ''; }, 6000);
    });
  }
}
