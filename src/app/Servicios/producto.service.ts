import { Injectable } from '@angular/core';
import {ConfigService} from './config.service';
import {DatabaseService} from './database.service';
import {PagerService} from './pager.service';
import {UtilesService} from './utiles.service';

@Injectable()
export class ProductoService {

  private _strTabla : string = "producto";


  constructor(private _config:ConfigService,private _db:DatabaseService,public _pager :PagerService) {    

      this._pager.SizePage = this._config.SizePage; 
  }

  public async ObtenerProductos(pe_intPagina:number=1){

    await this._db.Open();
    let vl_Productos =await this._db.getAll(this._strTabla);
    return this.Paginar(vl_Productos,pe_intPagina);

  }

  public async ObtenerProducto(pe_strIdProducto:string){

    await this._db.Open();
    return await this._db.getById(this._strTabla,pe_strIdProducto);
  }

  public async GuardarProducto(pe_producto:any){

    await this._db.Open();
    return await this._db.Insert(this._strTabla,pe_producto)

  }

  public async ActualizarProducto(pe_producto:any){

    await this._db.Open();
    return await this._db.Update(this._strTabla,pe_producto);
  }

  public async EliminarProducto(pe_strId:string){

    await this._db.Open();    
    return await this._db.Delete(this._strTabla,pe_strId);
  }

  public async ObtenerPagina(pe_intPagina:number){
    return await this._pager.getPage(pe_intPagina);
  }

  private async Paginar(pe_Productos:Array<any>,pe_intPagina:number){

    this._pager.DataSource=pe_Productos;    
    return await this._pager.getPage(pe_intPagina);
  }

  


}
