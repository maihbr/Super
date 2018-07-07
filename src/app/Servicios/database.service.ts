import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';


@Injectable()
export class DatabaseService {

  private _strDbName:string;
	private _intVersion:number;
	private _db:any;

  constructor(private _configService : ConfigService) {

    this._strDbName = this._configService.DbName;
    this._intVersion =this._configService.Version;
   }

   Open(){
    
        return new Promise((resolve,reject)=>{              
            const respuesta = indexedDB.open(this._strDbName,this._intVersion);
            respuesta.onupgradeneeded=(event:any)=>{               
                let _db = event.target.result;              
                this._db = _db;   
                        
                    let vl_dtCategoria = _db.createObjectStore("categoria",{keyPath:"id"});                                    
                    vl_dtCategoria.createIndex("nombre","nombre",{unique:true});

                    let vl_dtProductos = _db.createObjectStore("producto",{keyPath:"id"});
                    vl_dtProductos.createIndex("idCategoria","id_categoria",{unique:false});
                    vl_dtProductos.createIndex("nombre","nombre",{unique:false});
                                                       
                    let vl_dtPedidos = _db.createObjectStore('pedido',{keyPath:'idPedido'});
                    vl_dtPedidos.createIndex('fecha','fecha',{unique:false});
                    
                resolve(1);
            };

            respuesta.onerror=(event:any)=>{
                reject(event);
            };

            respuesta.onsuccess=(event:any)=>{									
                this._db = event.target.result;	                	
                resolve(2);	
            };

        });		
     }
 
  
     getById(pe_strTableName:string,pe_IdItem:any):any{
            return new Promise((resolve,reject)=>{

                let vl_transaccion = this._db.transaction(pe_strTableName,"readwrite");
                let vl_DataTable = vl_transaccion.objectStore(pe_strTableName);    
                let vl_request = vl_DataTable.get(pe_IdItem);

                vl_request.onsuccess=function(e:any){                      
                    resolve(vl_request.result);               
                }

                vl_request.onerror=function(e:any){                
                    reject(e);
                }

            });
    }

 
    getAll(pe_strTableName:string):any{
     return new Promise((resolve,reject)=>{        	
         let vl_transaccion = this._db.transaction(pe_strTableName,"readonly");
         let vl_DataTable = vl_transaccion.objectStore(pe_strTableName);            
         let vl_arrItems=[];
         vl_DataTable.openCursor().onsuccess=function(event:any){
             let vl_cursor = event.target.result;                  
             if(vl_cursor){
                 vl_arrItems.push(vl_cursor.value);
                 vl_cursor.continue();
             }else{
                 resolve(vl_arrItems);
             }
         };
     });
 }

  Insert(pe_strTableName:string,pe_data:any):any{
     return new Promise((resolve,reject)=>{

         let vl_transaccion = this._db.transaction(pe_strTableName,"readwrite")    
         let vl_dtable = vl_transaccion.objectStore(pe_strTableName); 
         
         if(!Array.isArray(pe_data)){
             vl_dtable.add(pe_data);                
         }else{                
             pe_data.forEach((vl_item)=>{
                 vl_dtable.add(vl_item);
             });
         }

         vl_transaccion.oncomplete=function(e){
             resolve(1);
         }

         vl_transaccion.onerror=function(e){
             reject(e);
         }
         
     });
 }
 
  Update(pe_strTableName:string ,pe_newItem:any):any{

     return new Promise((resolve,reject)=>{
             let vl_dtable = this._db.transaction(pe_strTableName,"readwrite").objectStore(pe_strTableName); 
             let vl_result = vl_dtable.put(pe_newItem);  
            
             vl_result.onsuccess=function(e){
                 resolve(1)
             };

             vl_result.onerror=function(e){
                 reject(-1);
             };
     });
 }

 Delete(pe_strTableName:string,pe_IdItem:any):any{

     return new Promise((resolve,reject)=>{

         let vl_transaccion = this._db.transaction(pe_strTableName,"readwrite");
         let vl_DataTable   = vl_transaccion.objectStore(pe_strTableName);    
         let vl_request     = vl_DataTable.delete(pe_IdItem);

         vl_request.onsuccess=function(e){                
             resolve(1);
         }

         vl_request.onerror=function(e){
             reject(e);
         }

     });
 }

  hasData(pe_tablename:string){
    
      return new Promise((resolve,reject)=>{

         let vl_boolSalida = false;
         let vl_arrData=[];                    
         let vl_transaccion = this._db.transaction(pe_tablename,"readonly");
         let vl_tabla = vl_transaccion.objectStore(pe_tablename);
         vl_tabla.openCursor().onsuccess=function(event){
             let vl_data = event.target.result;     
             (vl_data)?resolve(true):resolve(false);                        
         }

     });

 }

Search(pe_strTableName:string,pe_strNameIndex:string,pe_valor:any):any{

    return new Promise((resolve,reject)=>{
        
        let vl_rango = IDBKeyRange.bound(pe_valor.low,pe_valor.upper);
        let vl_transaccion = this._db.transaction(pe_strTableName,"readonly");
        let vl_tabla = vl_transaccion.objectStore(pe_strTableName);
        let vl_indice =  vl_tabla.index(pe_strNameIndex);
       
        let vl_arrResult=Array<any>();

        vl_indice.openCursor(vl_rango).onsuccess=function(e){
            
              let vl_cursor = e.target.result;
              if(vl_cursor){
                  vl_arrResult.push(vl_cursor.value);
                  vl_cursor.continue();
              }

              resolve(vl_arrResult);
              
        }
 
    });
   
}

Close(){
    this._db.Close();
}

 version():string{
     return "Version de la base de datos :" + this._intVersion.toString();
 }


 listTables():any{             
    return this._db.objectStoreNames;
 }


 clearTable(pe_strTableName:string):any{
   
    return new Promise((resolve,reject)=>{
       let transaction = this._db.transaction(pe_strTableName,"readwrite");
       let tabla = transaction.objectStore(pe_strTableName);          
       let resultado = tabla.clear();
      
        resultado.onsuccess=function(event){
             resolve(event.returnValue);
        }

        resultado.onerror=function(event){
             reject(event);
        }
    });
 }

 async clearAllTables(){

    let vl_boolOk:boolean = false;

    for(let vl_strTabla of this._db.objectStoreNames){
        await this.clearTable(vl_strTabla).then(data=>{
            vl_boolOk = true;
        },function(error){
            vl_boolOk = false;            
        });
    }

    return vl_boolOk;

 }

RemoveDB(pe_strNameDB:string){
   
    return new Promise((resolve,reject)=>{

        if(this.clearAllTables()){

            let vl_request = window.indexedDB.deleteDatabase(pe_strNameDB);
            vl_request.onblocked=function(e){
               reject(false);
              }
            
              vl_request.onerror=function(e){
                reject(false);
              }
            
              vl_request.onsuccess=function(e){
                  resolve(true);
              }

        }else{
            reject(false);
        }

       
    });


}
 
}
