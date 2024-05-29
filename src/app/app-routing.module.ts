import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditComponent } from './credit/credit.component';
import { LoopComponent } from './loop/loop.component';
import { FormComponent } from './form/form.component';
import { PostComponent } from './post/post.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'credit', component: CreditComponent, canActivate: [AuthGuard] },
  { path: 'loop', component: LoopComponent },
  { path: 'form', component: FormComponent },
  { path: 'post', component: PostComponent, canActivate: [AuthGuard] },
  { path: 'post/:id', component: PostComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
