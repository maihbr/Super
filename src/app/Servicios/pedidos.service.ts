import { Injectable } from '@angular/core';
import {ConfigService} from './config.service';
import {DatabaseService} from './database.service';
import { inherits } from 'util';

@Injectable()
export class PedidosService {

  private _strTabla = "pedidos";

  constructor(private _config:ConfigService,private _db:DatabaseService) { }

  public async ObtenerPedidos(){
    await this._db.Open();       
    await this._db.getAll(this._strTabla);   
  }

  public async ObtenerPedido(pe_strId:string){
      await this._db.Open();       
      return await this._db.getById(this._strTabla,pe_strId)
  }

  public async BuscarPedido(){
     await this._db.Open();    
  }

  public async GuardarPedido(pe_pedido:any){
      await this._db.Open();
      return await this._db.Insert(this._strTabla,pe_pedido);
  }

  public async ActualizarPedido(pe_pedido:any){
      await this._db.Open();
      return await this._db.Update(this._strTabla,pe_pedido);
  }

  public async EliminarPedido(pe_strId:string){
      await this._db.Open();    
      return await this._db.Delete(this._strTabla,pe_strId);
  }



}
