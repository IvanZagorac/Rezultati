import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-single-club',
  templateUrl: './single-club.component.html',
  styleUrls: ['./single-club.component.css']
})
export class SingleClubComponent {

  id?:string;

  constructor(private route: ActivatedRoute){}
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });
  }
}
