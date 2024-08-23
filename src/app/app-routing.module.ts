import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualizarComponent } from './Components/actualizar/actualizar.component';
import { HijosComponent } from './Components/hijos/hijos.component';
import { ContactosComponent } from './Components/contactos/contactos.component';
import { NucleoFamiliarComponent } from './Components/nucleo-familiar/nucleo-familiar.component';
import { ExperienciaComponent } from './Components/experiencia/experiencia.component';
import { EticaEmpresarialComponent } from './Components/etica-empresarial/etica-empresarial.component';
import { InformacionAcademicaComponent } from './Components/informacion-academica/informacion-academica.component';

const routes: Routes = [
  { path: 'actualizar', component: ActualizarComponent },
  {path: 'experiencia', component: ExperienciaComponent},
  {path: 'hijos', component: HijosComponent},
  {path: 'contactos', component: ContactosComponent},
  {path: 'nucleo-familiar', component: NucleoFamiliarComponent},
  {path: 'informacion-academica', component: InformacionAcademicaComponent},
  {path: 'etica-empresarial', component:EticaEmpresarialComponent},
  { path: '', redirectTo: '/actualizar', pathMatch: 'full' }, // Redirección por defecto
  { path: '**', redirectTo: '/actualizar' } // Redirección para cualquier otra ruta
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


/* import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } */
