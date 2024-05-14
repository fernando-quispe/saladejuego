import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { AhorcadoComponent } from '../../page/ahorcado/ahorcado.component';
import { MayoromenorComponent } from '../../page/mayoromenor/mayoromenor.component';
import { PreguntadosComponent } from '../../page/preguntados/preguntados.component';
import { SimonSaysComponent } from '../../page/simon-says/simon-says.component';


@NgModule({
  declarations: [AhorcadoComponent, MayoromenorComponent, PreguntadosComponent, SimonSaysComponent],
  imports: [
    CommonModule,
    JuegosRoutingModule
  ]
})
export class JuegosModule { }
