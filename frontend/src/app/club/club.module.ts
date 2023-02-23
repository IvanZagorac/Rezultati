import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleClubComponent } from './single-club/single-club.component';
import {ClubComponent} from "./clubs/club.component";
import {ClubRoutingModule} from "./club-routing.module";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ClubComponent,
    SingleClubComponent
  ],
    imports: [
        ClubRoutingModule,
        CommonModule,
        FormsModule
    ]
})
export class ClubModule { }
