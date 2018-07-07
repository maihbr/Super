import { Injectable } from '@angular/core';
import {ConfigService} from  './config.service';
import {DatabaseService} from './database.service';
import {UtilesService} from './utiles.service';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class CestaService {

 private _Carro=[];
 private _db:DatabaseService;
 private _utiles:UtilesService;
 private _Cambio = new Subject<void>();
 public  _Cambio$ = this._Cambio.asObservable();
  
  constructor(private pe_db:DatabaseService,private pe_utiles:UtilesService) {
    this._utiles = pe_utiles;
  }


  public Guardar(pe_item:any,pe_strCantidad:string):void{
           
    let vl_strIdProducto:string=pe_item['id'];
    let vl_intPosicion = this.ExisteProducto(vl_strIdProducto);
    let vl_intCantidad:number=parseInt(pe_strCantidad);

    if(vl_intPosicion!=-1){
      this.ActualiarCantidad(vl_intPosicion,vl_intCantidad);
    }else{
      pe_item['cantidad']=vl_intCantidad;
      this._Carro.push(pe_item);          
    }

  }

  public Quitar(pe_strIdProducto:string){

    let vl_intPosicion = this.ExisteProducto(pe_strIdProducto);
    if(vl_intPosicion!=-1){

      let vl_item = this._Carro[vl_intPosicion];
      this._Carro = this._Carro.filter(obj=>obj!==vl_item);

    }

  }

  public Vaciar():void{
    this._Carro=[];
  }

  public ObtenerCesta():Array<any>{
    return this._Carro;
  }

  public Comprar(){

    return new Promise((resolve,reject)=>{   

      this._db.Open().then(()=>{
        this._db.Insert('pedido',this._Carro).then(data=>{
          resolve(1);
        });
      });

    });

  }

  public ObtenerNumProductos():number{
    
    return this._Carro.length;
  }

  public ObtenerImporte():number{
     
    let vl_Salida : number=0;

    if(!this._utiles.IsEmpty(this._Carro)){

      this._Carro.forEach(element => {
        vl_Salida+=(element.cantidad * element.pvp);
      });

    }

    return vl_Salida;

  }

  public CargarCesta(pe_Carro:Array<any>):void{
    this._Carro = pe_Carro;
  }

  /*Comprueba si existe un producto en la cesta. Si existe retorna la posicion.*/
  private ExisteProducto(pe_strId:string):number{

    let vl_intSalida = -1;

    if(!this._utiles.IsEmpty(this._Carro)){
      vl_intSalida = this._Carro.findIndex(item=>item['id']===pe_strId);     
    }

    return vl_intSalida;

  }

  private ActualiarCantidad(pe_intIdRowIndex:number,pe_intCantidad:number):void{

    this._Carro[pe_intIdRowIndex].cantidad=pe_intCantidad;

  }

  
}
