import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../../Servicios/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  constructor(private _db : DatabaseService) { }

  ngOnInit() {
  }
  
  onSubmit(value){
    console.log(value)
  }

  private enviar(){
    alert("Enviar");
  }
}
