import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {League} from "../../models/league.model";
import {LeagueServices} from "../../../services/league.services";

@Component({
  selector: 'app-single-sport',
  templateUrl: './single-sport.component.html',
  styleUrls: ['./single-sport.component.css']
})

export class SingleSportComponent {
  leagues:League[]=[];
  league:League=new League();
  add:boolean = false;
  id!:string;
  selectedResultId?: string;
  subscription : Subscription | null = null;
  editingIndex : number | null = null;
  editingLeague : League = new League();

  constructor(private route: ActivatedRoute,private leagueService:LeagueServices) {}

  ngOnInit() {
    this.leagueService.getAllLeagues()
      .subscribe((res:League[])=>{
        this.leagues=res;
      })

    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });
  }


  onLeagueSelected(league: League) {
    this.selectedResultId = league._id;
    console.log(this.selectedResultId)
  }

  addleague(){
    this.league.sportId=this.id;
    this.leagueService.addLeague(this.league)
      .subscribe((res => {
          console.log(res);
          this.leagues.push(this.league);
        })
      )}

  deleteleague(i:number){
    let s = this.leagues[i];
    this.leagueService.deleteLeague(s._id)
      .subscribe((res => {
        console.log(res);
        this.leagues.splice(i,1);
      }));

  }

  setEdit(i:number){
    this.editingLeague= {...this.leagues[i]};
    this.editingIndex=i;
  }

  doneEditing(i:number){
    let s = this.leagues[i];
    this.leagueService.editLeague(s)
      .subscribe((res)=>{
        this.editingIndex=null;
        this.leagues[i]=this.editingLeague;
        this.editingLeague=new League();
      })

    this.editingIndex=null;

  }





}
