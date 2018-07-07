import { Component, OnInit,ViewChild } from '@angular/core';
import { DetProductoComponent } from '../det-producto/det-producto.component';
import {ProductoService} from '../../Servicios/producto.service';
import {UtilesService} from '../../Servicios/utiles.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers:[]
})
export class ProductosComponent implements OnInit {

    @ViewChild(DetProductoComponent) _detalle : DetProductoComponent;

 _productos:any;
 _categorias:any;
 _MostrarListado:boolean=true;
 _TotalPaginas : Array<number>;
  IdProducto:string;
  IdCategoria:string="-1";
  TxtProducto:string;

  HtmlTxtProducto:string;

  constructor(private BLucProducto:ProductoService,BLucUtiles:UtilesService) {

  }

  ngOnInit() {
        
    this.BLucProducto.ObtenerProductos().then(data=>{
         this._TotalPaginas = Array(this.BLucProducto._pager.TotalPages).fill(0).map((x,i)=>i+1); 
         this._productos = data;           
    });
    
  }


  private onSubmit(value){
        
      /*let vl_arrDatos=Array<any>();
      if(!this.IsEmpty(value.IdProducto)){       
          this._db.getById('producto',value.IdProducto).then((data)=>{           
            vl_arrDatos.push(data);  
            this.CargarDataGrid(vl_arrDatos);                        
          });
      }else if(!this.IsEmpty(value.HtmlTxtProducto)){                 
          let vl_parametros = {'low':value.TxtProducto,'upper':value.TxtProducto+'\uffff'};
          this._db.Search('producto','nombre',vl_parametros).then(data=>{
            this.CargarDataGrid(data);        
           });
      }*/
      

  }

 
  private cambio(item){    
     this.IdCategoria= item.srcElement.value;    
  }

  private EditRow_Click(pe_strIdProducto:string){
    this._MostrarListado = false;
    this._detalle.MostrarFormulario(pe_strIdProducto);
  }

  private MostarFormulario(){
    this._MostrarListado = false;
    this._detalle.MostrarFormulario();
  }

  ActualizarGrid(event){

    this._MostrarListado = true;    
   
    this.BLucProducto.ObtenerProductos().then(data=>{
      this._TotalPaginas = Array(this.BLucProducto._pager.TotalPages).fill(0).map((x,i)=>i+1); 
      this._productos = data;        
    });

  }

  Click_Pagination(event){    
    let paginas = document.getElementById('paginacion').querySelectorAll('li');
    for(let i=0;i<paginas.length;i++){
      paginas[i].className='';
    }

    let vl_intNuevaPagina = parseInt(event.srcElement.innerText);
    event.srcElement.parentElement.className='active';
    
    this.BLucProducto.ObtenerPagina(vl_intNuevaPagina).then(data=>{
      this._productos =data;
    });

  }
  

}
