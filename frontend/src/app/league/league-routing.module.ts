import { NgModule } from '@angular/core';
import {LeagueComponent} from "./leagues/league.component";
import {SingleLeagueComponent} from "./single-league/single-league.component";
import {Route, RouterModule} from "@angular/router";



const routes : Route[] = [
  {path:'',component:LeagueComponent},
  {path:':id',component:SingleLeagueComponent},

];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LeagueRoutingModule { }
