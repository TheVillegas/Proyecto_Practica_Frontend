import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-titulos-reportes',
  templateUrl: './titulos-reportes.component.html',
  styleUrls: ['./titulos-reportes.component.scss'],
  standalone: false
})
export class TitulosReportesComponent implements OnInit {

  @Input() codigoALI: string = '';
  @Input() estadoTPA: string = '';
  constructor() { }


  ngOnInit() { }

  getColorID(id: string): string {
    return 'primary';
  }


  getColorEstado(estado: string): string {
    const estadoNorm = estado.toString().toUpperCase();
    switch (estadoNorm) {
      case 'VERIFICADO': return 'primary';
      case 'BORRADOR': return 'light';
      case 'NO REALIZADO': return 'secondary';
      default: return 'secondary';
    }
  }

}
