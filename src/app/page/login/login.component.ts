import { CommonModule, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, EmailValidator, FormBuilder } from '@angular/forms';
import { User } from './user.model';
import { AuthService } from './auth.service';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { BienvenidoComponent } from '../bienvenido/bienvenido.component';
import { ErrorComponent } from '../error/error.component';
import { HomeComponent } from '../home/home.component';
import { RegistroComponent } from '../registro/registro.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgFor,FormsModule, RouterModule , RouterLinkActive, RouterOutlet,RouterLink, CommonModule, BienvenidoComponent, ReactiveFormsModule, ErrorComponent, HomeComponent, RegistroComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  firebaseService = inject(AuthService);

  constructor(private router: Router, private toastr: ToastrService){}

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  ngOnInit() {
  }

  administradorLogin(){
    this.form.controls['email'].setValue('fernando@gmail.com');
    this.form.controls['password'].setValue('123456');
  }
  invitadoLogin(){
    this.form.controls['email'].setValue('daniel@gmail.com');
    this.form.controls['password'].setValue('123456');
  }

  async submit() {
    if (this.form.valid) {
      this.firebaseService.signIn(this.form.value as User)
        .then(resp => {          
          console.log('___', resp)
          this.router.navigateByUrl('/home');
        }
      )      
    }
    else {
      this.toastr.error("Datos incompletos o inválidos", "ERROR"); 
    }
  }

  async registrar(){        
      this.router.navigateByUrl('/registro');    
  }
}