import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActualizarService } from '../../services/actualizar.service';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {
  usuario: any = {
    tipoId: '',
    numeroId: '',
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    fechaNacimiento: '',
    paisNacimiento: '',
    departamentoNacimiento: '',
    ciudadNacimiento: '',
    fechaExpedicionId: '',
    paisExpedicionId: '',
    departamentoExpedicionId: '',
    ciudadExpedicionId: '',
    grupoSanguineo: '',
    genero: '',
    estadoCivil: '',
    tenenciaVivienda: '',
    tipoVivienda: '',
    medioTransporte: '',
    telefono: '',
    celular: '',
    correo: '',
    redes: '',
    direccion: '',
    ciudadResidencia: '',
    paisResidencia: '',
    departamentoResidencia: '',
    barrio: '',
    estratoVivienda: '',
    ocupacion: '',
    paisTrabajo: '',
    ciudadTrabajo: '',
    departamentoTrabajo: '',
    compania: '',
    cargo: '',
    correoCorporativo: '',
    personasHogar: '',
    orientacionSexual: '',
    pertenenciaEtnica: '',
    condicionVulnerable: '',
    redesSociales: {
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: ''
    }
  };

  mostrarAlerta: boolean = false;

  constructor(private router: Router, private actualizarService: ActualizarService) { }

  ngOnInit(): void {
    // Recuperar datos del formulario del servicio
    const savedData = this.actualizarService.getUsuarioData();
    if (savedData) {
      this.usuario = savedData;
    }
  }

  // Método para guardar datos en el servicio antes de navegar
  saveData() {
    this.actualizarService.setUsuarioData(this.usuario);
  }

  validarCamposObligatorios(): boolean {
    return (
      this.usuario.tipoId &&
      this.usuario.numeroId &&
      this.usuario.primerNombre &&
      this.usuario.primerApellido &&
      this.usuario.segundoApellido &&
      this.usuario.fechaNacimiento
    );
  }

  submitForm() {
    if (this.validarCamposObligatorios()) {
      // Validar numeroId antes de enviar al servicio
      if (!this.usuario.numeroId || this.usuario.numeroId.trim() === '') {
        this.mostrarAlerta = true;
        return;
      }
      
      // Guardar el numeroId en el servicio
      this.actualizarService.setNumeroId(this.usuario.numeroId);

      this.actualizarService.actualizarUsuario(this.usuario).subscribe(
        response => {
          console.log('Usuario actualizado: ', response);
          this.navegarAExperiencia(); // Navegar solo después de la respuesta del backend
        },
        error => {
          console.error('Error al actualizar usuario: ', error);
        }
      );
    } else {
      this.mostrarAlerta = true;
    }
  }

  navegarAExperiencia() {
    this.saveData(); // Guardar los datos antes de navegar
    this.router.navigate(['/experiencia']);
  }

  cerrarAlerta() {
    this.mostrarAlerta = false;
  }

  mostrarRedesSociales(): boolean {
    return this.usuario.redes === 'Si';
  }
}

/* import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActualizarService } from '../../services/actualizar.service';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent {
  usuario: any = {
    tipoId: '',
    numeroId: '',
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    fechaNacimiento: '',
    paisNacimiento: '',
    departamentoNacimiento: '',
    ciudadNacimiento: '',
    fechaExpedicionId: '',
    paisExpedicionId: '',
    departamentoExpedicionId: '',
    ciudadExpedicionId: '',
    grupoSanguineo: '',
    genero: '',
    estadoCivil: '',
    tenenciaVivienda: '',
    tipoVivienda: '',
    medioTransporte: '',
    telefono: '',
    celular: '',
    correo: '',
    redes: '',
    direccion: '',
    ciudadResidencia: '',
    paisResidencia: '',
    departamentoResidencia: '',
    barrio: '',
    estratoVivienda: '',
    ocupacion: '',
    paisTrabajo: '',
    ciudadTrabajo: '',
    departamentoTrabajo: '',
    compania: '',
    cargo: '',
    correoCorporativo: '',
    personasHogar: '',
    orientacionSexual: '',
    pertenenciaEtnica: '',
    condicionVulnerable: '',
    redesSociales: {
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: ''
    }
  };

  mostrarAlerta: boolean = false;

  constructor(private router: Router, private actualizarService: ActualizarService) { }

  validarCamposObligatorios(): boolean {
    return (
      this.usuario.tipoId &&
      this.usuario.numeroId &&
      this.usuario.primerNombre &&
      this.usuario.primerApellido &&
      this.usuario.segundoApellido &&
      this.usuario.fechaNacimiento
    );
  }

  submitForm() {
    if (this.validarCamposObligatorios()) {
      // Validar numeroId antes de enviar al servicio
      if (!this.usuario.numeroId || this.usuario.numeroId.trim() === '') {
        this.mostrarAlerta = true;
        return;
      }
      
      // Guardar el numeroId en el servicio
      this.actualizarService.setNumeroId(this.usuario.numeroId);
  
      this.actualizarService.actualizarUsuario(this.usuario).subscribe(
        response => {
          console.log('Usuario actualizado: ', response);
          this.navegarAExperiencia(); // Navegar solo después de la respuesta del backend
        },
        error => {
          console.error('Error al actualizar usuario: ', error);
        }
      );
    } else {
      this.mostrarAlerta = true;
    }
  }

  navegarAExperiencia() {
    this.router.navigate(['/experiencia']);
  }

  cerrarAlerta() {
    this.mostrarAlerta = false;
  }

  mostrarRedesSociales(): boolean {
    return this.usuario.redes === 'Si';
  }
} */
