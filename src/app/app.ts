import { Component } from '@angular/core';
import { Nav } from './nav/nav';
import { Hero } from './hero/hero';
import { Strip } from './strip/strip';
import { About } from './about/about';
import { Services } from './services/services';
import { Approach } from './approach/approach';
import { Formation } from './formation/formation';
import { Reviews } from './reviews/reviews';
import { Contact } from './contact/contact';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-root',
  imports: [Nav, Hero, Strip, About, Services, Approach, Formation, Reviews, Contact, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
