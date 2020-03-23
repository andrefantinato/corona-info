import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from '../globals';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  )
};

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient, private globals: Globals) { }

  getFeed (link: string): Observable<any> {
    return this.http.get<any>(`${link}`, httpOptions)
      .pipe(
        catchError(this.handleError('getFeed', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      this.globals.finished = true;

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
