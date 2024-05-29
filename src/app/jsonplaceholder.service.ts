import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse} from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonplaceholderService {

  URL_POST = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient) {}
  getPost(): Observable<any> {
    return this.http.get(this.URL_POST, { headers: { Accept: 'application/json' } }).pipe(
      catchError((error: HttpErrorResponse) => {
        // console.error('Error:', error);
         return of(false);
      })
    );
  }

  getPostById(id:number): Observable<any> {
    return this.http.get(`${this.URL_POST}/${id}`, { headers: { Accept: 'application/json' } }).pipe(
      catchError((error: HttpErrorResponse) => {
        // console.error('Error:', error);
         return of(false);
      })
    );
  }



}
