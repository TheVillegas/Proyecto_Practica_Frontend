import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reporte-tpa',
  templateUrl: './reporte-tpa.page.html',
  styleUrls: ['./reporte-tpa.page.scss'],
  standalone: false
})
export class ReporteTPAPage implements OnInit {

  codigoALI: string = '';
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.codigoALI = this.route.snapshot.paramMap.get('codigoALI')!;
  }

}
