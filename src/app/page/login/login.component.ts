import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BienvenidoComponent } from '../bienvenido/bienvenido.component';
import { ErrorComponent } from '../error/error.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgFor ,ReactiveFormsModule ,CommonModule, LoginComponent, BienvenidoComponent, ErrorComponent, RouterOutlet, RouterLink, RouterLinkActive, HomeComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isSignDivVisiable: boolean  = true;
  signUpObj: SignUpModel  = new SignUpModel();
  loginObj: LoginModel  = new LoginModel();

  constructor(private router: Router){}

  onRegister() {
    debugger;
    const localUser = localStorage.getItem('usuarios');
    if(localUser != null) {
      const users =  JSON.parse(localUser);
      users.push(this.signUpObj);
      localStorage.setItem('usuarios', JSON.stringify(users))
    } else {
      const users = [];
      users.push(this.signUpObj);
      localStorage.setItem('usuarios', JSON.stringify(users))
    }
    alert('Registración exitosa')
  }

  onLogin() {
    debugger;
    const localUsers =  localStorage.getItem('usuarios');
    if(localUsers != null) {
      const users =  JSON.parse(localUsers);
      const isUserPresent =  users.find( (user:SignUpModel)=> user.email == this.loginObj.email && user.password == this.loginObj.password);
      if(isUserPresent != undefined) {
        alert("Usuario encontrado ...");
        localStorage.setItem('loggedUser', JSON.stringify(isUserPresent));
        this.router.navigateByUrl('/bienvenido');
      } else {
        alert("Usuario no encontrado")
        this.router.navigateByUrl('/error');
      }
    }
  } 
}

export class SignUpModel  {
  name: string;
  email: string;
  password: string;

  constructor() {
    this.email = "";
    this.name = "";
    this.password= ""
  }
}

export class LoginModel  { 
  email: string;
  password: string;

  constructor() {
    this.email = ""; 
    this.password= ""
  }
}