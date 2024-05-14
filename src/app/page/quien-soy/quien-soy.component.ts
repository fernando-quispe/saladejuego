import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { BienvenidoComponent } from '../bienvenido/bienvenido.component';
import { LoginComponent } from '../login/login.component';
import { ErrorComponent } from '../error/error.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-quien-soy',
  //standalone: true,
  //imports: [RouterOutlet, FormsModule, CommonModule, BienvenidoComponent, RouterModule],
  templateUrl: './quien-soy.component.html',
  styleUrl: './quien-soy.component.css'
})

export class QuienSoyComponent implements OnInit {
  
  constructor() { }
  /*loggedUser: any;
  constructor(private router: Router) {
    const localUser = localStorage.getItem('loggedUser');
    if(localUser != null) {
      this.loggedUser = JSON.parse(localUser);
    }
  }
  
  onLogoff() {
    localStorage.removeItem('loggedUser');
      this.router.navigateByUrl('/login')
  }*/

  ngOnInit(): void {
  }
}