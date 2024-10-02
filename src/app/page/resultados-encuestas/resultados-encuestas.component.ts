import { Component, OnInit } from '@angular/core';
import { DataService } from '../../servicios/data.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-resultados-encuestas',
  standalone: true,
  imports: [NgFor],
  templateUrl: './resultados-encuestas.component.html',
  styleUrl: './resultados-encuestas.component.css'
})

export class ResultadosEncuestasComponent implements OnInit {

  listado:any;
  constructor(private dataSrv:DataService) { }

  ngOnInit(): void {
    this.dataSrv.getEncuestas().subscribe((res)=>{
      console.log(res);
      this.listado = res;
      console.log(this.listado);
    });
  }

  ConsultarPuntos(juego:string){
    console.log(juego);
    this.dataSrv.getEncuestas().subscribe((res)=>{
      console.log(res);
      this.listado = res;
      console.log(this.listado);
    });
  }
}