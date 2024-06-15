import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreditComponent } from './credit/credit.component';
import { DebitComponent } from './debit/debit.component';
import { LoopComponent } from './loop/loop.component';
import { FormComponent } from './form/form.component';
import { FormsModule } from '@angular/forms';
import { PostComponent } from './post/post.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TestComponent } from './test/test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    CreditComponent,
    DebitComponent,
    LoopComponent,
    FormComponent,
    PostComponent,
    LoginComponent,
    NavbarComponent,
    TestComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
