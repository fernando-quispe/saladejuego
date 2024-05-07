import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from './user.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  userData: any;
  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  //auth = inject(AngularFireAuth);
  //firestore = inject(AngularFirestore);
  router = inject(Router);
 
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
}