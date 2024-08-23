import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActualizarService } from '../../services/actualizar.service';

@Component({
  selector: 'app-nucleo-familiar',
  templateUrl: './nucleo-familiar.component.html',
  styleUrls: ['./nucleo-familiar.component.css']
})
export class NucleoFamiliarComponent implements OnInit {
  nucleoFamiliar: any[] = [];
  integrante = {
    viveSolo: 'NO',
    parentesco: '',
    nombres: '',
    apellidos: '',
    edad: ''
  };

  mascotas: any[] = [];
  mascota = {
    tipoMascota: 'NO TENGO',
    nombreMascota: '',
    especificarMascota: ''
  };

  mostrarNombreMascota: boolean = false;
  mostrarEspecificarMascota: boolean = false;
  numeroId: string = '';
  mostrarAlerta: boolean = false;

  constructor(
    private router: Router,
    private actualizarService: ActualizarService
  ) {}

  ngOnInit() {
    this.numeroId = this.actualizarService.getNumeroId(); // Obtiene el numeroId del servicio
    this.nucleoFamiliar = this.actualizarService.getNucleoFamiliar(); // Obtiene núcleo familiar almacenado temporalmente
    this.mascotas = this.actualizarService.getMascotas(); // Obtiene mascotas almacenadas temporalmente
  }

  onTipoMascotaChange(): void {
    this.mostrarNombreMascota = this.mascota.tipoMascota !== 'NO TENGO';
    this.mostrarEspecificarMascota = this.mascota.tipoMascota === 'OTRO';
    if (!this.mostrarNombreMascota) {
      this.mascota.nombreMascota = '';
    }
    if (!this.mostrarEspecificarMascota) {
      this.mascota.especificarMascota = '';
    }
  }

  agregarFamiliar(): void {
    console.log('Agregando familiar:', this.integrante);
    if (this.integrante.viveSolo === 'SI') {
      this.integrante.parentesco = 'Vive solo';
      this.integrante.nombres = 'NO APLICA';
      this.integrante.apellidos = 'NO APLICA';
      this.integrante.edad = 'NO APLICA';
    }
    this.nucleoFamiliar.push({ ...this.integrante });
    this.integrante = {
      viveSolo: 'NO',
      parentesco: '',
      nombres: '',
      apellidos: '',
      edad: ''
    };
  }

  agregarMascota(): void {
    console.log('Agregando mascota:', this.mascota);
    if (this.mascota.tipoMascota === 'NO TENGO') {
      this.mascota.tipoMascota = 'NO TENGO';
      this.mascota.nombreMascota = 'NO APLICA';
      this.mascota.especificarMascota = 'NO APLICA';
    }
    this.mascotas.push({ ...this.mascota });
    this.mascota = {
      tipoMascota: 'NO TENGO',
      nombreMascota: '',
      especificarMascota: ''
    };
  }

  //se modifico
  eliminarIntegrante(index: number) {
    if (confirm('¿Está seguro de que desea eliminar este integrante?')) {
      this.nucleoFamiliar.splice(index, 1); // Elimina el integrante del array local
  
      // Actualiza el backend con la lista actualizada de integrantes
      this.actualizarService.agregarNucleoFamiliar(this.numeroId, this.nucleoFamiliar).subscribe(
        response => {
          console.log('Integrante eliminado y lista actualizada:', response);
        },
        error => {
          console.error('Error al eliminar integrante:', error);
          this.mostrarAlerta = true; // Mostrar alerta en caso de error
        }
      );
    }
  }

  eliminarMascota(index: number) {
    if (confirm('¿Está seguro de que desea eliminar esta mascota?')) {
      this.mascotas.splice(index, 1); // Elimina la mascota del array local
  
      // Actualiza el backend con la lista actualizada de mascotas
      this.actualizarService.agregarMascotas(this.numeroId, this.mascotas).subscribe(
        response => {
          console.log('Mascota eliminada y lista actualizada:', response);
        },
        error => {
          console.error('Error al eliminar mascota:', error);
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
      // Enviar núcleo familiar
      this.actualizarService.agregarNucleoFamiliar(this.numeroId, this.nucleoFamiliar).subscribe(
        response => {
          console.log('Núcleo familiar guardado:', response);
  
          // Enviar mascotas después de guardar el núcleo familiar
          this.actualizarService.agregarMascotas(this.numeroId, this.mascotas).subscribe(
            response => {
              console.log('Mascotas guardadas:', response);
              this.navegarAInformacionAcademica(); // Navegar solo después de la respuesta del backend
            },
            error => {
              console.error('Error al guardar mascotas:', error);
              this.mostrarAlerta = true; // Mostrar alerta en caso de error
            }
          );
        },
        error => {
          console.error('Error al guardar núcleo familiar:', error);
          this.mostrarAlerta = true; // Mostrar alerta en caso de error
        }
      );
    } else {
      this.mostrarAlerta = true; // Mostrar alerta si no se validan los campos obligatorios
    }
  }

  navegarAContactos(): void {
    this.actualizarService.setNucleoFamiliar(this.nucleoFamiliar); // Guardar núcleo familiar antes de navegar
    this.actualizarService.setMascotas(this.mascotas); // Guardar mascotas antes de navegar
    this.router.navigate(['/contactos']);
  }

  navegarAInformacionAcademica(): void {
    this.actualizarService.setNucleoFamiliar(this.nucleoFamiliar); // Guardar núcleo familiar antes de navegar
    this.actualizarService.setMascotas(this.mascotas); // Guardar mascotas antes de navegar
    this.router.navigate(['/informacion-academica']);
  }

  cerrarAlerta() {
    this.mostrarAlerta = false;
  }
}


/* import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActualizarService } from '../../services/actualizar.service';

@Component({
  selector: 'app-nucleo-familiar',
  templateUrl: './nucleo-familiar.component.html',
  styleUrls: ['./nucleo-familiar.component.css']
})
export class NucleoFamiliarComponent implements OnInit {
  nucleoFamiliar: any[] = [];
  integrante = {
    viveSolo: 'NO',
    parentesco: '',
    nombres: '',
    apellidos: '',
    edad: ''
  };

  mascotas: any[] = [];
  mascota = {
    tipoMascota: 'NO TENGO',
    nombreMascota: '',
    especificarMascota: ''
  };

  mostrarNombreMascota: boolean = false;
  mostrarEspecificarMascota: boolean = false;
  numeroId: string = '';
  mostrarAlerta: boolean = false;

  constructor(
    private router: Router,
    private actualizarService: ActualizarService
  ) {}

  ngOnInit() {
    this.numeroId = this.actualizarService.getNumeroId(); // Obtiene el numeroId del servicio
  }

  onTipoMascotaChange(): void {
    this.mostrarNombreMascota = this.mascota.tipoMascota !== 'NO TENGO';
    this.mostrarEspecificarMascota = this.mascota.tipoMascota === 'OTRO';
    if (!this.mostrarNombreMascota) {
      this.mascota.nombreMascota = '';
    }
    if (!this.mostrarEspecificarMascota) {
      this.mascota.especificarMascota = '';
    }
  }

  agregarFamiliar(): void {
    console.log('Agregando familiar:', this.integrante);
    if (this.integrante.viveSolo === 'SI') {
      this.integrante.parentesco = 'Vive solo';
      this.integrante.nombres = 'NO APLICA';
      this.integrante.apellidos = 'NO APLICA';
      this.integrante.edad = 'NO APLICA';
    }
    this.nucleoFamiliar.push({ ...this.integrante });
    this.integrante = {
      viveSolo: 'NO',
      parentesco: '',
      nombres: '',
      apellidos: '',
      edad: ''
    };
  }

  agregarMascota(): void {
    console.log('Agregando mascota:', this.mascota);
    if (this.mascota.tipoMascota === 'NO TENGO') {
      this.mascota.tipoMascota = 'NO TENGO';
      this.mascota.nombreMascota = 'NO APLICA';
      this.mascota.especificarMascota = 'NO APLICA';
    }
    this.mascotas.push({ ...this.mascota });
    this.mascota = {
      tipoMascota: 'NO TENGO',
      nombreMascota: '',
      especificarMascota: ''
    };
  }

  validarCamposObligatorios(): boolean {
    // Validación personalizada si es necesario
    return true; // Ajusta esto según los requisitos
  }

  submitForm() {
    if (this.validarCamposObligatorios()) {
      // Enviar núcleo familiar
      this.actualizarService.agregarNucleoFamiliar(this.numeroId, this.nucleoFamiliar).subscribe(
        response => {
          console.log('Núcleo familiar guardado:', response);
  
          // Enviar mascotas después de guardar el núcleo familiar
          this.actualizarService.agregarMascotas(this.numeroId, this.mascotas).subscribe(
            response => {
              console.log('Mascotas guardadas:', response);
              this.navegarAInformacionAcademica(); // Navegar solo después de la respuesta del backend
            },
            error => {
              console.error('Error al guardar mascotas:', error);
              this.mostrarAlerta = true; // Mostrar alerta en caso de error
            }
          );
        },
        error => {
          console.error('Error al guardar núcleo familiar:', error);
          this.mostrarAlerta = true; // Mostrar alerta en caso de error
        }
      );
    } else {
      this.mostrarAlerta = true; // Mostrar alerta si no se validan los campos obligatorios
    }
  }

  navegarAContactos(): void {
    this.router.navigate(['/contactos']);
  }

  navegarAInformacionAcademica(): void {
    this.router.navigate(['/informacion-academica']);
  }

  cerrarAlerta() {
    this.mostrarAlerta = false;
  }
}
 */




