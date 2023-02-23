
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../app/environments/environment";
import {League} from "../app/models/league.model";
import {Observable} from "rxjs";
import {Sport} from "../app/models/sport.model";
import {Club} from "../app/models/club.model";

@Injectable({
  providedIn: 'root'
})
export class LeagueServices {

  leagues:League[]=[];
  authUrl : string = environment.API_URL+'/leagues';

  constructor(private http: HttpClient) {
  }

  getLeagueById(uri:string):Observable<League>{
    return this.http.get<League>(this.authUrl+"/"+uri);

  }

  getAllLeagues(): Observable<League[]> {
    return this.http.get<League[]>(this.authUrl);
  }

  addLeague(league:League){
    return this.http.post(this.authUrl,league);
  }

  deleteLeague(id:string){
    return this.http.delete(this.authUrl+"/"+id);
  }

  editLeague(league:League){
    return this.http.patch(this.authUrl+"/"+league._id,league);
  }

}
