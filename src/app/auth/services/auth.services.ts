import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { enviroments } from 'src/enviroments/enviroments';
import { User } from '../interfaces/user.interfaces';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = enviroments.baseUrl;
  private user?: User;
  
  constructor(private http: HttpClient) { }

  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  //? Metodo de login
  login(email: string, password: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        // tap( user => localStorage.setItem('token', user.id.toString() )),
        tap(user => localStorage.setItem('token', 'tk6846.g6h5h8j6.584h685gf')),
      )
  }

  //? Chequeo si tengo el token cargado
  checkAuthentication(): Observable<boolean> {
    console.log('checkAuthentication');

    //? si no tengo token, no está autenticado
    if (!localStorage.getItem('token')) return of (false);

    //? Busco el token en el local storage
    const token= localStorage.getItem('token');

    return this.http.get<User>(`${this.baseUrl}/user/1`)
      .pipe (
        tap( user => this.user = user),
        map( user => !!user ), //? al comparar con doble negacion, siempre devuelvo boleanos
        catchError( err => of (false))
      );
  }


  //?Metodo de Logout. por ahora limpio el local storage
  logout() {
    localStorage.clear();
  }

}

