import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroService } from '../hero.service';
import { Hero } from '../Hero';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { RouterOutlet, RouterLink } from '@angular/router';
import {Observable, Subscription} from 'rxjs';

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
    RouterLink,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroesComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  private subs = new Subscription();

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.heroes$ = this.heroService.getHeroes();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) return;

    const sub = this.heroService.addHero({ name } as Hero).subscribe(() => {
      this.heroes$ = this.heroService.getHeroes();
    });
    this.subs.add(sub);
  }

  delete(hero: Hero): void {
    const sub = this.heroService.deleteHero(hero.id).subscribe(() => {
      this.heroes$ = this.heroService.getHeroes();
    });
    this.subs.add(sub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
