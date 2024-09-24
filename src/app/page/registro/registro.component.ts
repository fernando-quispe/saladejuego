import { CommonModule, NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
  imports: [CommonModule, ReactiveFormsModule, NgFor,FormsModule, RouterModule , RouterLinkActive, RouterOutlet,RouterLink, CommonModule, BienvenidoComponent, ReactiveFormsModule, RegistroComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})

/*

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
          this.router.navigateByUrl('/home');})
        .catch(error => {        
          this.toastr.error("Usuario ya registrado", "ERROR");})    
    }       
  }

  async inicio(){        
    this.router.navigateByUrl('/login');    
  }
}*/


export class RegistroComponent implements OnInit {

  user:string;
  cuil:number;
  //email:string;
  sexo:string;
  clave:string;
  clave2:string;

  registroForm = new FormGroup({
   correo: new FormControl(''),
   clave: new FormControl(''),
   });  

  constructor( private toastr: ToastrService,
   private authService: AuthService,private formBuilder: FormBuilder,
   private router: Router ) {
     this.registroForm = this.formBuilder.group({
       correo:['', [Validators.required, Validators.email,
         Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
       clave:['', [Validators.required, Validators.minLength(6)]]
     });
  }

  registro() {
    const { correo, clave } = this.registroForm.value;
    console.log("email:: "+correo);
    console.log("constraseña:: "+ clave)
    //if(this.user!= null && this.cuil!=null && this.sexo!=null && this.email!=null && this.clave!=null && this.clave2!=null)
    //{
    //if(this.clave == this.clave2)
    //{
      if(this.registroForm.valid){
        this.authService.register(correo, clave)
        .then(auth => {
          this.authService.login(correo, clave)
          .then(res => {
           this.router.navigate(['/Home']);
         })
        })
        .catch(err => {
          console.log(err);
          this.toastr.error("Usuario ya registrado", "ERROR");
        })
       }
    // }
    //else
    // {
     // this.toastr.error("Las claves no coinciden", "ERROR");

    // }
    // }
    //else
    //{
    //  this.toastr.error("Datos incompletos o inválidos", "ERROR");
    //  }
  }
  
  ngOnInit() {
  }

  get email(){
    return this.registroForm.get('email');
  }
 
  get emailValido(){
    return this.email?.touched && this.email.valid;
  }
 
  get emailInvalido(){
   return this.email?.touched && this.email.invalid;
  }

  /**campo password */
  get password(){
   return this.registroForm.get('clave');
  }
 
  get passwordValido(){
   return this.password?.touched && this.password.valid;
  }
 
  get passwordInvalido(){
   return this.password?.touched && (this.password.value).length<6;
  }
}