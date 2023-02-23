
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
export class ClubServices {

  clubs:Club[]=[];
  authUrl : string = environment.API_URL+'/club';

  constructor(private http: HttpClient) {
  }

  getClubById(uri:string):Observable<Club>{
    return this.http.get<Club>(this.authUrl+"/"+uri);

  }

  getAllClubs(): Observable<Club[]> {
    return this.http.get<Club[]>(this.authUrl);
  }

  addClub(club:Club){
    return this.http.post(this.authUrl,club);
  }

  deleteClub(id:string){
    return this.http.delete(this.authUrl+"/"+id);
  }

  editClub(club:Club){
    return this.http.patch(this.authUrl+"/"+club._id,club);
  }

}
