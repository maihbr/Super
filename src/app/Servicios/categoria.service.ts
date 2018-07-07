import { Injectable, OnInit } from '@angular/core';
import {ConfigService} from './config.service';
import {DatabaseService} from './database.service';
import { inherits } from 'util';

@Injectable()
export class CategoriaService {

  private _strTabla : string = "categoria";


  constructor(private _config:ConfigService,private _db:DatabaseService) {    

   
  }

  
  public async ObtenerCategorias(){                 
        await this._db.Open();       
        return await this._db.getAll(this._strTabla);                     
   }


   public async GuardarCategoria(pe_categoria:any){

          await this._db.Open();
          return await this._db.Insert(this._strTabla,pe_categoria);
   }

   public async ActualizarCategoria(pe_categoria:any){

        await this._db.Open();
        return await this._db.Update(this._strTabla,pe_categoria);
  }

    public async EliminarCategoria(pe_strId:string){

      await this._db.Open();    
      return await this._db.Delete(this._strTabla,pe_strId);
                    
    }


}
