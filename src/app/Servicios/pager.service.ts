import { Injectable } from '@angular/core';
import {ConfigService} from './config.service';

@Injectable()
export class PagerService {

  private _intSizePage:number;	
  private _intNumPages:number =0;
  private _intCurrentPage:number =1;
  private _data=[];

  get SizePage():number{
      return this._intSizePage;
  }

  set SizePage(value:number){      
      this._intSizePage = value;     
      this.CalcularNumPaginas();
  }

  get TotalPages():number{      
      return this._intNumPages;
  }

  get CurrentPage():number{
      return this._intCurrentPage;
  }

  set DataSource(value:any){
      this._data = value;
     this.CalcularNumPaginas();
     
  }

  get DataSource():any{
      return this._data;
  }

  CalcularNumPaginas():void{
    this._intNumPages = Math.ceil(this._data.length/this._intSizePage);
  }

  constructor(private _configService : ConfigService) {
      this._intSizePage = this._configService.SizePage;
  }
  
  public getPage(pe_intPage:number){
      return new Promise((resolve,reject)=>{

        if(pe_intPage >this._intNumPages )
            this._intCurrentPage=this._intNumPages;
        else
            this._intCurrentPage = pe_intPage;
    
        let fin =this._intCurrentPage*this._intSizePage;
        let inicio=fin-this._intSizePage;
        resolve(this._data.slice(inicio,fin));

      });
  }

  public Debug():void{
    console.log("Pagina Actual :"+ this.CurrentPage);
    console.log("Tamaño Pagina :"+ this.SizePage);
    console.log("Total Paginas :"+ this.TotalPages);
    console.log(this.DataSource.length);
  }

}
