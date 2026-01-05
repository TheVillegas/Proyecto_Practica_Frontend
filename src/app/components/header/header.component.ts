import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) {
    // Escuchar cambios de ruta para actualizar el segmento activo
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.updateActiveSegment(event.urlAfterRedirects);
    });
  }

  // Variable para saber qué botón pintar como activo ('home', 'busqueda', 'generar')
  @Input() activeSegment: string = 'home';

  ngOnInit() {
    this.updateActiveSegment(this.router.url);
  }

  private updateActiveSegment(url: string) {
    if (url.includes('/home')) {
      this.activeSegment = 'home';
    } else if (url.includes('/busqueda-ali')) {
      this.activeSegment = 'busqueda';
    } else if (url.includes('/generar-ali-basico')) {
      this.activeSegment = 'generar';
    } else if (url === '/') {
      this.activeSegment = 'home';
    }
  }

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
    this.router.navigate(["/home"]);
  }

  goToLogin() {
    console.log("Redirigiendo a Login");
    this.router.navigate(["/login"]);
  }

}
