import { Component, OnInit } from '@angular/core';
import { ALI } from '../../interfaces/ali';
import { AliService } from '../../services/ali-service';


@Component({
  selector: 'app-busqueda-ali',
  templateUrl: './busqueda-ali.page.html',
  styleUrls: ['./busqueda-ali.page.scss'],
  standalone: false
})
export class BusquedaALIPage implements OnInit {
  listaMuestras: ALI[] = [];

  listaFiltrada: ALI[] = [];

  constructor(private aliService: AliService) { }

  ngOnInit() {
    this.listaMuestras = this.aliService.getMuestras();
    this.listaFiltrada = this.listaMuestras;
  }

  buscarALI(event: any) {
    const texto = event.target.value;
    if (texto && texto.trim() !== '') {
      this.listaFiltrada = this.listaMuestras.filter(muestra => muestra.ALIMuestra.toString().includes(texto));
    } else {
      this.listaFiltrada = this.listaMuestras;
    }
  }



}
