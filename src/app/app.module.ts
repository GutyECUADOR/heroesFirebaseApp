
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* El modulo de formularios varia de version de angular */
import { FormsModule } from '@angular/forms';

/* El modulo Http o HttpClient varia de version de angular */
import { HttpClientModule } from '@angular/common/http';

/* Rutas */
import { appRouting } from './app.routes';

import { AppComponent } from './app.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroeComponent } from './components/heroes/heroe.component';
import { HttpClient } from 'selenium-webdriver/http';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroeComponent
  ],
  imports: [
    BrowserModule,
    appRouting,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
