import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
class PermissionsService {

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private authService: AuthService,
  ) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
      // await new Promise(resolve => setTimeout(resolve, 3000)); // 3 sec
     return new Promise(async (resolve) => {
        try {
          
          const session = this.cookieService.get('session_token')
          if(session && session !== '') {
            const verify = await this.authService.VerifyToken(session);
            if (verify instanceof Observable) {
              verify.subscribe({
                next: (data:any) => {
                  if(data !== false) {
                    // console.log(data);
                    // refresh token
                    const secureFlag = false
                    this.cookieService.set('session_token', session, 1 , '/', 'localhost', secureFlag, "Lax" );
                    this.cookieService.set('session_user', JSON.stringify(data), 1 , '/', 'localhost', secureFlag, "Lax" );

                    // if(state.url === '/auth/login') {
                    //   this.router.navigate(['/loop']);
                    // }else{
                      resolve(true);
                    // }
                  }else{
                    this.cookieService.delete('session_token')
                    this.cookieService.delete('session_user')
                    resolve(false);
                    this.router.navigate(['/auth/login']);
                  }
                },
                error: (err:any) => {
                  console.error('[ERROR] Verify 01:', err);
                  this.cookieService.delete('session_token')
                  this.cookieService.delete('session_user')
                  resolve(false);
                  this.router.navigate(['/auth/login']);
                }
              });
            }else{
              console.error('[ERROR] Verify 02');
              this.cookieService.delete('session_token')
              this.cookieService.delete('session_user')
              resolve(false);
              this.router.navigate(['/auth/login']);
            }
          }else{
            console.error('[ERROR] Verify 03')
            this.cookieService.delete('session_token')
            this.cookieService.delete('session_user')
            resolve(false);
            this.router.navigate(['/auth/login']);
          }
        }catch(e){
          console.error('[ERROR] Verify 04');
          this.cookieService.delete('session_token')
          this.cookieService.delete('session_user')
          resolve(false);
          this.router.navigate(['/auth/login']);
        }
      });
     
  }
}

export const AuthGuard: CanActivateFn = async (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> => {
  // return inject(PermissionsService).canActivate(next, state);
  const permissionsService = inject(PermissionsService);
  if (!permissionsService) {
    throw new Error('PermissionsService is not provided');
  }
  const returnValue = await permissionsService.canActivate(next, state)  
  return returnValue;
}