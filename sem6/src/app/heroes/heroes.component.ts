import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {UpperCasePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { HeroService } from '../hero.service';
import { Hero } from '../Hero';
import {HeroDetailComponent} from '../hero-detail/hero-detail.component';
import {MessageService} from '../message.service';
import {RouterOutlet, RouterLink} from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  imports: [
    UpperCasePipe,
    FormsModule,
    CommonModule,
    HeroDetailComponent,
    RouterOutlet,
    RouterLink
  ],
  standalone: true
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

  getHeroes(): void {
    this.heroService
      .getHeroes()
      .subscribe((heroes) => (this.heroes = heroes));
  }
}
