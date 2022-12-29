import { Injectable } from '@angular/core';
import { HEROES } from './mock-heroes';
// import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Message, Severity } from 'src/app/message';
import { Hero } from './store/hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';
  
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getHeroes(): Observable<Hero[]> {
    // this.messageService.add('HeroService: fetched heroes');
    return this.http.get<Hero[]>(`http://localhost:3000/heroes`)
      .pipe(
        catchError(this.handleError('getHeroes', []))
      );
  }

  private log(message: string) {
    const msg = new Message(`HeroService ${message}`, Severity.INFO, new Date(), null);
    this.messageService.add(msg);
  }

  private handleError<T> (operation = 'operation', result? : T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  updateHero(hero: Hero): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>(`update hero`))
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap((hero: Hero) => {
          this.log(`added hero with id=${hero.id}`)
        }),
        catchError(this.handleError<Hero>('addHero'))
      );
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    const id = typeof hero === 'number' ? hero: hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted hero with id = ${id}`)),
        catchError(this.handleError<Hero>(`deleteHero`))
      );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap(_ => this.log(`found heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>(`searchHeroes`, []))
      );
  }

  // restoreHeroes(): Hero[] {
  //   return HEROES;
  // }
}
