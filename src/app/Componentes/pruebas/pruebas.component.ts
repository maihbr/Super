import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../../Servicios/database.service';
import {UtilesService} from '../../Servicios/utiles.service';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.css']
})
export class PruebasComponent implements OnInit {

  _Categorias : Array<any>;

  HtmlCboCategoria:any;

  constructor(private _db:DatabaseService,private _utiles:UtilesService) {
    
  
   }

  ngOnInit() {

    
    let vl_Utiles = new UtilesService();


    let vl_searchText=undefined;
    if(vl_Utiles.IsNullorEmpty(vl_searchText)){
      alert("Vacio");
    }else{
      alert("No esta vacio");
    }


    this._db.Open().then(()=>{

        this._db.getAll('categoria').then(data=>{
            this._Categorias = data;     
            this.HtmlCboCategoria=data[1];
        });

        //let data={"low":"froiz","upper":"Froiz"+'\uffff'};
        let data={"low":"Froiz","upper":"froiz"};
        this._db.Search('producto','nombre',data).then(data=>{
            console.log(data);
        });
    });
     
  }

  private onScroll(event){
    let element = event.srcElement;
    if(element.scrollHeight-element.scrollTop==element.clientHeight){
      console.log("Fin scroll....")
    }    
  }

  onSubmitAlta(value:any){
    console.log(value);
  }

  Autopostback(Event){
    console.log(Event);
  }

  btnActualizarCate_Click(){
   /* let categoria={id: "1", nombre: "Alimentación"};  
    this._db.Open().then(()=>{
      this._db.getAll('producto').then((data)=>{
        
        data.forEach(item => {
            item.id_categoria=categoria;
            this._db.Update('producto',item).then(()=>{

            });
        });

       

      });
    });*/
  }

  btnAddFresco_Click(){

    this._db.Open().then(()=>{
      this._db.getAll('producto').then((data)=>{
        
        data.forEach(item => {
            item.fresco=false
            this._db.Update('producto',item).then(()=>{
            });
        });
      });
    });

  }

}
