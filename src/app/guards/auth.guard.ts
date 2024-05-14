import { CanActivateFn, Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../page/login/auth.service';
import { ToastrService } from 'ngx-toastr';


export const authGuard: CanActivateFn = (route, state) => {

  const auth = inject (AuthService);
  const router = inject (Router);
  const toast = inject (ToastrService)

  let user;
       
    return auth.getUserUid().then(res => {
        user = res;
        
        if(user != 0 && user!=undefined)
        { 
         console.log(user);
          return true;
        }
        else
        {  
          toast.error("Necesitás estar logueado para ingresar a esta ruta","Error");
          router.navigate(['/login']);
          return false;
        }
    }).catch(res =>{
      toast.error(res,"Error");
      router.navigate(['/login']);
      return false;
    })     
    // return this.auth.getLogueado();
  //return true;
};