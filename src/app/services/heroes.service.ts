import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IHeroe } from '../interfaces/heroe.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private fireBaseHeroesURL = 'https://fir-angular-83441.firebaseio.com/heroes.json';
  private fireBaseSingleHeroeURL = 'https://fir-angular-83441.firebaseio.com/heroes/';

  constructor(private http: HttpClient ) {
    this.test();
    this.getHeroes();
  }

  test() {
    console.log('Funciona');
  }

  nuevoHeroe(heroe: IHeroe) {
    const body = JSON.stringify(heroe);
    const headers = new HttpHeaders ({
      'Content-Type': 'Aplicaction/json'
    });

    return this.http.post(this.fireBaseHeroesURL, body, { headers }).pipe(map(respuesta => {
      console.log(respuesta);
      return respuesta;
    }));

  }

  getHeroe(heroeKey: string) {
    const URL = `${this.fireBaseSingleHeroeURL}/${heroeKey}.json`;

    return this.http.get(URL).pipe(map(respuesta => {
      console.log(respuesta);
      return respuesta;
    }));

  }

  /*NOTA: Hasta que no se subcriba alguien al servicio este no realiza la peticion */
  getHeroes() {
    return this.http.get(this.fireBaseHeroesURL).pipe(map(respuesta => {
      console.log(respuesta);
      return respuesta;
    }));
  }

  updateHeroe(heroe: IHeroe, heroeKey: string) {
    const updateURL = `${this.fireBaseSingleHeroeURL}/${heroeKey}.json`;
    const body = JSON.stringify(heroe);
    const headers = new HttpHeaders({
      'Content-Type': 'Aplicaction/json'
    });

    return this.http.put( updateURL, body, { headers }).pipe(map(respuesta => {
      console.log(respuesta);
      return respuesta;
    }));

  }

  deleteHeroe(heroeKey: string) {
    const URL = `${this.fireBaseSingleHeroeURL}/${heroeKey}.json`;
    const headers = new HttpHeaders({
      'Content-Type': 'Aplicaction/json'
    });

    return this.http.delete(URL, { headers }).pipe(map(respuesta => {
      console.log(respuesta);
      return respuesta;
    }));

  }

}
