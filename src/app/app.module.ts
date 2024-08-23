
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule  } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActualizarComponent } from './Components/actualizar/actualizar.component';
import { HijosComponent } from './Components/hijos/hijos.component';
import { ContactosComponent } from './Components/contactos/contactos.component';
import { ExperienciaComponent } from './Components/experiencia/experiencia.component';
import { NucleoFamiliarComponent } from './Components/nucleo-familiar/nucleo-familiar.component';
import { InformacionAcademicaComponent } from './Components/informacion-academica/informacion-academica.component';
import { EticaEmpresarialComponent } from './Components/etica-empresarial/etica-empresarial.component';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient, withFetch } from '@angular/common/http';




@NgModule({
  declarations: [
    AppComponent,
    ActualizarComponent,
    ExperienciaComponent,
    HijosComponent,
    ContactosComponent,
    NucleoFamiliarComponent,
    InformacionAcademicaComponent,
    EticaEmpresarialComponent,
    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    FormsModule,
    AppRoutingModule,
    
  ],
  providers: [
    provideHttpClient(withFetch())
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
