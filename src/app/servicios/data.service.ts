import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AuthService } from '../page/login/auth.service';
//import { firestore } from 'firebase';
import { map } from 'rxjs/operators';
import { Encuesta } from '../clases/encuesta';
//import { AngularFireAuth } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  //user: any;
  dbUsersRef: AngularFirestoreCollection<any>;
  dbPuntosref:AngularFirestoreCollection<any>;
  itemCollecttion: AngularFirestoreCollection<Encuesta>;

  constructor( public authSrv: AngularFireAuth, private db: AngularFirestore, private authService: AuthService) {
    this.dbUsersRef = this.db.collection("usuarios");
    /*this.authSrv.authState.subscribe(user=>{
      if(user){
        this.user.name=user.displayName;
        this.user.email=user.email;
        this.user.id=user.uid;
      }
    });*/
  }

  getUsers() {
    return this.dbUsersRef.valueChanges();
  }

  getUserByUid(uid: string) {
    return this.dbUsersRef.doc(uid).valueChanges();
  }

  updatePuntaje(userUid, puntos) { //VEO updatePuntaje(userUid, puntos) {
    console.info("puntajes updates", puntos); 
    return this.dbUsersRef.doc(userUid).update({
      puntajes: puntos
    })
  }

  savePuntaje(juego, usuario, puntuacion){ //VEO savePuntaje(juego,usuario,puntuacion){
    let fecha = new Date();
    this.dbUsersRef.doc(usuario.uid).update({
      puntajes: usuario.puntajes
    })
    return this.db.collection(juego).add({
      'fecha': fecha.getDate() + '-' + (fecha.getMonth()+1) +  '-' +fecha.getFullYear(),
      'usuario':usuario,
      'puntuacion': puntuacion});
  }

  getPuntosByJuego(juego:string){
    let puntos; //VEO let puntos;
    let turnosUfs =  this.db.collection(juego ,ref=>ref.orderBy('puntuacion','desc')).valueChanges();
    /* turnosUfs.docs.map(function(x){
    puntos.push(x.data());
    });*/
    return turnosUfs;  // this.db.collection(juego,ref=>ref.orderBy('puntuacion','desc'));
  }

  getEncuestas() {
    return this.db.collection("encuestas").valueChanges();
  }

  GuardarEncuesta(mensaje:Encuesta){
    let fecha = new Date();
    return this.db.collection("encuestas").add({
      'fecha': fecha.getDate() + '-' + (fecha.getMonth()+1) +  '-' +fecha.getFullYear(),
      'mail':mensaje.email,
      'nombre': mensaje.nombre,
      'apellido':mensaje.apellido,
      'telefono':mensaje.telefono,
      'edad':mensaje.edad,
      'comoNosConociste':mensaje.respuestaConocer,
      'juegoPreferido':mensaje.respuestaJuego,
      'puntuacion':mensaje.respuestaPuntuacion,
    });
  }
}