import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Analista } from '../interfaces/analista';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) { }


  //Metodos de login 
  login(email: string, contraseña: string): Observable<any> {
    //Metodo de login Real
    //return this.http.post<Analista>('/api/analistas', data);

    return of(true).pipe(
      tap(() => {
        console.log("Datos del Usuario");
        console.log("Email :", email);
        console.log("Contraseña :", contraseña);
      })
    )
  }

  //metodos de Registro


  register(data: Analista): Observable<any> {
    //Metodo de registro Real
    //return this.http.post<Analista>('/api/analistas', data);


    return of(true).pipe(
      tap(() => {
        console.log("Datos del Usuario", data);
      })
    )
  }
}
