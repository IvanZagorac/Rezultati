import { NgModule } from '@angular/core';
import {SportComponent} from "./sports/sport.component";
import {SingleSportComponent} from "./single-sport/single-sport.component";
import {Route, RouterModule} from "@angular/router";



const routes : Route[] = [
  {path:'',component:SportComponent},
  {path:':id',component:SingleSportComponent}

];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SportRoutingModule { }
