import { CommonModule, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from './user.model';
import { AuthService } from './auth.service';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { BienvenidoComponent } from '../bienvenido/bienvenido.component';
import { ErrorComponent } from '../error/error.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgFor,FormsModule, RouterModule , RouterLinkActive, RouterOutlet,RouterLink, CommonModule,  BienvenidoComponent, ReactiveFormsModule, AuthComponent,],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})

export default class AuthComponent {
  firebaseService = inject(AuthService);

  constructor(private router: Router){}

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  ngOnInit() {
  }

  async submit() {
    if (this.form.valid) {
      this.firebaseService.signIn(this.form.value as User)
        .then(resp => {          
          console.log('___', resp)
          this.router.navigateByUrl('/home');
        })
    }
  }
}
