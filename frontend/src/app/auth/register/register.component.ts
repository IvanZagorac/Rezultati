import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {User} from "../../models/user.model";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  users : User []=[];
  new:User=new User();

  constructor(private fb:FormBuilder,private authService:AuthService) { }

  ngOnInit():void {
  }

  register(){
    this.authService.register(this.new,this.users);

  }


}
