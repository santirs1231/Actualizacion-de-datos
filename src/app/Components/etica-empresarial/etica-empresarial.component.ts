import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActualizarService } from '../../services/actualizar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-etica-empresarial',
  templateUrl: './etica-empresarial.component.html',
  styleUrls: ['./etica-empresarial.component.css']
})
export class EticaEmpresarialComponent implements OnInit {
  empleados: string = '';
  proveedores: string = '';
  clientesMayoristas: string = '';
  autorizacion: boolean = false;
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
      this.empleados.trim() !== '' &&
      this.proveedores.trim() !== '' &&
      this.clientesMayoristas.trim() !== '' &&
      this.autorizacion
    );
  }

  mostrarMensaje() {
    const mensaje = `Mediante el registro de mis datos personales autorizo a JOHN URIBE S.A, con NIT 811018676 (en adelante la “Compañía”)y a las sociedades en las que ésta tenga participación, con las que se fusione o integren cualquiera sea la forma jurídica y las que se creen como resultado de una escisión, para que: recolecten, almacenen, usen, intercambien, consulten, transfieran, transmitan, actualicen y procesen mis datos personales y en general todos los datos por mi suministrados en virtud de la relación laboral existente o que llegaré a existir con estas sociedades, así como respecto de la información que posteriormente me sea solicitada en sus instalaciones, tiendas y/o eventos, que será utilizada para la realización de las siguientes finalidades: (i) Adelantar procesos de selección. (ii) Desarrollar y ejecutar la relación laboral de llegarse a celebrar. (iii) Enviar información por cualquier medio conocido o por conocer (correo electrónico, físico, SMS, llamadas telefónicas, mensaje de datos, Whatsapp o demás aplicaciones de mensajería instantánea, entre otros) acerca de procesos de selección, ejecución de contratos laborales, incapacidades, pagos, campañas, información de productos y servicios, notificaciones de actividades, promociones, ofertas y lanzamientos. (iv) Realizar programas y actividades de formación y capacitación. (v) Realizar evaluaciones y valoraciones de desempeño. (vi) Emitir referencias laborales y/o comerciales cuando el titular lo requiera. (vii) Validar las referencias laborales y/o comerciales que el titular hubiese aportado. (viii) Suministrar información personal de carácter comercial, para la ejecución de las relaciones contractuales adquiridas por las sociedades con terceros. (ix) Actualizar datos personales. (x) Reportar información comercial o financiera. Las finalidades anteriores se efectuarán con el alcance y en los términos indicados en la Política de Tratamiento de Datos Personales que podré consultar enviando un correo electrónico a Las finalidades anteriores se efectuarán con el alcance y en los términos indicados en la Política de Tratamiento de Datos Personales que podré consultar enviando un correo electrónico a datospersonalesgco@gco.com.co.
                    Dentro de los datos que autorizo recolectar y tratar se encuentran datos sensibles y de menores de edad, por lo que reconozco que la Compañía me ha informado que el suministro de tales datos será facultativo. En virtud de lo anterior, autorizo a la Compañía para recolectar mis exámenes médicos de ingreso y egreso, información médica relativa a incapacidades, información de los miembros de mi familia incluidos mis hijos menores de edad requerida para trámites de vinculación al sistema de seguridad social, incluida pero sin limitarse a sus nombres, edades, número de identificación, registros civiles. Autorizo también el tratamiento de mis datos biométricos en especial el de tomas fílmicas o fotográficas y de mi huella para efectos de la implementación y uso de sistemas de ingreso y seguridad, realización de audiencias de descargos, acuerdos de transacción, liquidación de prestación sociales, suscripción (firma) de documentos (contratos, acuerdos, convenios) con contenido comercial o jurídico, autenticación de acceso a sistemas de información, que requieran autenticación biométrica.
                    Declaro que he sido informado de que podré: acceder, conocer, actualizar, rectificar y suprimir mis Datos Personales (siempre que no exista un deber legal o contractual de permanecer en la base de datos); acceder en forma gratuita a mis datos personales; presentar ante la Superintendencia de Industria y Comercio, quejas por infracciones a lo dispuesto en la Ley 1581 de 2012; solicitar prueba de la autorización otorgada, derechos que podré ejercer enviando un correo electrónico a datospersonalesgco@gco.com.co .`;
    Swal.fire({
      title: 'Autorización',
      html: mensaje,
      icon: 'success'
    });
  }

  enviarFormulario() {
    if (this.validarCamposObligatorios()) {
      const eticaEmpresarialData = {
        numeroId: this.numeroId,
        empleados: this.empleados,
        proveedores: this.proveedores,
        clientesMayoristas: this.clientesMayoristas,
        autorizacion: this.autorizacion
      };

      this.actualizarService.agregarEticaEmpresarial(eticaEmpresarialData).subscribe(
        response => {
          console.log('Datos de ética empresarial agregados:', response);
          Swal.fire({
            title: 'Éxito',
            text: 'Datos de ética empresarial actualizados correctamente.',
            icon: 'success'
          }).then(() => {
            this.navegarAActualizar();
          });
        },
        error => {
          console.error('Error al agregar datos de ética empresarial:', error);
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al enviar los datos.',
            icon: 'error'
          });
        }
      );
    } else {
      this.mostrarAlerta = true;
    }
  }

  navegarAActualizar(): void {
    this.router.navigate(['/actualizar']);
  }

  navegarAInformacionAcademica(): void {
    this.router.navigate(['/informacion-academica']);
  }

  cerrarAlerta() {
    this.mostrarAlerta = false;
  }
}




