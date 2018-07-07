import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../../Servicios/config.service';
import {PagerService} from '../../Servicios/pager.service';
import {DatabaseService} from '../../Servicios/database.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css'],
  providers:[]
})
export class ConfiguracionComponent implements OnInit {

  _strMensaje:string;
  _numProductos:number;
  _numCategorias:number;  
  TxtPrueba :string;

  Dias : any =[ {"id":"1","nombre":"Lunes"},{"id":"2","nombre":"Martes"},{"id":3,"nombre":"Miercoles"}];
  MyCombo:any;

  constructor(private _configService : ConfigService,
              private _db:DatabaseService) {
    
   }


  ngOnInit() {

    this._db.Open().then(()=>{
      this._db.getAll('producto').then((data)=>{
        this._numProductos = data.length    
       // console.log(data);    
      });

      this._db.getAll('categoria').then((data)=>{
        this._numCategorias = data.length;
       // console.log(data); 
      });
     
    });
  }

  LimpiarProductos(){
    this.LimpiarTabla('producto');
  }

  LimpiarCategorias(){
    this.LimpiarTabla('categoria');
  }

  private LimpiarTabla(strTableName:string){

    this._db.Open().then(()=>{
      this._db.clearTable(strTableName).then((response)=>{
        this._strMensaje="Se han borrado todos los datos de la tabla " + this._strMensaje;

        if(strTableName=="producto")
          this._numProductos = 0;
        else
          this._numCategorias=0;
      });
    });


  }

   private Establecer_Click():void{
    this.MyCombo=2;
  }

  private setIdCategoria():void{

      this._db.Open().then(()=>{
          this._db.getAll('producto').then((data)=>{

            for(let i=0;i<data.length;i++){
              data[i].id_categoria="1";
            }

            this._db.clearTable('producto').then((response)=>{
              this._db.Insert('producto',data).then((respuesta)=>{
                  console.log('Insertado Correctamente');
              });
            });
              
          });
      });
  }

  BorrarDB(){
    this._db.RemoveDB('FroizDB').then((data)=>{

        if(data) 
          console.log("La Base de datos ha sido eliminada correctamente");
        else
          console.log("Error, la base de datos no ha podido ser eliminada");

    });

  }

 

}