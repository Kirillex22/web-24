import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { Hero } from '../Hero';
import { HeroService } from '../hero.service';
import { RouterOutlet, RouterLink } from '@angular/router';
import {AsyncPipe, NgForOf} from '@angular/common';
import {HeroSearchComponent} from '../hero-search/hero-search.component';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [RouterOutlet, RouterLink, NgForOf, HeroSearchComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  heroes$: Observable<Hero[]>;

  constructor(private heroService: HeroService) {
    this.heroes$ = this.heroService.getHeroes().pipe(
      map(heroes => heroes.slice(1, 5))
    );
  }

}
