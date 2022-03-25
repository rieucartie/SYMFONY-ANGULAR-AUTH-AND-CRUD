import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { ListArticleComponent } from './user/list-articles/ListArticleComponent';
import { Error404Component } from './error404/error404.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
  {path: '/articles', redirectTo: 'localhost:8000/api/articles', pathMatch: 'full' },
  
  {path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: "articles",
    component: ListArticleComponent,
    canActivate: [AuthGuard]
  },
  {path: '**', component: Error404Component },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthModule,
    CommonModule
  ],
  exports: [RouterModule],
  declarations: [Error404Component]
})
export class AppRoutingModule {}
