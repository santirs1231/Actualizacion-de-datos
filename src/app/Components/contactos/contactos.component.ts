import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActualizarService } from '../../services/actualizar.service';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit {
  contactosEmergencia: any = {
    nombreContacto1: '',
    numeroContacto1: '',
    parentesco1: '',
    nombreContacto2: '',
    numeroContacto2: '',
    parentesco2: ''
  };

  otrosDocumentos: any = {
    libreta: false,
    numeroLibreta: '',
    fechaExpedicion: '',
    categoriaLicencia: '',
    numeroLicencia: '',
    fechaVencimiento: ''
  };

  mostrarAlerta: boolean = false;
  numeroId: string = '';

  constructor(
    private router: Router,
    private actualizarService: ActualizarService
  ) {}

  ngOnInit() {
    this.numeroId = this.actualizarService.getNumeroId(); // Obtiene el numeroId del servicio
    this.contactosEmergencia = this.actualizarService.getContactosEmergencia(); // Obtiene contactos de emergencia almacenados temporalmente
    this.otrosDocumentos = this.actualizarService.getOtrosDocumentos(); // Obtiene otros documentos almacenados temporalmente
  }

  validarCamposObligatorios(): boolean {
    return (
      this.contactosEmergencia.nombreContacto1 &&
      this.contactosEmergencia.numeroContacto1 &&
      this.contactosEmergencia.parentesco1 &&
      this.contactosEmergencia.nombreContacto2 &&
      this.contactosEmergencia.numeroContacto2 &&
      this.contactosEmergencia.parentesco2
    );
  }

  submitForm() {
    if (this.validarCamposObligatorios()) {
      const datosContactos = {
        numeroId: this.numeroId,
        nombreContacto1: this.contactosEmergencia.nombreContacto1,
        numeroContacto1: this.contactosEmergencia.numeroContacto1,
        parentesco1: this.contactosEmergencia.parentesco1,
        nombreContacto2: this.contactosEmergencia.nombreContacto2,
        numeroContacto2: this.contactosEmergencia.numeroContacto2,
        parentesco2: this.contactosEmergencia.parentesco2
      };

      const datosOtrosDocumentos = {
        numeroId: this.numeroId,
        libreta: this.otrosDocumentos.libreta,
        numeroLibreta: this.otrosDocumentos.numeroLibreta,
        fechaExpedicion: this.otrosDocumentos.fechaExpedicion,
        categoriaLicencia: this.otrosDocumentos.categoriaLicencia,
        numeroLicencia: this.otrosDocumentos.numeroLicencia,
        fechaVencimiento: this.otrosDocumentos.fechaVencimiento
      };

      this.actualizarService.agregarContactos(datosContactos).subscribe(
        response => {
          console.log('Contactos agregados:', response);
          this.actualizarService.agregarOtrosDocumentos(datosOtrosDocumentos).subscribe(
            response => {
              console.log('Otros documentos agregados:', response);
              this.navegarANucleoFamiliar(); // Navegar solo después de la respuesta del backend
            },
            error => {
              console.error('Error al agregar otros documentos:', error);
            }
          );
        },
        error => {
          console.error('Error al agregar contactos:', error);
        }
      );
    } else {
      this.mostrarAlerta = true;
    }
  }

  navegarAHijos(): void {
    this.actualizarService.setContactosEmergencia(this.contactosEmergencia); // Guardar contactos de emergencia antes de navegar
    this.actualizarService.setOtrosDocumentos(this.otrosDocumentos); // Guardar otros documentos antes de navegar
    this.router.navigate(['/hijos']);
  }

  navegarANucleoFamiliar(): void {
    if (this.validarCamposObligatorios()) {
      this.actualizarService.setContactosEmergencia(this.contactosEmergencia); // Guardar contactos de emergencia antes de navegar
      this.actualizarService.setOtrosDocumentos(this.otrosDocumentos); // Guardar otros documentos antes de navegar
      this.router.navigate(['/nucleo-familiar']);
    } else {
      this.mostrarAlerta = true;
    }
  }

  cerrarAlerta() {
    this.mostrarAlerta = false;
  }
}


/* import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActualizarService } from '../../services/actualizar.service';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit {
  contactosEmergencia: any = {
    nombreContacto1: '',
    numeroContacto1: '',
    parentesco1: '',
    nombreContacto2: '',
    numeroContacto2: '',
    parentesco2: ''
  };

  otrosDocumentos: any = {
    libreta: false,
    numeroLibreta: '',
    fechaExpedicion: '',
    categoriaLicencia: '',
    numeroLicencia: '',
    fechaVencimiento: ''
  };

  mostrarAlerta: boolean = false;
  numeroId: string = '';

  constructor(
    private router: Router,
    private actualizarService: ActualizarService
  ) {}

  ngOnInit() {
    this.numeroId = this.actualizarService.getNumeroId(); // Obtiene el numeroId del servicio
  }

  validarCamposObligatorios(): boolean {
    return (
      this.contactosEmergencia.nombreContacto1 &&
      this.contactosEmergencia.numeroContacto1 &&
      this.contactosEmergencia.parentesco1 &&
      this.contactosEmergencia.nombreContacto2 &&
      this.contactosEmergencia.numeroContacto2 &&
      this.contactosEmergencia.parentesco2
    );
  }

  submitForm() {
    if (this.validarCamposObligatorios()) {
      const datosContactos = {
        numeroId: this.numeroId,
        nombreContacto1: this.contactosEmergencia.nombreContacto1,
        numeroContacto1: this.contactosEmergencia.numeroContacto1,
        parentesco1: this.contactosEmergencia.parentesco1,
        nombreContacto2: this.contactosEmergencia.nombreContacto2,
        numeroContacto2: this.contactosEmergencia.numeroContacto2,
        parentesco2: this.contactosEmergencia.parentesco2
      };

      const datosOtrosDocumentos = {
        numeroId: this.numeroId,
        libreta: this.otrosDocumentos.libreta,
        numeroLibreta: this.otrosDocumentos.numeroLibreta,
        fechaExpedicion: this.otrosDocumentos.fechaExpedicion,
        categoriaLicencia: this.otrosDocumentos.categoriaLicencia,
        numeroLicencia: this.otrosDocumentos.numeroLicencia,
        fechaVencimiento: this.otrosDocumentos.fechaVencimiento
      };

      this.actualizarService.agregarContactos(datosContactos).subscribe(
        response => {
          console.log('Contactos agregados:', response);
          this.actualizarService.agregarOtrosDocumentos(datosOtrosDocumentos).subscribe(
            response => {
              console.log('Otros documentos agregados:', response);
              this.navegarANucleoFamiliar(); // Navegar solo después de la respuesta del backend
            },
            error => {
              console.error('Error al agregar otros documentos:', error);
            }
          );
        },
        error => {
          console.error('Error al agregar contactos:', error);
        }
      );
    } else {
      this.mostrarAlerta = true;
    }
  }

  navegarAHijos(): void {
    this.router.navigate(['/hijos']);
  }

  navegarANucleoFamiliar(): void {
    if (this.validarCamposObligatorios()) {
      this.router.navigate(['/nucleo-familiar']);
    } else {
      this.mostrarAlerta = true;
    }
  }

  cerrarAlerta() {
    this.mostrarAlerta = false;
  }
} */



