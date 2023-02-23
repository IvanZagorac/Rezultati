import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {Result} from "../../models/result.model";
import {ResultServices} from "../../../services/result.services";
import {Club} from "../../models/club.model";
import {ClubServices} from "../../../services/club.services";
import {League} from "../../models/league.model";
import {LeagueServices} from "../../../services/league.services";

@Component({
  selector: 'app-single-league',
  templateUrl: './single-league.component.html',
  styleUrls: ['./single-league.component.css']
})

export class SingleLeagueComponent {
  results:Result[]=[];
  leagues:League[]=[]
  clubs:Club[]=[];
  clubA:Club=new Club();
  clubB:Club=new Club();
  club:Club=new Club();
  resultt:Result=new Result();
  add:boolean = false;
  add2:boolean = false;
  id!:string;
  currLeague:League=new League();
  subscription : Subscription | null = null;
  editingIndex : number | null = null;
  editingResult : Result = new Result();
  // <div *ngIf="editingIndex!=i"  class="name">{{clubA.name}} {{result.scoreA}}:{{result.scoreB}} {{clubB.name}}</div>
  constructor(private route: ActivatedRoute,private clubServices:ClubServices,private resultServices:ResultServices,private leagueServices:LeagueServices) {}

  ngOnInit() {
    this.getAllClubs()
    this.resultServices.getAllResults()
      .subscribe((res:Result[])=>{
        this.results=res;
        this.results.forEach((result: Result) => {
          this.clubs.forEach((club:Club)=>{
            if(result.clubA==club._id){
              this.clubA=club
            }
            if(result.clubB==club._id){
              this.clubB=club;
            }
          })
        })
      })



    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.leagueServices.getLeagueById(this.id).subscribe((res:League)=>{
      if(res){
        this.currLeague=res;
      }

    });
  }


  getClubAById(id:string){
    let varijabla=this.results;
    for (let i = 0; i < varijabla.length; i++) {
      if (varijabla[i].clubA === id) {
        return varijabla[i];
      }
    }

    return;
  }

  getLeagueById(){
    this.leagueServices.getLeagueById(this.id)
  }

  getAllClubs(){
    this.clubServices.getAllClubs()
      .subscribe((res:Club[])=>{
        this.clubs=res;
      })
  }

  getAllLeagues(){
    this.leagueServices.getAllLeagues()
      .subscribe((res:League[])=>{
        this.leagues=res;
      })
  }

  getClubBById(id:string){
    let varijabla=this.results;
    for (let i = 0; i < varijabla.length; i++) {
      if (varijabla[i].clubB === id) {
        return varijabla[i];
      }
    }

    return;
  }

  addResult(){
    this.resultt.leagueId=this.id;
    this.resultServices.addResult(this.resultt)
      .subscribe((res => {
          console.log(res);
          this.results.push(this.resultt);
        })
      )}

  addClub(){
    this.club.leagueId=this.id;
    this.clubServices.addClub(this.club)
      .subscribe((res => {
          this.clubs.push(this.club);
        })
      )}
  deleteResult(i:number){
    let s = this.results[i];
    this.resultServices.deleteResult(s._id)
      .subscribe((res => {
        console.log(res);
        this.results.splice(i,1);
      }));

  }

  setEdit(i:number){
    this.editingResult= {...this.results[i]};
    this.editingIndex=i;
  }

  doneEditing(i:number){
    this.results[i].clubA=this.clubA._id;
    this.results[i].clubB=this.clubB._id;
    let s = this.results[i];

    this.resultServices.editResult(s)
      .subscribe((res)=>{
        this.editingIndex=null;
        this.results[i]=this.editingResult;
        this.editingResult=new Result();
      })

    this.editingIndex=null;

  }





}
