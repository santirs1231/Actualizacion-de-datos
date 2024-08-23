import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActualizarService } from '../../services/actualizar.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  experiencia: any = {
    tieneExperiencia: '',
    empresa: '',
    cargo: '',
    fechaInicio: '',
    fechaFin: ''
  };
  mostrarAlerta: boolean = false;
  experiencias: any[] = []; // Array para almacenar múltiples experiencias laborales
  numeroId: string = '';

  constructor(
    private router: Router,
    private actualizarService: ActualizarService
  ) { }

  ngOnInit() {
    this.numeroId = this.actualizarService.getNumeroId(); // Obtiene el numeroId del servicio
    this.experiencias = this.actualizarService.getExperiencias(); // Obtiene experiencias almacenadas temporalmente
  }

  validarCamposObligatorios(): boolean {
    if (!this.experiencia.tieneExperiencia) {
      return false;
    }
    if (this.experiencia.tieneExperiencia === 'si') {
      return (
        this.experiencia.empresa &&
        this.experiencia.cargo &&
        this.experiencia.fechaInicio &&
        this.experiencia.fechaFin
      );
    }
    return true;
  }

  submitForm() {
    if (this.experiencia.tieneExperiencia === 'no') {
      this.experiencias.push({
        tieneExperiencia: 'no',
        empresa: 'No aplica',
        cargo: 'No aplica',
        fechaInicio: null,
        fechaFin: null
      });
    }
  
    if (this.validarCamposObligatorios()) {
      if (this.experiencia.tieneExperiencia === 'si') {
        this.experiencias.push({ ...this.experiencia });
      }
  
      const numeroId = this.actualizarService.getNumeroId();
  
      this.actualizarService.agregarExperiencia({ experiencias: this.experiencias, numeroId }).subscribe(
        response => {
          console.log('Experiencia agregada: ', response);
          this.navegarAHijos(); // Navegar solo después de la respuesta del backend
        },
        error => {
          console.error('Error al guardar experiencias: ', error);
        }
      );
    } else {
      this.mostrarAlerta = true;
    }
  }

  agregarExperiencia() {
    if (this.validarCamposObligatorios()) {
      if (this.experiencia.tieneExperiencia === 'si') {
        console.log('Agregando experiencia laboral:', this.experiencia);
        this.experiencias.push({ ...this.experiencia });
        this.experiencia = {
          tieneExperiencia: this.experiencia.tieneExperiencia,
          empresa: '',
          cargo: '',
          fechaInicio: '',
          fechaFin: ''
        };
        this.mostrarAlerta = false;
      } else {
        this.mostrarAlerta = true;
      }
    } else {
      this.mostrarAlerta = true;
    }
  }

  eliminarExperiencia(index: number) {
    this.experiencias.splice(index, 1);
  }

  navegarAActualizar(): void {
    this.actualizarService.setExperiencias(this.experiencias); // Guardar experiencias antes de navegar
    this.router.navigate(['/actualizar']);
  }

  navegarAHijos() {
    if (this.validarCamposObligatorios()) {
      this.actualizarService.setExperiencias(this.experiencias); // Guardar experiencias antes de navegar
      this.router.navigate(['/hijos']);
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
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  experiencia: any = {
    tieneExperiencia: '',
    empresa: '',
    cargo: '',
    fechaInicio: '',
    fechaFin: ''
  };
  mostrarAlerta: boolean = false;
  experiencias: any[] = []; // Array para almacenar múltiples experiencias laborales
  numeroId: string = '';

  constructor(
    private router: Router,
    private actualizarService: ActualizarService
  ) { }

  ngOnInit() {
    this.numeroId = this.actualizarService.getNumeroId(); // Obtiene el numeroId del servicio
  }

  validarCamposObligatorios(): boolean {
    if (!this.experiencia.tieneExperiencia) {
      return false;
    }
    if (this.experiencia.tieneExperiencia === 'si') {
      return (
        this.experiencia.empresa &&
        this.experiencia.cargo &&
        this.experiencia.fechaInicio &&
        this.experiencia.fechaFin
      );
    }
    return true;
  }

  submitForm() {
    if (this.experiencia.tieneExperiencia === 'no') {
      this.experiencias.push({
        tieneExperiencia: 'no',
        empresa: 'No aplica',
        cargo: 'No aplica',
        fechaInicio: null,
        fechaFin: null
      });
    }
  
    if (this.validarCamposObligatorios()) {
      if (this.experiencia.tieneExperiencia === 'si') {
        this.experiencias.push({ ...this.experiencia });
      }
  
      const numeroId = this.actualizarService.getNumeroId();
  
      this.actualizarService.agregarExperiencia({ experiencias: this.experiencias, numeroId }).subscribe(
        response => {
          console.log('Experiencia agregada: ', response);
          this.navegarAHijos(); // Navegar solo después de la respuesta del backend
        },
        error => {
          console.error('Error al guardar experiencias: ', error);
        }
      );
    } else {
      this.mostrarAlerta = true;
    }
  }
  

  agregarExperiencia() {
    if (this.validarCamposObligatorios()) {
      if (this.experiencia.tieneExperiencia === 'si') {
        console.log('Agregando experiencia laboral:', this.experiencia);
        this.experiencias.push({ ...this.experiencia });
        this.experiencia = {
          tieneExperiencia: this.experiencia.tieneExperiencia,
          empresa: '',
          cargo: '',
          fechaInicio: '',
          fechaFin: ''
        };
        this.mostrarAlerta = false;
      } else {
        this.mostrarAlerta = true;
      }
    } else {
      this.mostrarAlerta = true;
    }
  }

  navegarAActualizar(): void {
    this.router.navigate(['/actualizar']);
  }

  navegarAHijos() {
    if (this.validarCamposObligatorios()) {
      this.router.navigate(['/hijos']);
    } else {
      this.mostrarAlerta = true;
    }
  }

  cerrarAlerta() {
    this.mostrarAlerta = false;
  }
}
 */