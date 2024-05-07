import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, LoginComponent, RouterModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})

export class ChatComponent implements OnInit{
  mostrarChat=false;
  usuarioLogeado: any;
  nuevoMensaje: string="";
  loggedUser: any;

  /*
  mensajes: any = [
    {
      emisor: "iv95bNCTDGVYTnI65vw333wUULgH3",
      texto: "Hola que tal"
    },
    {
      emisor: "id",
      texto: "Todo bien..vos?"
    },
    {
      emisor: "v95bNCTDGVYTnI65vw333wUULgH3",
      texto: "Todo perfecto"
    },
    {
      emisor: "id",
      texto: "Me alegro"
    },
  ];*/

  mensajes: any = []

  constructor(private router: Router, private authService:AuthService) {
    const localUser = localStorage.getItem('loggedUser');
    if(localUser != null) {
      this.loggedUser = JSON.parse(localUser);
    }
  }
  
  ngOnInit(): void {    
    this.authService.getUserLogged().subscribe(usuario=>{
      this.usuarioLogeado=usuario;
    }); //tenemos que getUserLogged configurarlo
  }

  onLogoff() {
    localStorage.removeItem('loggedUser');
      this.router.navigateByUrl('/login')
  }
  
  enviarMensaje(){
    if(this.nuevoMensaje=="") return;
    console.log(this.nuevoMensaje);
    let mensaje={
      emisor: this.usuarioLogeado.uid,
      texto: this.nuevoMensaje
    }
    this.mensajes.push(mensaje);
    this.nuevoMensaje="";

    setTimeout(() => {
      this.scrollToTheLastElementByClassName();
    }, 10);

    this.scrollToTheLastElementByClassName();
  }

  scrollToTheLastElementByClassName(){
    let elements=document.getElementsByClassName('msj');
    let ultimo:any=elements[(elements.length-1)];
    let toppos=ultimo.offsetTop;
    
    //@ts-ignore
    //document.getElementById('contenedorDeMensajes')?.scrollTop=toppos;
  }
 
}
