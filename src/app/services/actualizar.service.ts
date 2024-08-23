import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActualizarService {

  private baseurl = 'http://localhost:3000';
  // Variable para almacenar datos del formulario temporalmente
  private usuarioData: any = {}; 
  private experiencias: any[] = []; 
  private hijos: any[] = [];
  private contactosEmergencia: any = {}; 
  private otrosDocumentos: any = {};
  private nucleoFamiliar: any[] = []; 
  private mascotas: any[] = []; 
  private estudios: any[] = []; 

  constructor(private http: HttpClient) { }

  private numeroId: string = ''; 

  actualizarUsuario(usuario: any){
    return this.http.post<any>(`${this.baseurl}/actualizar`, usuario);
  }

  agregarExperiencia(experiencia: any){
    return this.http.post<any>(`${this.baseurl}/experiencia`, experiencia);
  }

  agregarHijos(hijos: any){
    return this.http.post<any>(`${this.baseurl}/hijos`, hijos);
  }

  agregarContactos(contactos: { numeroId: string; nombreContacto1: string; numeroContacto1: string; parentesco1: string; nombreContacto2: string; numeroContacto2: string; parentesco2: string }) {
    return this.http.post<any>(`${this.baseurl}/contactos`, contactos);
  }
  agregarOtrosDocumentos(otrosDocumentos: { numeroId: string; libreta: boolean; numeroLibreta: string; fechaExpedicion: string; categoriaLicencia: string; numeroLicencia: string; fechaVencimiento: string }) {
    console.log('Datos enviados:', otrosDocumentos); // Log para verificar los datos enviados desde el cliente
    return this.http.post<any>(`${this.baseurl}/otros-documentos`, otrosDocumentos);
  }
  

  
  agregarNucleoFamiliar(numeroId: string, nucleoFamiliar: any[]) {
    return this.http.post<any>(`${this.baseurl}/nucleo-familiar`, { numeroId, nucleoFamiliar });
  }
  
  agregarMascotas(numeroId: string, mascotas: any[]) {
    return this.http.post<any>(`${this.baseurl}/mascotas`, { numeroId, mascotas });
  }

  agregarInformacionAcademica(informacionAcademica: { numeroId: string, estudios: any[] }) {
    return this.http.post<any>(`${this.baseurl}/informacion-academica`, informacionAcademica);
  }

  agregarEticaEmpresarial(eticaEmpresarial: { numeroId: string; empleados: string; proveedores: string; clientesMayoristas: string; autorizacion: boolean }) {
    return this.http.post<any>(`${this.baseurl}/etica-empresarial`, eticaEmpresarial);
  }

  setNumeroId(id: string) {
    this.numeroId = id;
  }

  getNumeroId(): string {
    return this.numeroId;
  }
  
    // Método para guardar temporalmente datos del formulario
    setUsuarioData(data: any) {
      this.usuarioData = data;
    }
  
    
    getUsuarioData(): any {
      return this.usuarioData;
    }

      
  setExperiencias(experiencias: any[]) {
    this.experiencias = experiencias;
  }

  
  getExperiencias(): any[] {
    return this.experiencias;
  }

   
   setHijos(hijos: any[]) {
    this.hijos = hijos;
  }

  
  getHijos(): any[] {
    return this.hijos;
  }

    
    setContactosEmergencia(contactosEmergencia: any) {
      this.contactosEmergencia = contactosEmergencia;
    }
  
   
    getContactosEmergencia(): any {
      return this.contactosEmergencia;
    }
  
    
    setOtrosDocumentos(otrosDocumentos: any) {
      this.otrosDocumentos = otrosDocumentos;
    }

    getOtrosDocumentos(): any {
      return this.otrosDocumentos;
    }


  setNucleoFamiliar(nucleoFamiliar: any[]) {
    this.nucleoFamiliar = nucleoFamiliar;
  }


  getNucleoFamiliar(): any[] {
    return this.nucleoFamiliar;
  }

  
    setMascotas(mascotas: any[]) {
      this.mascotas = mascotas;
    }
  
    
    getMascotas(): any[] {
      return this.mascotas;
    }

   
  setEstudios(estudios: any[]) {
    this.estudios = estudios;
  }

  getEstudios(): any[] {
    return this.estudios;
  }
}
