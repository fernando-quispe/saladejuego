import { Component, OnInit } from '@angular/core';
import { DataService } from '../../servicios/data.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-listados',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './listados.component.html',
  styleUrl: './listados.component.css'
})

export class ListadosComponent implements OnInit{
  juegoElegido:string='';
  listado:any;
  
  constructor(private dataSrv:DataService) { }

  ngOnInit(): void {  }

  ConsultarPuntos(juego:string){
    console.log(juego);
    this.dataSrv.getPuntosByJuego(juego).subscribe((res)=>{
      console.log(res);
      this.listado = res;
      console.log(this.listado);
    });
  }
}