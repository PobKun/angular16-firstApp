import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'firstApp';
  status = 'ok';
  isLogin = false
  sessionUser = {id:0,username:''}

  constructor(
    private router: Router,
    private titleService:Title,
    private cookieService: CookieService
  ) {
    this.titleService.setTitle("HOME TITLE");
  }

  ngOnInit() {
    const session_user = this.cookieService.get('session_user')
    if(session_user && session_user !== '') {
      const parsejson = JSON.parse(session_user)
      this.sessionUser = {id:parsejson.id ?? 0,username:parsejson.username ?? '-'}
      this.isLogin = true
    }
  }
}
