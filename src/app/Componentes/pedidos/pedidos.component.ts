import {Component,OnInit,Input,Output,EventEmitter,ViewChild} from '@angular/core';
import {Router}	from	'@angular/router';
import {StorageService} from '../../Servicios/storage.service';
import {UtilesService} from '../../Servicios/utiles.service';
import {DatabaseService} from '../../Servicios/database.service';
import {ComfirmarComponent} from '../comfirmar/comfirmar.component';
import {FormModalComponent} from '../form-modal/form-modal.component';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  @ViewChild (ComfirmarComponent) confirmar : ComfirmarComponent;
  @ViewChild (FormModalComponent) formulario: FormModalComponent;
  @Input() Pedido : any;

  _Productos=Array<any>();
  _MostrarTabla : boolean = true;
  _OcultarTabla : boolean = false;
  _MostrarMsg : boolean=true;
  _OcultarMsg : boolean=false;
  _ImporteTotal : number=0;
  _NumProductos :number=0;
  _FechaPedido:string=new Date().toISOString().slice(0,10);

  _Router : Router;
  _Storage:StorageService;
  _Utiles:UtilesService;

  HtmlTxtIdPedido:string;
  HtmlTxtFecha:string;
  _idPedidoSelect:string;


  constructor(private _router:Router,
    private _db:DatabaseService,
    private _storage:StorageService,
    private _utiles:UtilesService) {

      this._Router = _router;
      this._Storage =_storage;
      this._Utiles = _utiles;
   }

  ngOnInit() {        
    this.CargarDatos();
  }

  private CargarDatos():void{
     
    let vl_pedidoSelect = this._Storage.Get("PedidoSelect");   
    this._idPedidoSelect = vl_pedidoSelect.data.idPedido;    
    this._Productos =vl_pedidoSelect.data.productos;
    this._ImporteTotal = vl_pedidoSelect.data.importe;
    this.HtmlTxtIdPedido = vl_pedidoSelect.data.idPedido;
    this.HtmlTxtFecha = vl_pedidoSelect.data.fecha;
    this._Storage.Delete('PedidoSelect');

    console.log(this.CestaVacia());

    if(this.CestaVacia()){
      this._OcultarTabla = true;
      this._OcultarMsg = false;
    }else{
      this._OcultarTabla=false;
      this._OcultarMsg = true;
    }
        
  }

  private editDetalle(item):void{          
    this.formulario.Cabecera="Modificar Pedido";
    this.formulario.Data=this._Productos;   
    this.formulario.Abrir("Editar");
  }

  private AgregarProducto_Click(){   
    this.formulario.Cabecera="Añadir Productos";   
    this.formulario.Data=this._Productos;
    this.formulario.Abrir("Agregar");
  }

  private CestaVacia():boolean{
    return (this._Productos.length==0)?true:false;
  }

  private CalcularTotales():void{

    this._ImporteTotal=0;
    this._NumProductos=0;
    this._Productos.forEach(element=>{
      this._NumProductos+=element['cantidad'];
      this._ImporteTotal+=(element['cantidad'] * element['pvp']);      
    });

  }


  public ConfirmarCancelar($event):void{
    
  }
    
  public ConfirmarAceptar($event){
    this._Productos = this.formulario.Retorno;
    if(this.CestaVacia()){
      this._OcultarTabla = true;
      this._OcultarMsg = false;
      this._ImporteTotal=0;
      this._NumProductos=0;
    }else{
      this._OcultarTabla=false;
      this._OcultarMsg = true;
      this.CalcularTotales();
    }
    
  }


  BtnGuardaPedido_Click(){    


    let vl_Pedido:any={};
    vl_Pedido.productos=this._Productos;
    vl_Pedido.cantidad = this._NumProductos;
    vl_Pedido.importe = this._ImporteTotal;

    if(this._Utiles.IsNullorEmpty(this.HtmlTxtIdPedido)){
      vl_Pedido.idPedido =this._FechaPedido.replace('-','');    
      vl_Pedido.fecha = this._FechaPedido;
      this._db.Insert('pedido',vl_Pedido).then((data)=>{
          alert("Pedido Creado");
      });
      
    }else{
      vl_Pedido.idPedido =this.HtmlTxtIdPedido;
      vl_Pedido.fecha = this.HtmlTxtFecha;
      this._db.Update('pedido',vl_Pedido).then(data=>{
          alert("Pedido Guardado");
      });
    }
   
    

  }

  BtnCancelar_Click(){
    this._Router.navigate(['/lispedidos']);
  }

  BtnEliminarPedido_Click(){   
    this._db.Delete('pedido',this._idPedidoSelect).then((data)=>{
      this._Router.navigate(['/lispedidos']);
    });
  }

}
