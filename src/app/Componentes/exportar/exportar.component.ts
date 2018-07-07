import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../../Servicios/config.service';
import {DatabaseService} from '../../Servicios/database.service';

@Component({
  selector: 'app-exportar',
  templateUrl: './exportar.component.html',
  styleUrls: ['./exportar.component.css']
})
export class ExportarComponent implements OnInit {

 _nombreFichero : string;
 _MensajeInfo : string;
 _cssAlert : string;
 _MostrarMsg : boolean = false;
 _OcultarMsg : boolean =true;

  constructor(private _config:ConfigService,private _db:DatabaseService) { }
  

  ngOnInit() {
  }

  exportar(){   
     
    this._db.Open().then(()=>{
      this.ObtenerDatos(this._db.listTables()).then((data)=>{
        let vl_fecha:string = new Date().toISOString().slice(0,10);
        let vl_strNombreFichero:string = `${vl_fecha}_froiz.json`;
        this.DescargarFichero(data,vl_strNombreFichero);
        this.MostrarMensaje(true);
      });
    });
    
  }

  private async ObtenerDatos(pe_LstTablas:any){

    let vl_retorno={};
    let vl_strTabla:string;
   for(let i=0;i<pe_LstTablas.length;i++){
     vl_strTabla = pe_LstTablas[i];
     await this._db.getAll(vl_strTabla).then((data)=>{
        vl_retorno[vl_strTabla]=[];
        vl_retorno[vl_strTabla]=data;
     });
   }
    return vl_retorno;
  }

  private DescargarFichero(pe_datos:any,pe_strNombreFichero:string){
      let vl_strContenido = JSON.stringify(pe_datos);
      let a = document.createElement("a");				
      let vl_fichero = new Blob([vl_strContenido],{type:"application/json"});			                           
      a.href=URL.createObjectURL(vl_fichero);
      a.download=pe_strNombreFichero;
      a.click();
      
  }
  
   
  private MostrarMensaje(pe_boolMostrar:boolean):void{

    this._MostrarMsg = pe_boolMostrar;
    this._OcultarMsg = !pe_boolMostrar;
    this._cssAlert =  'info';
    this._MensajeInfo = 'La exportación ha finalizado correctamente';


  }
  

  
}
