import { Component, OnInit } from '@angular/core';
import { ALI } from '../../interfaces/ali';

@Component({
  selector: 'app-busqueda-ali',
  templateUrl: './busqueda-ali.page.html',
  styleUrls: ['./busqueda-ali.page.scss'],
  standalone: false
})
export class BusquedaALIPage implements OnInit {
  listaMuestras: ALI[] = [
    { ALIMuestra: 1, CodigoSerna: 123456, estadoTPA: 'Verificado', estadoRAM: 'No realizado' },
    { ALIMuestra: 2, CodigoSerna: 654321, estadoTPA: 'Borrador', estadoRAM: 'Borrador' },
    { ALIMuestra: 3, CodigoSerna: 111111, estadoTPA: 'No realizado', estadoRAM: 'Borrador' },
    { ALIMuestra: 1432, CodigoSerna: 2222, estadoTPA: 'Borrador', estadoRAM: 'Verificado' },
  ];

  listaFiltrada: any[] = [];

  constructor() { }

  ngOnInit() {
    this.listaFiltrada = this.listaMuestras;
  }

  buscarALI(event: any) {
    const textoBusqueda = event.target.value;

    if (textoBusqueda && textoBusqueda.trim() !== '') {
      this.listaFiltrada = this.listaMuestras.filter(muestra => {
        return (muestra.ALIMuestra.toString().toLowerCase().indexOf(textoBusqueda.toLowerCase()) > -1);
      });
    } else {
      this.listaFiltrada = this.listaMuestras;
    }
  }



}
