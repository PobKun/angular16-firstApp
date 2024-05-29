import { inject } from "@angular/core";
import { CanActivateFn, Router, UrlTree } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from "src/app/auth.service";
import { CookieService } from 'ngx-cookie-service';

export const isLogin: CanActivateFn = (route, _state): Observable<boolean | UrlTree> => {
    const router = inject(Router)
    const auth = inject(AuthService)
    const cookieService:CookieService
    // constructor(private cookieService : CookieService){}

    // const token = route.params['token'];
    // const token = cookieService.get('session_token') 
    if (!token) {
      return of(router.parseUrl('/auth/login')); // No token found
    }

    fetchVerifyToken(): {status:boolean,message: string,data:any} {
        const session_token = this.cookieService.get('session_token')
        if(session_token && session_token !== '') {
          return {status: true,message: 'VERIFY SUCCESS',data: null}
        }else{
          return {status: false,message: 'FAIL',data: null}
        }
      }

    router.parseUrl('/auth/login')

  
    // auth.authenticate(token).pipe(
    //   map(response => {
    //     if (response && response.status === 200) {
    //       return router.parseUrl('/'); // Authentication successful
    //     } else {
    //       return router.parseUrl('/error'); // Authentication failed
    //     }
    //   })
    // );

    return of(false);
  };