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
import { MenuPrincipalComponent } from "./page/menu-principal/menu-principal.component";
import { SimonSaysComponent } from './page/simon-says/simon-says.component';
import { ListadosComponent } from './page/listados/listados.component';
import { ResultadosEncuestasComponent } from './page/resultados-encuestas/resultados-encuestas.component';

@Component({
    selector: 'app-root',    
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: true,
    imports: [RouterOutlet, FormsModule, CommonModule, BienvenidoComponent, ErrorComponent, ListadosComponent,
              RouterModule, AuthComponent, RegistroComponent, ChatComponent, MenuPrincipalComponent, ResultadosEncuestasComponent]
})
export class AppComponent {
  title = 'saladejuego';
}