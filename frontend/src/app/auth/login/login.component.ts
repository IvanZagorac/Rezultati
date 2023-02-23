import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorMessage : string = '';
  signinForm! : FormGroup;


  constructor(private authService : AuthService) { }

  ngOnInit() {

    this.signinForm = new FormGroup({
      'username' : new FormControl(null, [Validators.required]),
      'password' : new FormControl(null, [Validators.required])
    });

    this.authService.errorEmitter
      .subscribe((error : string) => {
        this.errorMessage = error;
      });

  }

  onLogin(){
    this.authService.login(this.signinForm.value);
    console.log(this.signinForm.value)

  }


}
