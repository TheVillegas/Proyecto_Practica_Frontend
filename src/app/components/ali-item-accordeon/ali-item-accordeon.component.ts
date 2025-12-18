import { Component, Input, OnInit } from '@angular/core';
import { ALI } from '../../interfaces/ali';
import { Router } from '@angular/router';
import { query } from '@angular/animations';
@Component({
  selector: 'app-ali-item-accordeon',
  templateUrl: './ali-item-accordeon.component.html',
  styleUrls: ['./ali-item-accordeon.component.scss'],
  standalone: false
})
export class ALIItemAccordeonComponent implements OnInit {

  @Input() muestra!: ALI;

  constructor(private router: Router) { }

  ngOnInit() { }

  getColorEstado(estado: string | undefined): string {
    if (!estado) {
      return 'badge-rojo';
    }
    const estadoNormalizado = estado.trim().toUpperCase();

    switch (estadoNormalizado) {
      case 'VERIFICADO':
        return 'badge-azul';

      case 'BORRADOR':
        return 'badge-gris';

      case 'NO REALIZADO':
      case 'NO_REALIZADO':
        return 'badge-rojo';

      default:
        return 'badge-rojo';
    }
  }
  goToReporteTPA() {
    console.log("Redirigiendo a Reporte TPA");
    console.log(this.muestra.ALIMuestra);
    //cambiar el query params una vez implementado el backend
    this.router.navigate(["/reporte-tpa", this.muestra.ALIMuestra], { queryParams: { estadoTPA: this.muestra.reporteTPA.estado } });
  }

  goToReporteRAM() {
    console.log("Redirigiendo a Reporte RAM");
    console.log(this.muestra.ALIMuestra);
    //cambiar el query params una vez implementado el backend
    this.router.navigate(["/reporte-ram", this.muestra.ALIMuestra], { queryParams: { estadoRAM: this.muestra.reporteRAM.estado } });
  }

}
