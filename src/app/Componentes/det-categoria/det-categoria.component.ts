import { Component, OnInit,Output,EventEmitter,ViewChild } from '@angular/core';
import {CategoriaService} from '../../Servicios/categoria.service';
import {UtilesService} from '../../Servicios/utiles.service';
import {ComfirmarComponent} from '../comfirmar/comfirmar.component';

@Component({
  selector: 'app-det-categoria',
  templateUrl: './det-categoria.component.html',
  styleUrls: ['./det-categoria.component.css']
})
export class DetCategoriaComponent implements OnInit {

@Output()
EventActualizarGrid =new EventEmitter<boolean>();

@ViewChild('comfirmar') Confirmar : ComfirmarComponent;

  Id:string;
  Nombre:string;
  TituloPanel: string = "Alta Categoría";
  public Mostrar:boolean=false;
  public Ocultar:boolean=true;
  public BtnVisible:boolean=true;
  public BtnOcultar:boolean=false;
  public TxtIdDisabled:boolean = false;
  

  constructor(private BLucUtiles:UtilesService, private BLucCategoria:CategoriaService) {}

  ngOnInit() { }

 private Guardar():void{
  
  let id:string=this.Id;
  let nombre:string = this.Nombre;
  let registro : {} = {id,nombre};

  
  if(!this.TxtIdDisabled){
      this.BLucCategoria.GuardarCategoria(registro).then(response=>{
          this.OcultarForm();   
             
      });
  }else{    

    this.BLucCategoria.ActualizarCategoria(registro).then(Response=>{
          this.OcultarForm();         
    });

  }

  this.EventActualizarGrid.emit(true);   

   
  }

 private Eliminar():void{
    this.Confirmar.Mensaje = "¿ Desea eliminar la categoría : " + this.Nombre + " ?";
    this.Confirmar.Abrir();
  }

 private Cancelar():void{
    this.MostrarForm(true,false,true);
  }

  
  public MostrarForm(pe_boolOcultarForm:boolean,pe_boolBtnEliminar:boolean,pe_boolDesactivarTxtId:boolean):void{
    
    if(pe_boolOcultarForm){
      this.Ocultar = pe_boolOcultarForm;
      this.Mostrar = !pe_boolOcultarForm;
    }else{
      this.Ocultar = pe_boolOcultarForm;
      this.Mostrar = !pe_boolOcultarForm;
    }

    this.Id="";
    this.Nombre="";
    
    this.TxtIdDisabled =pe_boolDesactivarTxtId;

    if(pe_boolBtnEliminar){
      this.BtnOcultar = pe_boolBtnEliminar;
      this.BtnVisible = !pe_boolBtnEliminar;
    }else{
      this.BtnVisible = !pe_boolBtnEliminar;
      this.BtnOcultar = pe_boolBtnEliminar;     
    }
    

  }

  private OcultarForm():void{
    this.Ocultar=true;
    this.Mostrar=false;
  }

 
public CargarDatos(categoria:any):void{   
    this.Id=categoria.id;
    this.Nombre = categoria.nombre;
 }

  public Aceptar_Confirmar(event):void{    

      this.BLucCategoria.EliminarCategoria(this.Id).then(response=>{
        this.OcultarForm();
        this.EventActualizarGrid.emit(true);
      });

  }

  public Cancelar_Confirmar(event):void{

    console.log("Cancelar Confirmar");
    console.log(event);
  }


}


