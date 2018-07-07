import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'ngx-bootstrap';
import { AccordionModule } from 'ngx-bootstrap';

import {ConfigService} from './Servicios/config.service';
import {DatabaseService} from './Servicios/database.service';
import {SeguridadService} from './Servicios/seguridad.service';
import {AutentificacionService} from './Servicios/autentificacion.service';
import {UtilesService} from './Servicios/utiles.service';
import {StorageService} from './Servicios/storage.service';
import {CestaService} from './Servicios/cesta.service';
import {CategoriaService} from './Servicios/categoria.service';
import {ProductoService} from './Servicios/producto.service';

import {AppComponent} from './app.component';
import {LoginComponent} 	   from './Componentes/login/login.component';
import {ImportarComponent}   from './Componentes/importar/importar.component';
import {ExportarComponent}   from './Componentes/exportar/exportar.component';
import {CategoriaComponent}   from './Componentes/categoria/categoria.component';
import {DetCategoriaComponent} from './Componentes/det-categoria/det-categoria.component';
import {ProductosComponent}  from './Componentes/productos/productos.component';
import {PedidosComponent}    from './Componentes/pedidos/pedidos.component';
import {ConfiguracionComponent} from './Componentes/configuracion/configuracion.component';
import {ExportarFirebaseComponent}  from './Componentes/exportar-firebase/exportar-firebase.component';
import {Error404Component} from './Componentes/error404/error404.component';
import {DetProductoComponent} from './Componentes/det-producto/det-producto.component';
import {NavbarComponent} from './Componentes/navbar/navbar.component';
import {ComfirmarComponent} from './Componentes/comfirmar/comfirmar.component';
import {routing} from './app.routes';
import { DetPedidoComponent } from './Componentes/det-pedido/det-pedido.component';
import { FormModalComponent } from './Componentes/form-modal/form-modal.component';
import { PruebasComponent } from './Componentes/pruebas/pruebas.component';
import { LispedidosComponent } from './Componentes/lispedidos/lispedidos.component';
import { PipeProductosPipe } from './pipes/pipe-productos.pipe';
import { ConfirmarComponent } from './Componentes/confirmar/confirmar.component';
import { ConfirmarV2Component } from './Componentes/confirmar-v2/confirmar-v2.component';
import { PagerService } from './Servicios/pager.service';



@NgModule({
  declarations: [
    AppComponent,   
    LoginComponent,
    ProductosComponent,
    DetProductoComponent,
    NavbarComponent,
    ImportarComponent,
    ExportarComponent,
    PedidosComponent,
    CategoriaComponent,
    DetCategoriaComponent,
    ConfiguracionComponent,
    ExportarFirebaseComponent,
    Error404Component,
    ComfirmarComponent,
    DetProductoComponent,
    DetPedidoComponent,
    DetPedidoComponent,
    FormModalComponent,
    PruebasComponent,
    LispedidosComponent,
    PipeProductosPipe,
    ConfirmarComponent,
    ConfirmarV2Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ModalModule.forRoot(),
    AccordionModule.forRoot()
  ],
  providers: [AutentificacionService,
              SeguridadService,
              ConfigService,
              DatabaseService,
              UtilesService,
              StorageService,
              CestaService,
              CategoriaService,
              PagerService,
              ProductoService
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
