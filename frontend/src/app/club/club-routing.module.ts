import { NgModule } from '@angular/core';
import {SportComponent} from "../sport/sports/sport.component";
import {SingleSportComponent} from "../sport/single-sport/single-sport.component";
import {Route, RouterModule} from "@angular/router";
import {ClubComponent} from "./clubs/club.component";



const routes : Route[] = [
  {path:'',component:ClubComponent},
  {path:':id',component:SingleSportComponent},

];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ClubRoutingModule { }
