import { Component, OnInit,Output,EventEmitter,ViewChild } from '@angular/core';

import {DatabaseService} from '../../Servicios/database.service';
import {ComfirmarComponent} from '../comfirmar/comfirmar.component';
import { Utils } from 'ngx-bootstrap';
import { UtilesService } from '../../Servicios/utiles.service';
import { isUndefined, isNumber } from 'util';

@Component({
  selector: 'app-det-producto',
  templateUrl: './det-producto.component.html',
  styleUrls: ['./det-producto.component.css'],
  
})
export class DetProductoComponent implements OnInit {

  @Output()
  EventActualizarGrid = new EventEmitter<boolean>();

  @ViewChild('comfirmar') Confirmar : ComfirmarComponent;

  private HtmlTxtId:string;
  private HtmlTxtNombre:string;
  private HtmlCboCategoria:string = "-1";
  private HtmlTxtIva:string;
  private HtmlTxtPvp:string;
  private HtmlchkFreco:boolean = false;

  private _Categorias;
  private _CatSelected;
  private _ProductoSelect={};
  private _esAlta : boolean = true;


  private _cssMostar:boolean = false;
  private _cssOcultar:boolean = true;
  private _cssOcultarBtnEliminar = false;
  private _cssMostrarBtnEliminar = true;
  private _cssActivarHtmlTxtId = false;

  private _TituloPanel:string = "Alta Producto";

  constructor(private _db:DatabaseService,public _utiles:UtilesService) {

   }

  ngOnInit() {   
   
    
  }

  private onSubmit(value:any){
         
      this._ProductoSelect['id'] = this.HtmlTxtId;
      this._ProductoSelect['nombre'] = this.HtmlTxtNombre;
      this._ProductoSelect['iva'] = this.HtmlTxtIva;
      this._ProductoSelect['pvp'] = this.HtmlTxtPvp;
      this._ProductoSelect['id_categoria']=this._CatSelected
      this._ProductoSelect['fresco'] = this.HtmlchkFreco;
      

      if(this._esAlta){

        this._db.Insert('producto',this._ProductoSelect).then((response)=>{
            
        });

      }else{
        
        this._db.Update('producto',this._ProductoSelect).then((response)=>{
         
        });

      }
     
      this.EventActualizarGrid.emit(true);
      this.Cancelar_Click();
  }

  private Eliminar_Click(){
      this.Confirmar.Mensaje="¿Desea eliminar el producto " + this._ProductoSelect['nombre'] + " ?";
      this.Confirmar.Abrir();

  }

  private Cancelar_Click(){
    this._cssMostar = false;
    this._cssOcultar = true;
    this.EventActualizarGrid.emit(false);
  }


  byCategoria(item1,item2):boolean{
           
    if(!isUndefined(item1) && !isUndefined(item2)){
      return item1.id==item2.id;
    }else{
      return false;
    }
     
  }

   private CargarProducto(pe_strIdProducto:string):void{

    this._db.Open().then(()=>{

      this._db.getById('producto',pe_strIdProducto).then((data)=>{
                
        this._ProductoSelect = data;     
        this.HtmlTxtId = data['id'];
        this.HtmlTxtNombre = data['nombre'];
        this._CatSelected = data['id_categoria'];        
        this.HtmlTxtIva = data['iva'];
        this.HtmlTxtPvp = data['pvp'];      

        if(data.hasOwnProperty('fresco')){
          this._ProductoSelect['fresco']=data['fresco'];
          this.HtmlchkFreco = data['fresco'];
        }else{
          this._ProductoSelect['fresco']=false;
          this.HtmlchkFreco = false;
        }

      });

    });

  }

  private CargarCategorias():void{
    this._db.Open().then(()=>{
      this._db.getAll('categoria').then((data)=>{
        this._Categorias = data;                
      });
    });
  }


public Aceptar_Confirmar(event):void{
  let pe_strIdProducto:string = this.HtmlTxtId;

      this._db.Delete('producto',pe_strIdProducto).then((response)=>{
        this.EventActualizarGrid.emit(true);
        this.Cancelar_Click();    
      });
}

public Cancelar_Confirmar(event):void{
 
}

public MostrarFormulario(pe_strIdProducto:string=null){
  
        this._cssMostar = true;
        this._cssOcultar = false;
        
  
        if(pe_strIdProducto==null){
          console.log("Es una alta....");
          this._esAlta=true;
          this._cssOcultarBtnEliminar = true;
          this._cssActivarHtmlTxtId = false;
          this._TituloPanel = "Alta Producto";
  
          this.HtmlTxtId = "";
          this.HtmlTxtIva="";
          this.HtmlTxtNombre = "";
          this.HtmlTxtPvp = "";
          this.HtmlCboCategoria="";
          this.CargarCategorias();
  
        }else{
          //Es una modificacion (Cargamos el detalle del producto)
          this.CargarProducto(pe_strIdProducto);
          this.CargarCategorias();   
          this._esAlta = false;
          this._cssMostrarBtnEliminar = true;
          this._cssOcultarBtnEliminar = false;
          this._cssActivarHtmlTxtId = true;
          this._TituloPanel = "Modificar Producto";
         
  
        }
  
    }
  
  

}
