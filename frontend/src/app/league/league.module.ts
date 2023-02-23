import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleLeagueComponent } from './single-league/single-league.component';
import {LeagueComponent} from "./leagues/league.component";
import {LeagueRoutingModule} from "./league-routing.module";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    LeagueComponent,
    SingleLeagueComponent
  ],
    imports: [
        LeagueRoutingModule,
        CommonModule,
        FormsModule
    ]
})
export class LeagueModule { }
