import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MayoromenorComponent } from '../../page/mayoromenor/mayoromenor.component';
import { AhorcadoComponent } from '../../page/ahorcado/ahorcado.component';
import { PreguntadosComponent } from '../../page/preguntados/preguntados.component';
import { SimonSaysComponent } from '../../page/simon-says/simon-says.component';

const routes: Routes = [
  {path: 'mayoromenor', component:MayoromenorComponent},
  {path: 'ahorcado', component:AhorcadoComponent},
  {path: 'preguntados', component:PreguntadosComponent},
  {path: 'simon-says', component:SimonSaysComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
