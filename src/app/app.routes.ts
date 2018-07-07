import { RouterModule,Routes } from '@angular/router';

import { LoginComponent } 	   from './Componentes/login/login.component';
import { ImportarComponent }   from './Componentes/importar/importar.component';
import { ExportarComponent }   from './Componentes/exportar/exportar.component';
import { ExportarFirebaseComponent }  from './Componentes/exportar-firebase/exportar-firebase.component';
import { CategoriaComponent}   from './Componentes/categoria/categoria.component';
import { ProductosComponent }  from './Componentes/productos/productos.component';
import { PedidosComponent }    from './Componentes/pedidos/pedidos.component';
import { ConfiguracionComponent }     from './Componentes/configuracion/configuracion.component';
import { Error404Component } 		  from './Componentes/error404/error404.component';
import { PruebasComponent } 		  from './Componentes/pruebas/pruebas.component';
import { LispedidosComponent } 		  from './Componentes/lispedidos/lispedidos.component';
import {SeguridadService} from './Servicios/seguridad.service';

const routes: Routes = [		
		{path:'',component:LoginComponent},
		{path:'login',component:LoginComponent},
		{path:'importar',component:ImportarComponent},
		{path:'exportar',component:ExportarComponent},		
		{path:'pedidos',component:PedidosComponent},
		//{path:'categorias',component:CategoriaComponent,canActivate:[SeguridadService]},
		{path:'categorias',component:CategoriaComponent},
		{path:'productos',component:ProductosComponent},
		{path:'configuracion',component:ConfiguracionComponent},				
		{path:'exportar-firebase',component:ExportarFirebaseComponent},
		{path:'pruebas',component:PruebasComponent},
		{path:'lispedidos',component:LispedidosComponent},
		{path:'404',component:Error404Component},
		{path:'**',redirectTo:'404'}
	];

export const routing = RouterModule.forRoot(routes);

