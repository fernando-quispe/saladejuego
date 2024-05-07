import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MayoromenorComponent } from '../../page/mayoromenor/mayoromenor.component';
import { AhorcadoComponent } from '../../page/ahorcado/ahorcado.component';
import { PreguntadosComponent } from '../../page/preguntados/preguntados.component';

const routes: Routes = [
  {path: 'Mayoromenor', component:MayoromenorComponent},
  {path: 'Ahorcado', component:AhorcadoComponent},
  {path: 'Preguntados', component:PreguntadosComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
