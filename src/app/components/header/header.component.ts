import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }

  busquedaALI() {
    console.log("Redirigiendo a Busqueda ALI");
    this.router.navigate(["/busqueda-ali"]);
  }

  generarALI() {
    console.log("Redirigiendo a Generar ALI");
    this.router.navigate(["/generar-ali-basico"]);
  }

  goToHome() {
    console.log("Redirigiendo a Home");
    //Faltaria agregar la dirreccion a la pagina
    this.router.navigate(["/home"]);
  }

  goToLogin() {
    console.log("Redirigiendo a Login");
    //Faltaria agregar la dirreccion a la pagina
    //this.router.navigate(["//(Nombre de la pagina)"]);
  }

  //Aca podemos agregar mas funciones Para el Header cuando se amplie el proyecto.

}
