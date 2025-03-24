import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import {HeroesComponent} from './heroes/heroes.component';
import {MessagesComponent} from './messages/messages.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    HeroesComponent,
    MessagesComponent,
    RouterOutlet,
    RouterLink
  ],
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Tour of Heroes';
}
