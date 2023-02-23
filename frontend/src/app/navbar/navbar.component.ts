import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {User} from "../models/user.model";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user!:User;
  authenticated=false;
  authChangeSubscription !: Subscription;

  constructor(private router:Router, private auth:AuthService) { }

  ngOnInit(): void {
    this.authenticated=this.auth.isAuthenticated();
    console.log( this.authenticated)
    this.authChangeSubscription=this.auth.authChange
      .subscribe((res:any) => {
        this.authenticated=this.auth.isAuthenticated();
      });
  }



  logout(){
    this.auth.logout();
  }

  ngOnDestroy(){
    this.authChangeSubscription.unsubscribe();
  }

}
