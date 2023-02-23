import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../app/models/user.model";
import {Subject} from "rxjs";
import {environment} from "../app/environments/environment";
import {Res} from "../app/models/res.model";
import {League} from "../app/models/league.model";
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user?: User;
  private token: string | null='';
  errorEmitter : Subject<string> = new Subject<string>();
  authChange : Subject<boolean> = new Subject<boolean>();
  authUrl : string = environment.API_URL+'/auth';
  userUrl:string=environment.API_URL+'/users';
  registerUrl:string=environment.API_URL+'/register';


  constructor(private http:HttpClient,private router:Router) { }

  login(credentials : {username : string, password: string}){
    this.http.post(this.authUrl,credentials)
      .subscribe((res:Res)=>{
        if (res.status == 200){
          console.log("200")
          this.user=res.user;
          if (res.token) {
            this.token = res.token;
            localStorage.setItem('token', this.token);
          }
          this.authChange.next(true);
          this.router.navigate(['/sports']);

        } else {
          if (res.description) {
            this.errorEmitter.next(res.description);
          }
        }
      })
  }

  register(user:User,users:User[]){

    this.http.post(this.registerUrl,user)
      .subscribe((res:Res) => {
        users.push(user);
        console.log(res)
        console.log(res.token)
        if(res){
          if(res.token){
            console.log("uso res.token")
            this.token = res.token;
            localStorage.setItem('token', this.token);
          }
          this.authChange.next(true);
          this.router.navigate(['/sports']);

        }else {
              console.log("Wrong credentials")

          }

      })
  }


  addUser(user:User){
    return this.http.post(this.authUrl,user);
  }

  logout(){
    this.user=undefined;
    this.token="";
    localStorage.removeItem('token');
    this.authChange.next(false);
    this.router.navigate(['auth/login']);
  }

  setToken(token:string){
    this.token=token;
  }

  decodedTokenAuth(){
    const token:string | null  = localStorage.getItem('token');
    let  decodedToken:any;

    if(token!==null){
      decodedToken = jwt_decode(token);
    }

    return decodedToken

  }

  getToken(){

    if (this.token) return this.token;
    else {
      if (localStorage.getItem('token')){
        this.token=localStorage.getItem('token');
        return this.token;
      }

    }

    return "";

  }

  isAuthenticated(){
    return this.token!="";
  }

}
