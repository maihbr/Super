import { Component,TemplateRef } from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-confirmar-v2',
  templateUrl: './confirmar-v2.component.html',
  styleUrls: ['./confirmar-v2.component.css']
})
export class ConfirmarV2Component{

  modalRef:BsModalRef;
  mensaje:string;
  constructor(private modalService:BsModalService) {}

  abrirModal(template:TemplateRef<any>){
    this.modalRef=this.modalService.show(template);
  }

  Aceptar():void{
    this.modalRef.hide();
  }

  Cancelar():void{
    this.modalRef.hide();
  }

}
