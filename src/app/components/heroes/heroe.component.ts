import { HeroesService } from './../../services/heroes.service';
import { Component, OnInit } from '@angular/core';
import { IHeroe } from '../../interfaces/heroe.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';



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
      casa: 'MV',
      descripcion: ''
    };
  }

  ngOnInit() {
    this.checkIsNewRegistro();
    this.loadingHereo();
  }

  checkIsNewRegistro() {
    this.activatedRoute.params.subscribe( parametros => {
      console.log(parametros);
      this.IDURL = parametros.id;
    });
  }

  loadingHereo() {
    if (this.IDURL !== 'nuevo') {
      this.heroeService.getHeroe(this.IDURL)
        .subscribe( (data: any) => {
          this.heroe = data;
          console.log(this.heroe);
        });
    }
  }

  agregarNuevo(formulario: NgForm) {
    this.router.navigate(['/heroe', 'nuevo']);
    formulario.reset({
      selectCasa: 'MV'
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
