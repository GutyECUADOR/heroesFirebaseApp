import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { IHeroe } from 'src/app/interfaces/heroe.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  public heroesList = [];

  constructor(public heroesService: HeroesService, private router: Router) {
    heroesService.getHeroes()
      .subscribe( (data: any) => {
        // tslint:disable-next-line:forin
        for (const key in data) {
          this.heroesList.push({ key, data: data[key]});
        }
      });
  }

  ngOnInit() {
    this.heroesService.getHeroes();
    console.log(this.heroesList);
  }

  showHeroes() {
    this.heroesService.getHeroes()
      .subscribe((data: IHeroe) => {
        console.log(data);
      });

  }

  editHeroe(heroeKey: string) {
    this.router.navigate(['/heroe', heroeKey]);
  }

  deleteHeroe(heroeKey: string) {
    // console.log(heroeKey);
    this.heroesService.deleteHeroe(heroeKey)
      .subscribe( respuesta => {
        console.log(respuesta);
        if (respuesta == null) {
          alert('Eliminado con exito');
        }
      });
  }

}
