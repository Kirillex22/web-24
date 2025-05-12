import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Hero } from '../Hero';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UpperCasePipe,
  ],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroDetailComponent {
  hero$!: Observable<Hero>;
  form!: FormGroup;
  private subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.hero$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.heroService.getHero(id);
      }),
      tap(hero => {
        this.form = this.fb.group({
          name: [hero.name],
          age: [hero.age],
          gender: [hero.gender],
          ability: [hero.ability],
          race: [hero.race],
          color: [hero.color],
        });
      })
    );
  }

  save(hero: Hero): void {
    if (this.form.valid) {
      const updatedHero: Hero = {
        ...hero,
        ...this.form.value,
      };
      const sub = this.heroService.updateHero(updatedHero)
        .subscribe(() => this.goBack());
      this.subscriptions.add(sub);
    }
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
