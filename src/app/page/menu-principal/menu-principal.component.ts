import { Component } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Router, RouterOutlet } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-menu-principal',
  standalone: true,
  imports: [],
  templateUrl: './menu-principal.component.html',
  styleUrl: './menu-principal.component.css'
})
export class MenuPrincipalComponent {

  estado_activo:boolean;
  mail_usuario?:string;
  perfil:string;
  user:any;

  constructor(
    private auth: AuthService,
    private router: Router,
    public authFire: AngularFireAuth){

    this.authFire.authState.subscribe(res=>{
      if(res && res.uid){
        this.mail_usuario = res.email;          
        console.log(this.mail_usuario);
        this.auth.getUserByMail(this.mail_usuario).then(res =>{
          if(res.length > 0)
          { 
            console.log(res);
            this.user=res[0];
            this.perfil=res[0].perfil;
            console.log("perfil::" +this.perfil);
          }
        }, error=>{});
          console.log("perfil::" +this.perfil);
      } else { console.log(' No hay usuario logueado ');}
    });
  }

  ngOnInit(): void {
    this.auth.isLoggedIn().subscribe(
      data => {
        this.user = data;
        if(this.user){
          this.estado_activo = true;
         // this.mail_usuario='fernando@gmail.com';
        }
        else{ this.estado_activo = false;
          //this.mail_usuario='';
        }
      },
      err => console.log(err)
    );
  }

  async cerrarSesion(){
    try {
      await this.auth.logout();
      this.estado_activo = false;
    } catch (error) {
      console.log("Error al cerrar sesion" + error);
    }
  } 

  async quienSoy(){        
    this.router.navigateByUrl('/quien-soy');    
  }

  async home(){        
    this.router.navigateByUrl('/home');    
  }

  async login(){        
    this.router.navigateByUrl('/login');    
  }

  async registro(){        
    this.router.navigateByUrl('/registro');    
  }

  async encuesta(){        
    this.router.navigateByUrl('/encuesta');    
  }

  async chat(){        
    this.router.navigateByUrl('/chat');    
  }

  async listados(){        
    this.router.navigateByUrl('/listados');    
  }
}