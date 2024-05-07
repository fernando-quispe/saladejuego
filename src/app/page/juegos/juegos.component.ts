import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet, ActivatedRoute, ParamMap } from '@angular/router';
import { BienvenidoComponent } from '../bienvenido/bienvenido.component';
import { LoginComponent } from '../login/login.component';
import { ErrorComponent } from '../error/error.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-juegos',
  //standalone: true,
  //imports: [RouterOutlet, RouterModule, FormsModule, CommonModule, BienvenidoComponent,LoginComponent, ErrorComponent, HomeComponent, JuegosComponent],
  templateUrl: './juegos.component.html',
  styleUrl: './juegos.component.css'
})

export class JuegosComponent implements OnInit {

  loggedUser: any;

  /*constructor(private router: Router) {
    const localUser = localStorage.getItem('loggedUser');
    if(localUser != null) {
      this.loggedUser = JSON.parse(localUser);
    }
  }*/
  
  
  constructor(private route: ActivatedRoute,
    private router: Router) { } 

  onLogoff() {
    localStorage.removeItem('loggedUser');
      this.router.navigateByUrl('/login')
  }

  ngOnInit() {
  }
  
  Juego(tipo: string) {
    this.router.navigate(['/Juegos/'+tipo]);
  }
}