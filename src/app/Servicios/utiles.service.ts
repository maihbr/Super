import { Injectable } from '@angular/core';

@Injectable()
export class UtilesService {

  constructor() { }

  public ToDay():Date{
    return new Date();
  }

  public FirstDayMonth(pe_intMonth:number,pe_intYear:number):Date{
    let vl_datRetorno = new Date(pe_intYear,pe_intMonth,1);       
    return vl_datRetorno;
  }

  public LastDayMonth(pe_intMonth:number,pe_intYear:number):Date{
    return new Date(pe_intYear,pe_intMonth-1,1);
    
  }

  public CompareTo(pe_dat1:Date,pe_dat2:Date):number{
    
    let vl_intSalida:number =1;

    if(pe_dat1.getTime() < pe_dat2.getTime()){
      vl_intSalida = -1;
    }else if(pe_dat1.getTime() == pe_dat2.getTime()){
      vl_intSalida =0;
    }

    return vl_intSalida;
  }

  public ToDateTime(pe_strFecha:string):Date{
    return new Date(pe_strFecha);
  }

  public IsNullorEmpty(pe_strTexto:string):boolean{

      let vl_boolSalida:boolean = false;
      if(pe_strTexto==null || pe_strTexto==undefined){
        vl_boolSalida = true;
      }else if(pe_strTexto.toString().trim().length==0){
        vl_boolSalida=true;
      }

      return vl_boolSalida;
      
  }

  ToString(pe_datFecha:Date):string{

    let vl_strSalida = pe_datFecha.getFullYear().toString() + '-';
    
    if(pe_datFecha.getMonth() < 9)
      vl_strSalida+="0"+(pe_datFecha.getMonth()+1)+'-';
    else
      vl_strSalida+=pe_datFecha.getMonth()+'-';

    if(pe_datFecha.getDate() < 9)
      vl_strSalida+="0"+pe_datFecha.getDate();
    else
      vl_strSalida+=pe_datFecha.getDate();

    return vl_strSalida;
  }

  public IsEmpty(pe_objeto:Array<any>) :boolean{

      return (pe_objeto===undefined || pe_objeto===null)
  }   

  public isDigt(pe_item:string):boolean{
        
    return /^[0-9]{1,}$/gi.test(pe_item);
    
  }

}
