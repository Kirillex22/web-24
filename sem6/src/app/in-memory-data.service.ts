import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './Hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService
  implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 12, name: 'Dr. Nice', age: 40, gender: 'Male', ability: 'Mega punch', race: 'Human', color: 'White' },
      { id: 13, name: 'Bombasto', age: 30, gender: 'Male', ability: 'Nuclear bang', race: 'Reptile', color: 'Green' },
      { id: 14, name: 'Celeritas', age: 19, gender: 'Female', ability: 'Ultra light', race: 'Human', color: 'Black' },
      { id: 15, name: 'Magneta', age: 33, gender: 'Female', ability: 'Magnetic', race: 'Human', color: 'White' },
      { id: 16, name: 'RubberMan', age: 15, gender: 'Male', ability: 'Nothing', race: 'Human', color: 'White' },
      { id: 17, name: 'Dynama', age: 1000, gender: 'Female', ability: 'Brains destroying', race: 'Marsian', color: 'White' },
      { id: 18, name: 'Dr. IQ', age: 10, gender: 'Male', ability: 'Intelligence', race: 'Human', color: 'White' },
      { id: 19, name: 'Magma', age: 25, gender: 'Female', ability: 'Magma-shots', race: 'Human', color: 'Black' },
      { id: 20, name: 'Tornado', age: 35, gender: 'Male', ability: 'Big tornado', race: 'Human', color: 'White' },
    ];
    return { heroes };
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0
      ? Math.max(...heroes.map((hero) => hero.id)) + 1
      : 11;
  }
}
