import { Component, OnInit, ViewChild } from '@angular/core';
import {ConfigService} from '../../Servicios/config.service';
import {DatabaseService} from '../../Servicios/database.service';

@Component({
  selector: 'app-importar',
  templateUrl: './importar.component.html',
  styleUrls: ['./importar.component.css']
})
export class ImportarComponent implements OnInit {

	_Mensaje:string = "Los datos ha sido importados correctamente";
	_OcultarMsg:boolean = true;
	_MostrarMsg:boolean = false;	

  constructor(private _config:ConfigService,private _db:DatabaseService) { }

  ngOnInit() { }

	
   importar(event){

	try {
		debugger;
		let file =event.target.files[0];
		
				if(/.json$/.test(file.name)){
		
					let reader = new FileReader();
					
					reader.onload=((item)=>{				
						return (e)=>{				
							let contenido = JSON.parse(e.target.result);				
							this._db.Open().then(()=>{
								
								for(let clave in contenido){
									this._db.Insert(clave,contenido[clave]).then((response)=>{
										this._Mensaje+=" La tabla " + clave + " ha sido importada correctamente";											
									});
								}
										
							},function(error){
								this._Mensaje="error,al exportar";
								this.MostrarMensaje(true);
							});
						}; 
				
					})(file);
				
					reader.readAsText(file);
					
					
		
				}else{
					this._MostrarMsg=true;
					this._Mensaje = "Error,el fichero no tiene una extensión valida";
					this._Mensaje
					
					//this.MostrarMensaje(true);
				}
		
	} catch (error) {
		this.MostrarMensaje(true);
	}

		


		
	}

	btnVolver_Click(){
		this.MostrarMensaje(false);
	}

	private MostrarMensaje(pe_boolMostrar:boolean=true):void{
		
		this._MostrarMsg = !pe_boolMostrar;
		this._OcultarMsg = pe_boolMostrar;	
		
	}

  
}
