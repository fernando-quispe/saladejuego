import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from './user.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  dbUsersRef:AngularFirestoreCollection<any>;
  userData: any;

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private db: AngularFirestore) {
      this.dbUsersRef = this.db.collection('usuarios');
     }

  //auth = inject(AngularFireAuth);
  //firestore = inject(AngularFirestore);
  //router = inject(Router);
 
  getAuth() {
    return getAuth();
  }

  //signIn(user: User) {
  //  return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  //}

  async signIn(user: User) {
    try {
      const result = await this.auth.signInWithEmailAndPassword(user.email, user.password);
      this.logLogin(user.email); // Registra el inicio de sesión en Firestore
      return result;
    }catch (error) {
      throw error;
    }
  } 

  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(),  user.email, user.password);
  }
  
  updateUser(displayName: any) {
    return updateProfile(getAuth().currentUser, {displayName} );
  }

  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

  signOut() {
    getAuth().signOut();
    localStorage.removeItem('user');
    this.routerlink('/login');
  }

  routerlink(url: any) {
    this.router.navigateByUrl(url)
  }  

  getUserLogged(){
    return this.auth.authState;
  }

  private logLogin(email: string) {
    this.firestore.collection('usuarios').add({
      email: email,
      timestamp: new Date()
    });
  }

/*
  //agregado
  setUserData(user:User){
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
      'usuarios/${user.uid}'
    );
    const userData: User = {
      uid: user.uid,
      name: user.name,
      email: user.email,
      password: user.password,
      img: user.img
      //fecha: user.fecha,
    };    
    return userRef.set(userData, {
      merge: true
    });
  }*/
/*
  login(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password)
    .then(result=>{
      this.setUserData(result.user);
      this.auth.authState.subscribe(user=>{
        if(user){
          this.router.navigate(['home']);
        }
      })
    }).catch(result=>{
      this.toastr.error("Datos incompletos o inválidos", "ERROR"); 
    })
  }*/

  //agregadoSR
  getUserUid()
  {  
    return new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged(function(user){
        if(user)
        {
          console.log(user);
          resolve(user.uid)
        }
        else
        {
          resolve("0")
        }
      })    
    })
  }

  getUserEmail()
  {  
      return new Promise((resolve, reject) => {
        this.auth.onAuthStateChanged(function(user){
            if(user)
            {
              console.log(user);
              resolve(user.email)
            }
            else
            {
              resolve("0")
            }
        })
        
      })
  }
    
  getLogueado (){

    let user = this.auth.currentUser;
    console.log(user);
    if(user != undefined && user!= null)
    {
      console.log(user); 
      console.log(JSON.stringify(user));
      console.info(JSON.stringify(user));
      return true;
    }
    else
    {
      return false;
    }
  }

  async getUserByMail(email: string) {

    console.log("buscando usuario por mail");
    let usrsRef = await this.dbUsersRef.ref.where("email", "==", email).get();
    let listado:Array<any> = new Array<any>();
    usrsRef.docs.map(function(x){
        listado.push(x.data());
    });
    return listado;
  }

  /*getCurrentUserMail(): string {
    return firebase.auth().currentUser.email;
  }*/

  getCurrentUser() {
     let user = this.auth.currentUser;
    return user;
  }

  isLoggedIn() {
    return this.auth.authState;
  }

  login(email: string, password: string) {

    return new Promise((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(email, password)
        .then(user => {
          let fecha=new Date();
          this.db.collection('ingresos').add({
            email: email,
            fechaacceso:  fecha.getDate() + '-' + (fecha.getMonth()+1) +  '-' +fecha.getFullYear(),
            dato: 'Ingreso al sistema'
          })
          resolve(user);
        })
        .catch(err => {
          reject(err);
        });
    })
  }

  logout() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    })
  }

  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.auth.createUserWithEmailAndPassword(email, password)
        .then(res => {
          console.log(res.user.uid);
          const uid = res.user.uid;
          this.db.collection("usuarios").doc(res.user.uid).set({
            uid: uid,
            email:email,
            clave:password,
            perfil: 'usuario',
            puntajes : [
              {'ahorcadoJugados': 0},
              {'mayorMenosJugados': 0},
              {'preguntadosJugados': 0},
              {'simonJugados': 0},
            ]
          })
          resolve(res)
        })
        .catch(error => { reject(error) });
    });
  }
}