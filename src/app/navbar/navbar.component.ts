import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isLogin = false
  sessionUser = {id:0,username:''}

  constructor(
    private router: Router,
    private cookieService: CookieService
  ) { 
  }  

  logout() {
    this.cookieService.delete('session_token')
    this.cookieService.delete('session_user')
    this.router.navigate(['/auth/login']);

  }

  ngOnInit() {
    const session_user = this.cookieService.get('session_user')
    if(session_user && session_user !== '') {
      const parsejson = JSON.parse(session_user)
      this.sessionUser = {id:parsejson.id ?? 0,username:parsejson.username ?? '-'}
      this.isLogin = true
    }else{
      this.sessionUser = {id:0,username:''}
      this.isLogin = false
    }
  }

}
