import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BienvenidoComponent } from './page/bienvenido/bienvenido.component';
import { LoginComponent } from './page/login/login.component';
import { ErrorComponent } from './page/error/error.component';
import { HomeComponent } from './page/home/home.component';
import { QuienSoyComponent } from './page/quien-soy/quien-soy.component';
import { JuegosComponent } from './page/juegos/juegos.component';
import AuthComponent from './page/auth/auth.component';
import { RegistroComponent } from './page/registro/registro.component';
import { ChatComponent } from './page/chat/chat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, BienvenidoComponent, LoginComponent, ErrorComponent, RouterModule, QuienSoyComponent, AuthComponent, RegistroComponent, ChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'saladejuego';
}