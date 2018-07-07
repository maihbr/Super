import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exportar-firebase',
  templateUrl: './exportar-firebase.component.html',
  styleUrls: ['./exportar-firebase.component.css']
})
export class ExportarFirebaseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  private Exportar_Click(){
    alert("Iniciar Exportacion");
  }

}
