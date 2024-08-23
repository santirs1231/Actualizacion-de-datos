import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActualizarService } from '../../services/actualizar.service';

@Component({
  selector: 'app-hijos',
  templateUrl: './hijos.component.html',
  styleUrls: ['./hijos.component.css']
})
export class HijosComponent implements OnInit {
  hijos: any = {
    tieneHijos: '',
    nombres: '',
    apellidos: '',
    fechaNacimiento: '',
    numeroDocumento: '',
    tipoDocumento: '',
    sexo: '',
    viveConEmpleado: ''
  };

  mostrarAlerta: boolean = false;
  hijosList: any[] = [];
  numeroId: string = '';

  constructor(
    private router: Router,
    private actualizarService: ActualizarService
  ) { }

  ngOnInit() {
    this.numeroId = this.actualizarService.getNumeroId(); // Obtiene el numeroId del servicio
    this.hijosList = this.actualizarService.getHijos(); // Obtiene hijos almacenados temporalmente
  }

  validarCamposObligatorios(): boolean {
    if (!this.hijos.tieneHijos) {
      return false;
    }

    if (this.hijos.tieneHijos === 'si') {
      return (
        this.hijos.nombres &&
        this.hijos.apellidos &&
        this.hijos.fechaNacimiento &&
        this.hijos.numeroDocumento &&
        this.hijos.tipoDocumento &&
        this.hijos.sexo &&
        this.hijos.viveConEmpleado
      );
    }
    return true;
  }

  submitForm() {
    if (this.hijos.tieneHijos === 'no') {
      this.hijosList.push({
        tieneHijos: 'no',
        nombres: 'No aplica',
        apellidos: 'No aplica',
        fechaNacimiento: 'No aplica',
        numeroDocumento: 'No aplica',
        tipoDocumento: 'No aplica',
        sexo: 'No aplica',
        viveConEmpleado: 'No aplica'
      });
    }

    if (this.validarCamposObligatorios()) {
      if (this.hijos.tieneHijos === 'si') {
        this.hijosList.push({ ...this.hijos });
      }

      this.actualizarService.agregarHijos({ hijos: this.hijosList, numeroId: this.numeroId }).subscribe(
        response => {
          console.log('Hijos guardados: ', response);
          this.navegarAContactos(); // Navegar solo después de la respuesta del backend
        },
        error => {
          console.error('Error al guardar hijos: ', error);
        }
      );
    } else {
      this.mostrarAlerta = true;
    }
  }

  agregarHijos() {
    if (this.validarCamposObligatorios()) {
      if (this.hijos.tieneHijos === 'si') {
        console.log('Agregando hijo:', this.hijos);
        this.hijosList.push({ ...this.hijos });
        this.hijos = {
          tieneHijos: this.hijos.tieneHijos,
          nombres: '',
          apellidos: '',
          fechaNacimiento: '',
          numeroDocumento: '',
          tipoDocumento: '',
          sexo: '',
          viveConEmpleado: ''
        };
        this.mostrarAlerta = false;
      } else {
        this.mostrarAlerta = true;
      }
    } else {
      this.mostrarAlerta = true;
    }
  }

  //se modifico
  eliminarHijo(index: number) {
    if (confirm('¿Está seguro de que desea eliminar este hijo?')) {
      this.hijosList.splice(index, 1); // Elimina el hijo del array local
  
      // Actualiza el backend con la lista actualizada de hijos
      this.actualizarService.agregarHijos({ hijos: this.hijosList, numeroId: this.numeroId }).subscribe(
        response => {
          console.log('Hijo eliminado y lista actualizada:', response);
        },
        error => {
          console.error('Error al eliminar hijo:', error);
        }
      );
    }
  }
  

  navegarAExperiencia(): void {
    this.actualizarService.setHijos(this.hijosList); // Guardar hijos antes de navegar
    this.router.navigate(['/experiencia']);
  }

  navegarAContactos() {
    if (this.validarCamposObligatorios()) {
      this.actualizarService.setHijos(this.hijosList); // Guardar hijos antes de navegar
      this.router.navigate(['/contactos']);
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
  selector: 'app-hijos',
  templateUrl: './hijos.component.html',
  styleUrls: ['./hijos.component.css']
})
export class HijosComponent implements OnInit {
  hijos: any = {
    tieneHijos: '',
    nombres: '',
    apellidos: '',
    fechaNacimiento: '',
    numeroDocumento: '',
    tipoDocumento: '',
    sexo: '',
    viveConEmpleado: ''
  };

  mostrarAlerta: boolean = false;
  hijosList: any[] = [];
  numeroId: string = '';

  constructor(
    private router: Router,
    private actualizarService: ActualizarService
  ) { }

  ngOnInit() {
    this.numeroId = this.actualizarService.getNumeroId(); // Obtiene el numeroId del servicio
  }

  validarCamposObligatorios(): boolean {
    if (!this.hijos.tieneHijos) {
      return false;
    }

    if (this.hijos.tieneHijos === 'si') {
      return (
        this.hijos.nombres &&
        this.hijos.apellidos &&
        this.hijos.fechaNacimiento &&
        this.hijos.numeroDocumento &&
        this.hijos.tipoDocumento &&
        this.hijos.sexo &&
        this.hijos.viveConEmpleado
      );
    }
    return true;
  }

  submitForm() {
    if (this.hijos.tieneHijos === 'no') {
      this.hijosList.push({
        tieneHijos: 'no',
        nombres: 'No aplica',
        apellidos: 'No aplica',
        fechaNacimiento: 'No aplica',
        numeroDocumento: 'No aplica',
        tipoDocumento: 'No aplica',
        sexo: 'No aplica',
        viveConEmpleado: 'No aplica'
      });
    }

    if (this.validarCamposObligatorios()) {
      if (this.hijos.tieneHijos === 'si') {
        this.hijosList.push({ ...this.hijos });
      }

      this.actualizarService.agregarHijos({ hijos: this.hijosList, numeroId: this.numeroId }).subscribe(
        response => {
          console.log('Hijos guardados: ', response);
          this.navegarAContactos(); // Navegar solo después de la respuesta del backend
        },
        error => {
          console.error('Error al guardar hijos: ', error);
        }
      );
    } else {
      this.mostrarAlerta = true;
    }
  }

  agregarHijos() {
    if (this.validarCamposObligatorios()) {
      if (this.hijos.tieneHijos === 'si') {
        console.log('Agregando hijo:', this.hijos);
        this.hijosList.push({ ...this.hijos });
        this.hijos = {
          tieneHijos: this.hijos.tieneHijos,
          nombres: '',
          apellidos: '',
          fechaNacimiento: '',
          numeroDocumento: '',
          tipoDocumento: '',
          sexo: '',
          viveConEmpleado: ''
        };
        this.mostrarAlerta = false;
      } else {
        this.mostrarAlerta = true;
      }
    } else {
      this.mostrarAlerta = true;
    }
  }

  navegarAExperiencia(): void {
    this.router.navigate(['/experiencia']);
  }

  navegarAContactos() {
    if (this.validarCamposObligatorios()) {
      this.router.navigate(['/contactos']);
    } else {
      this.mostrarAlerta = true;
    }
  }

  cerrarAlerta() {
    this.mostrarAlerta = false;
  }
}


 */
