import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule} from  '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { initializeApp } from 'firebase/app';
import { provideToastr } from 'ngx-toastr';
import { timeout } from 'rxjs';

const firebaseConfig = {
  apiKey: "AIzaSyDLLuZ4LC1paSBlL6-NYt5Dbk25mXtoZDI",
  authDomain: "saladejuego-6496f.firebaseapp.com",
  projectId: "saladejuego-6496f",
  storageBucket: "saladejuego-6496f.appspot.com",
  messagingSenderId: "514966214529",
  appId: "1:514966214529:web:807a639e045525e6cb3a80"
};

//const app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideToastr({timeOut: 3000, preventDuplicates: true}),
    provideRouter(routes, withHashLocation()),
    importProvidersFrom(
      HttpClientModule,
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFirestoreModule      
    )]
};