import { Component } from '@angular/core';
import {Sport} from "../../models/sport.model";
import {SportService} from "../../../services/sport.service";
import {Subscription} from "rxjs";
import {AuthService} from "../../../services/auth.service";
import jwt_decode from "jwt-decode";
import * as jwt from 'jsonwebtoken';
import {User} from "../../models/user.model";

@Component({
  selector: 'app-sports',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.css']
})
export class SportComponent {

  sports:Sport[]=[];
  sportt:Sport=new Sport();
  userId!:string;
  selectedSportId?: string;
  add:boolean = false;
  subscription : Subscription | null = null;
  editingIndex : number | null = null;
  editingSport : Sport = new Sport();

  constructor(private sportService:SportService,private authService:AuthService) { }

  ngOnInit() {
    this.sportService.getSports()
      .subscribe((res:Sport[])=>{
        this.sports=res;
      })
    this.decodedToken();

  }


  getAllSport(){
    return this.sportService.getSports()
      .subscribe((res:Sport[])=>{
        this.sports=res;
      })
  }

  onSportSelected(sport: Sport) {
    this.selectedSportId = sport._id;
  }

  decodedToken(){
    const token:string | null  = localStorage.getItem('token');
    let  decodedToken:any;

    if(token!==null){
      decodedToken = jwt_decode(token);
      this.userId=decodedToken._id;
    }

  }

  addSport(){

    this.sportt.userId=this.userId;
    this.sportService.addSport(this.sportt)
      .subscribe((res => {
          this.sports.push(this.sportt);
        })
      )}

  deleteSport(i:number){
    let s = this.sports[i];
    this.sportService.deleteSport(s._id)
      .subscribe((res => {
        console.log(res);
        this.sports.splice(i,1);
      }));

  }

  setEdit(i:number){
    this.editingSport= {...this.sports[i]};
    this.editingIndex=i;
  }

  doneEditing(i:number){
    let s = this.sports[i];
    this.sportService.editSport(s)
      .subscribe((res)=>{
        this.editingIndex=null;
        this.sports[i]=this.editingSport;
        this.editingSport=new Sport();
      })

    this.editingIndex=null;

  }


}
