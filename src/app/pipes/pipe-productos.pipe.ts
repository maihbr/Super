import { Pipe, PipeTransform } from '@angular/core';
import {UtilesService} from '../Servicios/utiles.service';
import { isNumber } from 'util';
@Pipe({
  name: 'pipeProductos'
})
export class PipeProductosPipe implements PipeTransform {

  private _utiles:UtilesService;

  constructor(private utiles:UtilesService){
    this._utiles =utiles;
  }
  
  transform(vl_productos:Array<any>, vl_searchText:string): Array<any> {
        
   if(this._utiles.IsNullorEmpty(vl_searchText) || this._utiles.IsEmpty(vl_productos)){
        return vl_productos;
    }else{

      return vl_productos.filter((item,index,array)=>{        
        if(this._utiles.isDigt(vl_searchText)){         
          return item.id.indexOf(vl_searchText.toLocaleLowerCase())>-1?true:false;       
        }else{
          return item.nombre.toLocaleLowerCase().indexOf(vl_searchText.toLocaleLowerCase())>-1?true:false;       
        }
        
      });

    }

    
   
    
   
  }

}
