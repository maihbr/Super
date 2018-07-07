import { Component, OnInit,Output,Input,EventEmitter,ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-comfirmar',
  templateUrl: './comfirmar.component.html',
  styleUrls: ['./comfirmar.component.css']
})
export class ComfirmarComponent implements OnInit {

  /*Referencia al control hijo*/
  @ViewChild('childModal') modal:ModalDirective;
  
  /*Manejador de eventos de los botones (Aceptar y Cancelar)*/
  @Output() onAceptar =new EventEmitter<boolean>();
  @Output() onCancelar = new EventEmitter<boolean>();


  /*Datos de entrada*/
  @Input() Mensaje : string;
    
  constructor() { 

    
  }

  ngOnInit() {}

 
  public Abrir(){
    this.modal.show();    
  }

  public BtnAcetar_Click(){       
    this.onAceptar.emit(true);
    this.modal.hide();    
  }

  public BtnCancelar_Click(){    
    this.onCancelar.emit(false);
    this.modal.hide();  
  }


}
