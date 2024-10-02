import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, NgModule} from '@angular/core';
import { EmailValidator, FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { BienvenidoComponent } from '../bienvenido/bienvenido.component';
import { LoginComponent } from '../login/login.component';
import { ErrorComponent } from '../error/error.component';
import { JuegosComponent } from '../juegos/juegos.component';
import AuthComponent from '../auth/auth.component';
import { User } from '../login/user.model';
import { signOut, Auth, signInWithEmailAndPassword } from 'firebase/auth';
import { AuthService } from '../login/auth.service';
import { ChatComponent } from '../chat/chat.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SimonSaysComponent } from '../simon-says/simon-says.component';
import { ListadosComponent } from '../listados/listados.component';
//import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, RouterOutlet, FormsModule, CommonModule, BienvenidoComponent, ListadosComponent,
            LoginComponent, RouterModule, HomeComponent, AuthComponent, ChatComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  
  loggedUser: any;
  estaLogueado:boolean=false;

  noEstaLogueado:boolean=false;
  /*
  constructor(private router: Router) {
    const localUser = localStorage.getItem('loggedUser');
    if(localUser != null) {
      this.loggedUser = JSON.parse(localUser);
    }
  }*/

  constructor(private router: Router, public authFire: AngularFireAuth) {
    this.authFire.authState.subscribe(res=>{
      if(res && res.uid){
       this.estaLogueado=true;

      } else { 
        this.noEstaLogueado=true; 
        console.log(' No hay usuario logueado ');
      }
    });
  }
 
  onLogoff() {
    localStorage.removeItem('loggedUser');
    this.router.navigateByUrl('/home') //antes login
  }

  chat() {
    //localStorage.removeItem('loggedUser');
    this.router.navigateByUrl('/chat')
  }

  quiensoy() {
    //localStorage.removeItem('loggedUser');
    this.router.navigateByUrl('/quien-soy')
  }

  ngOnInit(): void {
  }
  
  Juego(tipo: string) {
    this.router.navigate(['/juegos/'+tipo]);
  }

}