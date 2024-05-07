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
import { Firestore, collectionData, addDoc, collection} from '@angular/fire/firestore';
//import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgFor,FormsModule, RouterModule , RouterLinkActive, RouterOutlet,RouterLink, CommonModule, BienvenidoComponent, ReactiveFormsModule, ErrorComponent, RegistroComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  firebaseService = inject(AuthService);
  usuarios: any[];
  email: string;
  
  public usuariosCollection:any[] = [];
  public user:string = "";
  
  //constructor(private router: Router, private toastr: ToastrService, private firestore: Firestore ){}
  constructor(private router: Router, private toastr: ToastrService,private firestore: AngularFirestore){}

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

          //this.firestore.collection('usuarios').add({
          //  email: this.email,
          //  timestamp: new Date()
          //});

          //otra forma
          //this.firestore.collection('usuarios').valueChanges().subscribe((logs: any[]) => {
          //  this.usuarios == logs;
          //});
          //otra forma
          //let col = collection(this.firestore, 'usuarios');
          //addDoc(col, {Fecha: new Date(), "user": this.user})
          //this.firebaseService.setUserData(this.form.value as User);
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

  /*se agrego
  Login(){
    let col = collection(this.firestore, 'usuarios');
    addDoc(col, {Fecha: new Date(), "user": this.user})
  }/*
/*
  GetData(){
    let col = collection(this.firestore, 'usuarios');
    const observable = collectionData(col);

    observable.subscribe((respuesta) => {
      this.usuariosCollection = respuesta;
      console.log(respuesta);
    })
  } 
*/

}