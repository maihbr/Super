import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable()
export class AutentificacionService {

  constructor(private _config:ConfigService) { }


  public isAdmin():boolean{
    return false;
  }

  private esAdmin(pe_strUserName:string,pe_strPassword:string):boolean{
    
       let vl_return:boolean=false;
       if(this._config.Credenciales.username===pe_strUserName && 
           this._config.Credenciales.password===pe_strPassword){
 
         vl_return = true;
       }
 
       return vl_return;
 
   }

}
