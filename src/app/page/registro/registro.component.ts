import { CommonModule, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ToastrService, provideToastr } from 'ngx-toastr';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, EmailValidator, FormBuilder } from '@angular/forms';
import { User } from '../login/user.model';
import { AuthService } from '../login/auth.service';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { BienvenidoComponent } from '../bienvenido/bienvenido.component';
import { ErrorComponent } from '../error/error.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgFor,FormsModule, RouterModule , RouterLinkActive, RouterOutlet,RouterLink, CommonModule, BienvenidoComponent, ReactiveFormsModule, ErrorComponent, HomeComponent, RegistroComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})

export class RegistroComponent {
  firebaseService = inject(AuthService);

  constructor(private router: Router, private toastr: ToastrService){}

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  ngOnInit() {
  }

  async submit() {
    if (this.form.valid) {
      this.firebaseService.signUp(this.form.value as User)
        .then(resp => {          
          console.log('___', resp)
          this.router.navigateByUrl('/home');
        }
      )
      this.toastr.error("Usuario ya registrado", "ERROR");      
    }       
  }

  async inicio(){        
    this.router.navigateByUrl('/login');    
}
}