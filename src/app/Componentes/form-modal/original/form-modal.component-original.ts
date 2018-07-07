import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal'
import { DatabaseService } from '../../../Servicios/database.service';
import { UtilesService } from '../../../Servicios/utiles.service';
import { CestaService } from '../../../Servicios/cesta.service';


@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css']
})
export class FormModalComponent {

  @ViewChild('childModal') modal: ModalDirective;
  @Output() onAceptar = new EventEmitter<boolean>();
  @Output() onCancelar = new EventEmitter<boolean>();
  Mensaje: string;
  @Input() Cabecera: string;
  @Input() Data: any;
  @Output() Retorno: Array<any>;

  _Utiles: UtilesService;
  _Categorias: Array<any>;
  _Productos: Array<any>;
  _Cesta: Array<any>;
  _NumProductos: number = 0;
  HtmlCboCategoria: string = "1";
  HtmlNumCantidad: string = "0";
  HtmlProducto: string;

  _CestaService: CestaService;

  constructor(private _db: DatabaseService, private _utiles: UtilesService, private _cesta: CestaService) {
    this._Utiles = _utiles;
    this._CestaService = _cesta;
  }

  InicializarCboCategoria() {

    this._db.Open().then(() => {
      this.ObtenerCategorias();
    });

  }

  onSubmit(value: any) {

    this.ObtenerProductosSeleccionados();

    this.onAceptar.emit(true);
    this.modal.hide();

  }

  onShowCart_Click() {
    this.HtmlProducto = "";
    this._Productos = this._Cesta;
    this.HtmlCboCategoria = "-1";
  }

  onInput(e) {
    let vl_intId = e.srcElement.dataset["id"];
    let vl_intCantidad = e.srcElement.value;
    this._db.getById('producto', vl_intId).then(data => {   
      
      let vl_pvp:number=data.pvp;
      let vl_iva:number=data.iva;
      let vl_fresco:boolean = data.fresco;
      
      let vl_decImporte = this.calcularImporte(vl_intCantidad,vl_pvp,vl_iva,0,vl_fresco);
      console.log(vl_decImporte);
      data['nombre']=vl_decImporte;
      console.log(data);
     
     
      this._CestaService.Guardar(data, vl_intCantidad);
    });

  }

  public Abrir(pe_strModo: string) {

    this.InicializarCboCategoria();
    if (!this._Utiles.IsEmpty(this.Data)) {
      this._Cesta = this.Data;
      this._NumProductos = this.Data.length;
    }

    if (pe_strModo == "Agregar") {
      this.HtmlCboCategoria = "1";
      this.BuscarProductos(this.HtmlCboCategoria);
    } else {
      this._Productos = this.Data;
    }

    this.modal.show();

  }


  public BtnCancelar_Click(): void {
    this.onCancelar.emit(false);
    this.modal.hide();
  }




  private BtnBuscar_Click() {

    console.log(this.HtmlCboCategoria);
    if (this.HtmlCboCategoria !== undefined) {
      this.ObtenerProductosSeleccionados();
      this.BuscarProductos(this.HtmlCboCategoria);
    }
  }


  private ObtenerCategorias(): void {

    this._db.getAll('categoria').then((data) => {
      data.unshift({ "id": "-1", "nombre": "Seleccione una categoría" });
      this._Categorias = data;
    });

  }

  private BuscarProductos(pe_strCategoria: string) {

    this._db.getAll('producto').then((data) => {

      this._Productos = data.filter((item, index, array) => {
        item['importe']='0.00';
        return item['id_categoria'].id === pe_strCategoria;
      });

      this._Productos.forEach(element => {
        element['cantidad'] = 0;
      });

    });

  }


  private ObtenerProductosSeleccionados(): void {


    let ProductosSelect = this._Productos.filter((item, index, array) => {
      return item['cantidad'] > 0;
    });


    if (this._Utiles.IsEmpty(this.Retorno)) {
      this.Retorno = ProductosSelect;
    } else {

      ProductosSelect.forEach(itemSeleccionado => {
        let vl_boolEncontrado: boolean = false;
        for (let i = 0; i < this.Retorno.length; i++) {
          if (JSON.stringify(itemSeleccionado) == JSON.stringify(this.Retorno[i])) {
            vl_boolEncontrado = true;
            break;
          }
        }
        if (!vl_boolEncontrado) {
          this.Retorno.push(itemSeleccionado);
        }
      });
    }

    this.Retorno = this.Retorno.filter((item, index, array) => {
      return item['cantidad'] > 0;
    });

    this._Productos = this.Retorno;

    /*Hay que quitar de this.Retorno los que tengan la cantidad==0*/
    /*Cuando se modifica una cantidad desde el modal tambien se qcambia en el listado. La Opcion mas
    facil es tener un boton aceptar, porque si hay un cancelar seria mas complicado */
  }

  private calcularImporte(pe_cantidad,pe_pvp,pe_iva,pe_dcto,pe_fresco=false){

    let vl_decSalida =0;

     let vl_cantidad = parseFloat(pe_cantidad.toString().replace(',','.'));
     let vl_pvp      = parseFloat(pe_pvp.toString().replace(',','.'));
     let vl_iva  	 = parseFloat(pe_iva.toString().replace(',','.'));
     let vl_dcto 	 = parseFloat(pe_dcto.toString().replace(',','.'));
    
    
    if(!pe_fresco){
      vl_decSalida = (vl_cantidad * vl_pvp); //- ((vl_cantidad * vl_pvp) * (pe_dcto/100))
    }else{
      vl_decSalida = ((vl_cantidad/1000) * vl_pvp);
    }


    /*Aplicamos el descuento si es necesario*/

    if(vl_dcto > 0){
      vl_decSalida = vl_decSalida - (vl_decSalida * (pe_dcto/100));
    }

    /*Calculamos el iva si es necesario*/
    
    if(pe_iva > 0){
      vl_decSalida = vl_decSalida + ((vl_decSalida) * (vl_iva/100));
    }

                
     return vl_decSalida.toFixed(2);
}

  
}
