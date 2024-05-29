import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL_LOGIN = 'https://dummyjson.com/auth/login';
  URL_VERIFY_TOKEN = 'https://dummyjson.com/auth/me';

  constructor(private http: HttpClient) {}

  async Login(username:string,password:string): Promise<Observable<any>|boolean> {
    try {
      const data = await this.http.post(this.URL_LOGIN, {
        username: username,
        password: password,
        expiresInMins: 30, // optional, defaults to 60
      }).pipe(
        catchError((error: any) => {
          // console.log(error.error.message);
          return of({ errorStatus: true, error: error.error });
        })
      );
      return data;
    } catch (error) {
      console.log('error:', error);
      return false;
    }
  }

  
  async VerifyToken(token:string): Promise<Observable<any>|boolean> {
      // return this.http.get(`${this.URL_VERIFY_TOKEN}`, { headers: { Accept: 'application/json',Authorization: `Bearer ${token}` } }).pipe(
      //   catchError((error: HttpErrorResponse) => {
      //     // console.error('Error:', error);
      //     return of(false);
      //   })
      // );
      try {
        const data = await this.http.get(this.URL_VERIFY_TOKEN,  { headers: { Accept: 'application/json',Authorization: `Bearer ${token}` } }).pipe(
          catchError((error: any) => {
            return of(false);
          })
        );
        return data;
      } catch (error) {
        console.log('error:', error);
        return false;
      }
  }
  
}
