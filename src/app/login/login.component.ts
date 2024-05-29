import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
// import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading:boolean = false
  username: string = ""
  password: string = ""

  constructor(
    private router: Router,
    private authService: AuthService,
    private titleService:Title,
    private cookieService: CookieService
  ) { 
    this.titleService.setTitle("AUTH TITLE");
  }  

  reset() {
    console.log('[RESET]')
    this.isLoading = false
    this.username = ''
    this.password = ''
  }


  async onLogin() {
    try {
      Swal.fire({
        title: 'Please Wait',
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
      });
      Swal.showLoading();
      const loginResult = await this.authService.Login(this.username, this.password);
      if (loginResult instanceof Observable) {
            loginResult.subscribe({
              next: (data:any) => {
                if(data.errorStatus === true) {
                  console.log('[FAIL] Login:', data.error.message ?? '-');
                  Swal.fire({
                    icon: 'error',
                    title: "FAIL",
                    text: "Login fail"
                  })
                }else{
                  const secureFlag = false
                  this.cookieService.set('session_token', data.token, 1 , '/', 'localhost', secureFlag, "Lax" );

                  console.log('[SUCCESS] Login:', data);
                  Swal.fire({
                    icon: 'success',
                    title: "SUCCESS",
                    text: "Login complete"
                  })
                  this.router.navigate(['/post']);
                  this.reset()
                }
              },
              error: (err:any) => {
                console.error('[ERROR] Login 01:', err);
              }
            });
      } else {
          console.error('[ERROR] Login 02:', loginResult);
      }
    } catch (error) {
      console.error('[ERROR] Login 03:', error);
      this.reset()
    }
 }

}
