import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from './user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

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

  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
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
    this.routerlink('/auth');
  }

  routerlink(url: any) {
    this.router.navigateByUrl(url)
  }

  private logLogin(email: string) {
    this.firestore.collection('usuarios').add({
      email: email,
      timestamp: new Date()
    });
  }
}