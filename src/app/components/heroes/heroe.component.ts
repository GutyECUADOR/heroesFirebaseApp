import { HeroesService } from './../../services/heroes.service';
import { Component, OnInit } from '@angular/core';
import { IHeroe } from '../../interfaces/heroe.interface';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  public heroe: IHeroe;
  private nuevoIDGenerado: any;
  private IDURL: any;

  constructor(
    private heroeService: HeroesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.heroe = {
      nombre: '',
      casa: 'Marvel',
      descripcion: ''
    };
  }

  ngOnInit() {
    this.checkIsNewRegistro();
    this.heroeService.getHeroe(this.IDURL).subscribe( data => {

    });
  }

  checkIsNewRegistro() {
    this.activatedRoute.params.subscribe( parametros => {
      console.log(parametros);
      this.IDURL = parametros.id;
    });
  }

  submitForm() {
    console.log(this.heroe);

    if (this.IDURL === 'nuevo') {
      this.heroeService.nuevoHeroe(this.heroe)
        .subscribe(data => {
          this.nuevoIDGenerado = data; /* Solucion no ortodoxa ya que no permite acceder a data.ID */
          this.nuevoIDGenerado = this.nuevoIDGenerado.name;
          this.router.navigate(['/heroe', this.nuevoIDGenerado]);
        }, error => {
          console.log(error);
        });
    } else {
      this.heroeService.updateHeroe(this.heroe, this.IDURL)
        .subscribe( data => {
          console.log('Actualizado', data);
        });
    }

  }
}
