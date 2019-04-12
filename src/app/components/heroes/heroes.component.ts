import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { IHeroe } from 'src/app/interfaces/heroe.interface';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  public heroesList: IHeroe;

  constructor(public heroesService: HeroesService) {
  }

  ngOnInit() {
    this.heroesService.getHeroes();
  }

  showHeroes() {
    this.heroesService.getHeroes()
      .subscribe((data: IHeroe) => {
        console.log(data);
      });

  }

}
