import { Component, Input, OnInit } from '@angular/core';
import { ALI } from '../../interfaces/ali';
import { AliService } from '../../services/ali-service';
import { Router } from '@angular/router';
import { query } from '@angular/animations';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-ali-item-accordeon',
  templateUrl: './ali-item-accordeon.component.html',
  styleUrls: ['./ali-item-accordeon.component.scss'],
  standalone: false
})
export class ALIItemAccordeonComponent implements OnInit {

  @Input() muestra!: ALI;
  isExpanded: boolean = false;

  constructor(private router: Router, private aliService: AliService, private alertController: AlertController) { }

  ngOnInit() { }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  guardarObservaciones() {
    this.aliService.updateObservacionesGenerales(this.muestra.ALIMuestra, this.muestra.observacionesGenerales);
    // Opcional: Agregar feedback visual como un toast
    console.log('Observaciones guardadas para la muestra', this.muestra.ALIMuestra);
  }

  async eliminarALI(event: Event) {
    event.stopPropagation();
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: `¿Está seguro de que desea eliminar el ALI con ID ${this.muestra.CodigoSerna || this.muestra.ALIMuestra}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.aliService.eliminarMuestra(this.muestra.ALIMuestra);
          }
        }
      ]
    });
    await alert.present();
  }

  getColorEstado(estado: string | undefined): string {
    if (!estado) {
      return 'bg-[#C41D1D]/10 text-[#C41D1D] border-[#C41D1D]/20';
    }
    const estadoNormalizado = estado.trim().toUpperCase();

    switch (estadoNormalizado) {
      case 'VERIFICADO':
        // Azul del header (brand-primary)
        return 'bg-blue-50 text-brand-primary border-blue-100';

      case 'BORRADOR':
        // Gris text-muted #64748b
        return 'bg-[#64748b]/10 text-[#64748b] border-[#64748b]/20';

      case 'NO REALIZADO':
      case 'NO_REALIZADO':
        // Rojo danger #C41D1D
        return 'bg-[#C41D1D]/10 text-[#C41D1D] border-[#C41D1D]/20';

      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  }

  getContainerStyle(estado: string | undefined): string {
    if (!estado) return 'hover:bg-gray-50 border-transparent hover:border-gray-100';

    const estadoNormalizado = estado.trim().toUpperCase();
    switch (estadoNormalizado) {
      case 'VERIFICADO':
        return 'bg-blue-50/50 border-blue-100/50';
      case 'BORRADOR':
        return 'bg-[#64748b]/5 border-[#64748b]/20';
      case 'NO REALIZADO':
      case 'NO_REALIZADO':
        return 'bg-[#C41D1D]/5 border-[#C41D1D]/20';
      default:
        return 'hover:bg-gray-50 border-transparent hover:border-gray-100';
    }
  }
  goToReporteTPA(event?: Event) {
    if (event) event.stopPropagation();
    console.log("Redirigiendo a Reporte TPA");
    console.log(this.muestra.ALIMuestra);
    //cambiar el query params una vez implementado el backend
    this.router.navigate(["/reporte-tpa", this.muestra.ALIMuestra], { queryParams: { estadoTPA: this.muestra.reporteTPA.estado } });
  }

  goToReporteRAM(event?: Event) {
    if (event) event.stopPropagation();
    console.log("Redirigiendo a Reporte RAM");
    console.log(this.muestra.ALIMuestra);
    //cambiar el query params una vez implementado el backend
    this.router.navigate(["/reporte-ram", this.muestra.ALIMuestra], { queryParams: { estadoRAM: this.muestra.reporteRAM.estado } });
  }

}
