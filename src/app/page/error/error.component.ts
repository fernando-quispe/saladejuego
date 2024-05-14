import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { BienvenidoComponent } from '../bienvenido/bienvenido.component';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, BienvenidoComponent, ErrorComponent, RouterModule ],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})

export class ErrorComponent implements OnInit {
  loggedUser: any;
  constructor(private router: Router) {
    const localUser = localStorage.getItem('loggedUser');
    if(localUser != null) {
      this.loggedUser = JSON.parse(localUser);
    }
  }

  onLogoff() {
    localStorage.removeItem('loggedUser');
    this.router.navigateByUrl('/login')
  }

  ngOnInit(): void {
  }
}