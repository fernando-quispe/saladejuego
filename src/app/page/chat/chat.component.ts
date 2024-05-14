import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../login/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ChatService } from '../../servicios/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, RouterModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})

export class ChatComponent implements OnInit{
  mensaje:string='';
  element:any;

  constructor(
    public chatServ: ChatService,
    private afs: AngularFirestore){
      this.chatServ.cargarMensajes().subscribe(()=>{
        setTimeout(()=>{
          this.element.scrollTop=this.element.scrollHeight;
        },20)
      });
  }

  ngOnInit():void{
    this.element=document.getElementById('mensajes');
  }

  enviar_mensaje(){    
    if(this.mensaje.length!=0){
      this.element.scrooltop=this.element.scrolHeight;
      this.chatServ.agregarMensaje(this.mensaje)
      .then(()=> this.mensaje="")
      .catch( (e:any)=>console.log("Error",e));
    }
  //console.log(this.mensaje);
  this.mensaje='';
  }  
}