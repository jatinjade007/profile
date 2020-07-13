import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, from } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'https://app.fakejson.com/q/39qk0Byg?token=5Yhg2amZDinB9lmayECjhQ';  // URL to web api



  constructor(private http: HttpClient,) { }

  getUser(): Observable<User> {
    console.log("hahahah")
    return this.http.get<User>(this.url);
  }

  /*

  getUser(): Observable<User[]> {
    console.log("hahahah")
    return this.http.get<User[]>(this.url)
      .pipe(
        tap(_ => console.log('fetched heroes')),
        catchError(this.handleError<User[]>('getHeroes', []))
      );
  }

/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 *
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
*/
}
