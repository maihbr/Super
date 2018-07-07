import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  private _dbName: string = "froizDB";
  private _version: number = 2;
  private _sizePage : number = 999;

  private _firebase: Array<string>;
  private _userAdmin:any = {"usename":"admin","password":"1234"};

  get DbName():string{return this._dbName;}
  get Version():number{return this._version;}
  get SizePage():number{return this._sizePage;}
  get Credenciales():any{return this._userAdmin};




  constructor() { }

  

}
