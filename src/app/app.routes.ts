import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { BienvenidoComponent } from './page/bienvenido/bienvenido.component';
import { ErrorComponent } from './page/error/error.component';
import { HomeComponent } from './page/home/home.component';
import { QuienSoyComponent } from './page/quien-soy/quien-soy.component';

export const routes: Routes = [
    { path:'', redirectTo : 'login', pathMatch:'full' },
    { path:'login', component: LoginComponent },
    { path:'error', component: ErrorComponent },  
    { path:'quien-soy', component: QuienSoyComponent }, 
    { path:'home', component: BienvenidoComponent }, 
    { path:'', component: HomeComponent, children: [
        { path:'bienvenido', component: BienvenidoComponent },   
      ]
    },      
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }