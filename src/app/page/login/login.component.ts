import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject, NgModule } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, EmailValidator, FormBuilder, MinLengthValidator } from '@angular/forms';
import { User } from './user.model';
import { AuthService } from './auth.service';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet, ActivatedRoute } from '@angular/router';
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
  imports: [CommonModule, ReactiveFormsModule, NgFor, NgIf,FormsModule, RouterModule , RouterLinkActive, RouterOutlet,RouterLink, ReactiveFormsModule, RegistroComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {

  private subscription: Subscription;
  email = '';
  clave= '';
  nombre="";
  estado=false;
  progreso: number;
  progresoMensaje="esperando...";
  logeando=true;
  ProgresoDeAncho:string;
  spiner:boolean = false;
  emailClass = "form-control";
  claveClass = "form-control";

  clase="progress-bar progress-bar-info progress-bar-striped ";//agregue 
 

  firebaseService = inject(AuthService);
  usuarios: any[];
  //email: string;
  
  public usuariosCollection:any[] = [];
  public user:string = "";
  
  //constructor(private router: Router, private toastr: ToastrService, private firestore: Firestore ){}
  constructor(
    private router: Router, 
    private toastr: ToastrService,
    private firestore: AngularFirestore,

    private route: ActivatedRoute,
    private rutas: Router,
    private auth: AuthService,
    private toast:ToastrService) {
      this.progreso=0;
      this.ProgresoDeAncho="0%";
    }

/*agregue 
  form = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required])
  //otra forma para validar password: new FormControl('', [Validators.required, Validators.minLength(6)])
 })*/

  ngOnInit(): void{
  }

  administradorLogin(){
    this.email = "administrador@gmail.com";
    this.clave = "123456";
  } 

  invitadoLogin(){    
    this.email = "invitado@gmail.com";
    this.clave = "123456";
  }

  /*agregue
  administradorLogin1(){
    this.form.controls['email'].setValue('administrador@gmail.com');
    this.form.controls['password'].setValue('123456');
  }
  invitadoLogin1(){
    this.form.controls['email'].setValue('invitado@gmail.com');
    this.form.controls['password'].setValue('123456');
  }*/
  
  /*async submit() {
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
  }*/ 

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

  async registrar(){        
    this.router.navigateByUrl('/registro');    
  }

  Entrar() {
   
    this.spiner=true
    this.emailClass="form-control";
    this.claveClass="form-control";

    if(this.email.length<4)
    {
      this.emailClass="form-control error";
    }
    if(this.clave.length<4)
    {
      this.claveClass="form-control error";
    }
  
    this.auth.login(this.email, this.clave)
    .then(res => {
      this.spiner=false;
      this.rutas.navigate(['/home']).then(()=> this.usuarioLogueado());
    })
    .catch(error => {     
      this.toastr.error("Los datos son incorrectos o no existe el usuario");
      this.spiner=false;
      this.logeando =true;        
    })
  }

  usuarioLogueado() { 
    let usuario= this.auth.getUserUid();//.getCurrentUser();
    if(usuario == null) {
    this.estado =false;
    }
    else if(usuario!=null){
      console.log("UID::"+JSON.stringify(usuario));
      //this.nombre= usuario;
      this.estado =true;
    }
  }
}