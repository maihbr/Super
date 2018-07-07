import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../../Servicios/config.service';
import {DatabaseService} from '../../Servicios/database.service';
import {UtilesService} from '../../Servicios/utiles.service';
import {StorageService} from '../../Servicios/storage.service';
import {Router}	from	'@angular/router';


@Component({
  selector: 'app-lispedidos',
  templateUrl: './lispedidos.component.html',
  styleUrls: ['./lispedidos.component.css']
})
export class LispedidosComponent implements OnInit {

  private _Router : Router;
  private _Pedidos:Array<any>;
  private _Utiles : UtilesService;
  private _Storage:StorageService;
  private Htmlfeinicio;
  private Htmlfefin;
  private HtmlIdPedido;
  private HtmlFepedido;

  private _ccsMostrar = true;
  private _cssOcultar = false;
  private _cssMostrarGv = true;
  private _cssOcultarGv = false;

  constructor(private _utiles : UtilesService, private _router:Router,
              private _config:ConfigService,private _db:DatabaseService,private _storage:StorageService) { 

   this._Utiles = _utiles;
   this._Router = _router;      
   this._Storage =_storage;
  }

  ngOnInit() {

     let vl_datHoy     = this._Utiles.ToDay();         
     this.Htmlfeinicio = this._Utiles.ToString(this._Utiles.FirstDayMonth(vl_datHoy.getMonth(),vl_datHoy.getFullYear()));
     this.Htmlfefin    = vl_datHoy.toISOString().slice(0,10);
    
    this._db.Open().then(()=>{
      this.CargarDatos(this.Htmlfeinicio,this.Htmlfefin);
    });
  }

  //Envio del formulario de búsqueda
  onSubmit(value:any){    
  
    let vl_datFeinicio : Date = this._Utiles.ToDateTime(value.Htmlfeinicio);
    let vl_datFefin : Date = this._Utiles.ToDateTime(value.Htmlfefin);

    if(this.Validar(vl_datFeinicio,vl_datFefin)){   
      this.CargarDatos(value.Htmlfeinicio,value.Htmlfefin);
    }else{
      alert("Error de validacion");
    }
    
  }

  //Envio del formulario de alta.
  onSubmitAlta(value:any):void{

   
   if(!this._Utiles.IsNullorEmpty(value.HtmlIdPedido)){
     
      var vl_Pedido = this.getEntidadPedido();
      vl_Pedido.fecha = value.HtmlFepedido;
      vl_Pedido.idPedido = value.HtmlIdPedido;      
      vl_Pedido.idPedido = value.HtmlIdPedido;      
        this._Storage.Add("PedidoSelect",vl_Pedido,"1m");
        this._Router.navigate(['/pedidos']);           
    }else{
      alert("Debe completar los datos obligatorios");
    }

  }

  
  BtnNuevo_Click(){
   
   this.MostrarLocalizador(false);
   let vl_datHoy:Date = this._Utiles.ToDay();
   this.HtmlFepedido = vl_datHoy.toISOString().slice(0,10);
   this.HtmlIdPedido = vl_datHoy.getTime();
  }

  BtnCancelar_Click(){
    this.MostrarLocalizador(true);
  }

  EditPedido_Click(event){
  
    this._Storage.Add("PedidoSelect",event,"10m");
    this._Router.navigate(['/pedidos']);
  }
 

  private CargarDatos(pe_strFeinicio:string,pe_strFefin:string):void{

    let vl_datos={'low': pe_strFeinicio,'upper':pe_strFefin};   
        
    this._db.Search('pedido','fecha',vl_datos).then(data=>{        
      if(data.length > 0){       
        this._Pedidos = data;
        this.MostrarGridView(true);
      }else{
        this.MostrarGridView(false);
      }
    });

  }
 
  private Validar(pe_datFecha1:Date,pe_datFecha2:Date):boolean{

      let vl_boolSalida = false;
      if(pe_datFecha2.getTime() >=pe_datFecha1.getTime()){
         vl_boolSalida = true;
       }
      
      return vl_boolSalida;
  }

  private getEntidadPedido():any{
    return {"cantidad":0,"idPedido":0,"fecha":null,"importe":0,productos:[]};
  }

  private MostrarLocalizador(pe_boolMostrar:boolean):void{
    this._ccsMostrar = pe_boolMostrar;
    this._cssOcultar = !pe_boolMostrar;
  }

  private MostrarGridView(pe_boolMostrar:boolean):void{
    this._cssMostrarGv = pe_boolMostrar;
    this._cssOcultarGv = !pe_boolMostrar;
  }

}
