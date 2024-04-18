import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { enviroments } from 'src/enviroments/enviroments';

@Injectable({providedIn: 'root'})
export class HeroesService {
  constructor(private http: HttpClient) { }

  private baseUrl: string = enviroments.baseUrl;

  getHeroes():Observable<Hero[]>  {
    return this.http.get<Hero[]>(`${ this.baseUrl}/heroes`);
  }

  getHeroById( id: string): Observable < Hero|undefined> {
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${ id }`)
      .pipe(
        //? El "of" se importa de RXJS, devulve un observable
        catchError( error => of (undefined))
        );
  }

  getSuggestions( query: string ): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes/?q=${ query }&_limit=6`);
  }

  //! METODOS DE HTTP

  //? Metodo POST (solicita la creación de un nuevo registro)
  addHero( hero:Hero ): Observable<Hero> {
    return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero)
  }

  //? Metodo PATCH (actualiza solo un fragmento del registro,no en su totalidad)
  updateHero( hero:Hero ): Observable<Hero> {
    if(!hero.id)  throw Error ('Hero ID is required.')
    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${ hero.id }`, hero)
  }

  //? Metodo DELETE (elimina un registro existente)
  deleteHeroById( id:string): Observable<boolean>{
    return this.http.delete(`${this.baseUrl}/heroes/${ id }`)
      .pipe (
        map( resp => true ),
        catchError( err => of (false) ),
      );
  }


}
