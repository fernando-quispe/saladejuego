import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { BienvenidoComponent } from './page/bienvenido/bienvenido.component';
import { ErrorComponent } from './page/error/error.component';
import { HomeComponent } from './page/home/home.component';
import { QuienSoyComponent } from './page/quien-soy/quien-soy.component';
import { JuegosComponent } from './page/juegos/juegos.component';
import { RegistroComponent } from './page/registro/registro.component';
import { ChatComponent } from './page/chat/chat.component';
import { ListadosComponent } from './page/listados/listados.component'
import { authGuard } from './guards/auth.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { EncuestaComponent } from './page/encuesta/encuesta.component';

export const routes: Routes = [
    
  { path:'login', component: LoginComponent },
  { path:'error', component: ErrorComponent },  
  { path:'quien-soy', component: QuienSoyComponent }, 
  { path:'listados', component: ListadosComponent }, 
  { path:'home', component: HomeComponent }, 
  { path:'chat', component: ChatComponent },
  { path:'encuesta', component: EncuestaComponent},  
  { path:'registro', component: RegistroComponent },
  /*{ path:'juegos', component: JuegosComponent },*/ 
  /*{ path:'Juegos',loadChildren: ()=>(import('./modules/juegos/juegos-routing.module').then(m => m.JuegosRoutingModule))},*/
  { path:'juegos',loadChildren: ()=>(import('./modules/juegos/juegos-routing.module').then(m => m.JuegosRoutingModule)),canActivate: [authGuard]},
  /*{ path:'', component: HomeComponent, children: [
  { path:'bienvenido', component: BienvenidoComponent },   
  ]
  }, */
  { path:'', redirectTo : 'home', pathMatch:'full' },
  /*{ path:'', redirectTo : 'login', pathMatch:'full' },colocar si quiero que empiece en login y no en home*/
  { path: '**', component: ErrorComponent}     
];
  
  @NgModule({
    declarations:[],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }