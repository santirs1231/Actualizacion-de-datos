import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActualizarService } from '../../services/actualizar.service';

@Component({
  selector: 'app-informacion-academica',
  templateUrl: './informacion-academica.component.html',
  styleUrls: ['./informacion-academica.component.css']
})
export class InformacionAcademicaComponent implements OnInit {
  estudios: any[] = [];
  estudio = {
    tipoEstudio: '',
    titulo: ''
  };
  numeroId: string = '';
  mostrarAlerta: boolean = false;

  constructor(
    private router: Router,
    private actualizarService: ActualizarService
  ) {}

  ngOnInit(): void {
    this.numeroId = this.actualizarService.getNumeroId();
    this.estudios = this.actualizarService.getEstudios(); // Obtiene estudios almacenados temporalmente
  }

  agregarEstudio(): void {
    console.log('Agregando estudio:', this.estudio);
    this.estudios.push({ ...this.estudio });
    this.estudio = {
      tipoEstudio: '',
      titulo: ''
    };
  }

  //se modifico
  eliminarEstudio(index: number) {
    if (confirm('¿Está seguro de que desea eliminar este estudio?')) {
      this.estudios.splice(index, 1); // Elimina el estudio del array local
  
      // Actualiza el backend con la lista actualizada de estudios
      this.actualizarService.agregarInformacionAcademica({
        numeroId: this.numeroId,
        estudios: this.estudios
      }).subscribe(
        response => {
          console.log('Estudio eliminado y lista actualizada:', response);
        },
        error => {
          console.error('Error al eliminar estudio:', error);
          this.mostrarAlerta = true; // Mostrar alerta en caso de error
        }
      );
    }
  }

  validarCamposObligatorios(): boolean {
    // Validación personalizada si es necesario
    return true; // Ajusta esto según los requisitos
  }

  submitForm() {
    if (this.validarCamposObligatorios()) {
      const datos = {
        numeroId: this.numeroId,
        estudios: this.estudios
      };

      this.actualizarService.agregarInformacionAcademica(datos).subscribe(
        response => {
          console.log('Información académica guardada:', response);
          this.navegarAEticaEmpresarial(); // Navegar solo después de la respuesta del backend
        },
        error => {
          console.error('Error al guardar información académica:', error);
          this.mostrarAlerta = true; // Mostrar alerta en caso de error
        }
      );
    } else {
      this.mostrarAlerta = true; // Mostrar alerta si no se validan los campos obligatorios
    }
  }

  navegarANucleoFamiliar(): void {
    this.actualizarService.setEstudios(this.estudios); // Guardar estudios antes de navegar
    this.router.navigate(['/nucleo-familiar']);
  }

  navegarAEticaEmpresarial(): void {
    this.actualizarService.setEstudios(this.estudios); // Guardar estudios antes de navegar
    this.router.navigate(['/etica-empresarial']);
  }

  cerrarAlerta() {
    this.mostrarAlerta = false;
  }
}


/* // informacion-academica.component.ts
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActualizarService } from '../../services/actualizar.service';

@Component({
  selector: 'app-informacion-academica',
  templateUrl: './informacion-academica.component.html',
  styleUrls: ['./informacion-academica.component.css']
})
export class InformacionAcademicaComponent implements OnInit {
  estudios: any[] = [];
  estudio = {
    tipoEstudio: '',
    titulo: ''
  };
  numeroId: string = '';
  mostrarAlerta: boolean = false;

  constructor(
    private router: Router,
    private actualizarService: ActualizarService
  ) {}

  ngOnInit(): void {
    this.numeroId = this.actualizarService.getNumeroId();
  }

  agregarEstudio(): void {
    console.log('Agregando estudio:', this.estudio);
    this.estudios.push({ ...this.estudio });
    this.estudio = {
      tipoEstudio: '',
      titulo: ''
    };
  }

  validarCamposObligatorios(): boolean {
    // Validación personalizada si es necesario
    return true; // Ajusta esto según los requisitos
  }

  submitForm() {
    if (this.validarCamposObligatorios()) {
      const datos = {
        numeroId: this.numeroId,
        estudios: this.estudios
      };

      this.actualizarService.agregarInformacionAcademica(datos).subscribe(
        response => {
          console.log('Información académica guardada:', response);
          this.navegarAEticaEmpresarial(); // Navegar solo después de la respuesta del backend
        },
        error => {
          console.error('Error al guardar información académica:', error);
          this.mostrarAlerta = true; // Mostrar alerta en caso de error
        }
      );
    } else {
      this.mostrarAlerta = true; // Mostrar alerta si no se validan los campos obligatorios
    }
  }

  navegarANucleoFamiliar(): void {
    this.router.navigate(['/nucleo-familiar']);
  }

  navegarAEticaEmpresarial(): void {
    this.router.navigate(['/etica-empresarial']);
  }

  cerrarAlerta() {
    this.mostrarAlerta = false;
  }
} */




