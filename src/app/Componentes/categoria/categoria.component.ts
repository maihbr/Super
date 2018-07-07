import { Component, OnInit,ViewChild } from '@angular/core';
import { DetCategoriaComponent } from '../det-categoria/det-categoria.component';
import {CategoriaService} from '../../Servicios/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html', 
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  @ViewChild(DetCategoriaComponent) detalle : DetCategoriaComponent;
   _categorias:Array<any>;
  
  constructor(public _BLucCategoria: CategoriaService) { }


  ngOnInit() {

    this.CargarGrid();
   
  }

  MostrarFormAlta(){
    this.detalle.MostrarForm(false,true,false);       
  }


  RowEdit_Click(categoria:any){
    this.detalle.TituloPanel = "Detalle Categoría";
    this.detalle.MostrarForm(false,false,true);    
    this.detalle.CargarDatos(categoria);

  }

  public ActualizarGrid(event){
    this.CargarGrid();
  }

  CargarGrid(){            
    this._BLucCategoria.ObtenerCategorias().then((data)=>{
      this._categorias = data;        
    });
  }

}
