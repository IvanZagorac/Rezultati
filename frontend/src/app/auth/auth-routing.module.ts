import { NgModule } from '@angular/core';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {Route, RouterModule} from "@angular/router";



const routes : Route[] = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},

];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
