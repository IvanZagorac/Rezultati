import { NgModule } from '@angular/core';
import {Route, RouterModule, Routes} from '@angular/router';
import {SportComponent} from "./sport/sports/sport.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {AuthModule} from "./auth/auth.module";
import {SportModule} from "./sport/sport.module";
import {LeagueModule} from "./league/league.module";
import {ClubModule} from "./club/club.module";
import {AuthGuard} from "./auth.guard";

const routes : Route[] = [
  {path: '', redirectTo: '/sports', pathMatch: 'full' },
  {path:'auth',loadChildren: () => AuthModule},
  {path:'sports',loadChildren: () => SportModule},
  {path:'league',loadChildren: () => LeagueModule,canActivate:[AuthGuard]},
  {path:'club',loadChildren: () => ClubModule,canActivate:[AuthGuard]}
];
// ovo tsconfig : esnext
@NgModule({
  imports: [
    RouterModule.forRoot(routes,{useHash:true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
