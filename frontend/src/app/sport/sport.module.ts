import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleSportComponent } from './single-sport/single-sport.component';
import {SportComponent} from "./sports/sport.component";
import {SportRoutingModule} from "./sport-routing.module";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    SportComponent,
    SingleSportComponent
  ],
    imports: [
        SportRoutingModule,
        CommonModule,
        FormsModule
    ]
})
export class SportModule { }
