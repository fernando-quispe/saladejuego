import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { AhorcadoComponent } from '../../page/ahorcado/ahorcado.component';
import { MayoromenorComponent } from '../../page/mayoromenor/mayoromenor.component';
import { PreguntadosComponent } from '../../page/preguntados/preguntados.component';


@NgModule({
  declarations: [AhorcadoComponent, MayoromenorComponent, PreguntadosComponent],
  imports: [
    CommonModule,
    JuegosRoutingModule
  ]
})
export class JuegosModule { }
