import { Juego } from "../clases/juego";

export class Ahorcado extends Juego{
    palabrasRandom =["pileta","verano", "leon", "perro", "estrella", "campo", "novedad","panaderia", 
                    "comedor", "pajaro", "dormitorio", "millonario", "monumental", "primavera", "argentina",
                    "obelisco", "reserva"];

    palabraSeleccionada:string;

    constructor(nombre?: string, gano?: boolean, jugador?: string) {
        super("Ahorcado", true, jugador);
    }

    verificar() {
        this.gano = true;        
        return this.gano;
    }
   
    SeleccionarPalabra() {
       let palabra = (Math.floor(Math.random() * (this.palabrasRandom.length - 0 + 1)) + 0); 
      
       this.palabraSeleccionada = this.palabrasRandom[palabra];
       return  this.palabraSeleccionada;
    }
}