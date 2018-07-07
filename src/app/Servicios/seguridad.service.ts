import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import {AutentificacionService} from './autentificacion.service';

@Injectable()
export class SeguridadService implements CanActivate {

  constructor(private _router:Router,private _autentificacion:AutentificacionService) { }

  canActivate(){
    if(this._autentificacion.isAdmin()){
      return true;
    }else{
      this._router.navigate(['login']);
      return false;
    }
   
  }

  

}
