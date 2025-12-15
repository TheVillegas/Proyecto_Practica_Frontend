import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AliService } from 'src/app/services/ali-service';

@Component({
  selector: 'app-reporte-tpa',
  templateUrl: './reporte-tpa.page.html',
  styleUrls: ['./reporte-tpa.page.scss'],
  standalone: false
})
export class ReporteTPAPage implements OnInit {

  codigoALI: string = '';
  estadoTPA: string = '';
  constructor(private route: ActivatedRoute, private aliService: AliService) { }

  ngOnInit() {
    this.codigoALI = this.route.snapshot.paramMap.get('codigoALI')!;
    if (this.codigoALI) {
      this.estadoTPA = this.aliService.getEstadoTPA(parseInt(this.codigoALI));
    }
  }

}
