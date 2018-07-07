import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  private _scope:string="l"; // s or l
	private _periodo={"s":1000,"m":60000,"h":3600000,"d":86400000};	
	private _hasError:boolean = false;
	private _sError:string = "";
	private _messages={
		"KEYEXISTS":"Ya existe la clave : ",
		"KEYNOTEXISTS" : "La clave seleccionada no existe",
		"CACHEHASEXPIRES": "La cache ha caducado",
		"ERRORINTERVALFORMAT":"Error, el intervalo no tiene un formato correcto",
		"ERRORSETTYPE":"Error el tipo de cache no es valido"
	};

	private _claves=[];

  constructor() { }

  public Add(pe_key:string,pe_data:any,pe_intervalo:string){
    return (this._scope.toLocaleUpperCase()==="S")?this._sesAdd(pe_key,pe_data,pe_intervalo):this._locAdd(pe_key,pe_data,pe_intervalo);
  }

  public Delete(pe_key:string){			
    return (this._scope.toLocaleUpperCase()==="S")?this._sesDelete(pe_key):this._locDelete(pe_key);
  }

  public Get(pe_key:string):any{
    return (this._scope.toLocaleUpperCase()==="S")?this._sesGetItem(pe_key):this._locGetItem(pe_key);
  }

  private _locAdd(pe_key:string,pe_data:any,pe_intervalo:string):boolean{
    
    let vl_retorno = false;

    if(localStorage.getItem(pe_key)===null){
      localStorage.setItem(pe_key,this._toString(pe_key,pe_data,pe_intervalo));
      vl_retorno = true;
    }else{
      this._setError(this._messages.KEYEXISTS);
      vl_retorno = false;
    }

    return vl_retorno;
  }

  private _locDelete(pe_key:string):boolean{
    
      let vl_retorno = true;
        
      if(localStorage.getItem(pe_key)!=null)
        localStorage.removeItem(pe_key);
      else{				
        this._setError(this._messages.KEYNOTEXISTS);
        vl_retorno=false;
      }
  
      return vl_retorno;	
  } 

  private _locGetItem=function(pe_key:string){
    
        if(localStorage.getItem(pe_key)!=null)
          return JSON.parse(localStorage.getItem(pe_key));
        else{
          this._setError(this._messages.CACHEHASEXPIRES);
          return null;
        }			  
  };

  private _sesAdd(pe_key:string,pe_data:any,pe_intervalo:string):boolean{
    
    let vl_retorno:boolean=false;
    if(sessionStorage.getItem(pe_key)===null){
      sessionStorage.setItem(pe_key,this._toString(pe_key,pe_data,pe_intervalo));
      vl_retorno = true;
    }else{
      this._setError(this._messages.KEYEXISTS);
      vl_retorno = false;
    }

    return vl_retorno;
    
  }

  private _sesDelete(pe_key:string):boolean{
    
        var vl_retorno = true;
    
        if(sessionStorage.getItem(pe_key)!=null)
          sessionStorage.removeItem(pe_key);
        else{				
          this._setError(this._messages.KEYNOTEXISTS);
          vl_retorno=false;
        }
    
        return vl_retorno;	 
  }

  private _sesGetItem(pe_key:string):any{
    
    if(sessionStorage.getItem(pe_key)!=null)
      return JSON.parse(sessionStorage.getItem(pe_key));
    else{
      this._setError(this._messages.CACHEHASEXPIRES);
      return null;
    }			
    
  }

  private _toString=function(pe_key:string,pe_value:any,pe_intervalo:string){		
		var vl_temp={id:pe_key,data:[],fcreacion:Date.now(),fvencimiento:this._setCahe(pe_intervalo),intervalo:pe_intervalo};	
		vl_temp.data=pe_value;
		return JSON.stringify(vl_temp);
  };
  
  private _setError=function(pe_msg:string){
		this._hasError = true;
		this._sError = pe_msg;
	}

  private _setCahe=function(pe_intervalo:string){
    
    let vl_retorno=null;

    let vl_patrones = [/^[0-9]{1,}[s|m|h|d]{1}$/,/^[0-9]{1,}/,/[s|m|h|d]{1}$/];

    if(vl_patrones[0].test(pe_intervalo)){
      let vl_cantidad=parseInt(vl_patrones[1].exec(pe_intervalo)[0]);
      let vl_key= vl_patrones[2].exec(pe_intervalo)[0];	
      let vl_incremento = eval("this._periodo."+vl_key)*vl_cantidad;
      vl_retorno = new Date(Date.now()+vl_incremento).getTime();			
    }else{			
      throw new Error(this._messages.ERRORINTERVALFORMAT);	
    }

    return vl_retorno;

  };


}
