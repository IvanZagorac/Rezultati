import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../app/environments/environment";
import {Sport} from "../app/models/sport.model";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SportService {

  sports: Sport[]=[];
  authUrl : string = environment.API_URL+'/sports';

  constructor(private http: HttpClient) {
  }

  getSports(): Observable<Sport[]> {
    return this.http.get<Sport[]>(this.authUrl);
  }

  addSport(sport:Sport){
    return this.http.post(this.authUrl,sport);
  }

  deleteSport(id:string){
    return this.http.delete(this.authUrl+"/"+id);
  }

  editSport(sport:Sport){
    return this.http.patch(this.authUrl+"/"+sport._id,sport);
  }

}
