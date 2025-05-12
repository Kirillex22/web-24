import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import {HeroesComponent} from './heroes/heroes.component';
import {MessagesComponent} from './messages/messages.component';
import {HeaderComponent} from './header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    HeroesComponent,
    MessagesComponent,
    RouterOutlet,
    RouterLink,
    HeaderComponent
  ],
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Tour of Heroes';
}
