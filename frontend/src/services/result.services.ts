
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../app/environments/environment";
import {League} from "../app/models/league.model";
import {Observable} from "rxjs";
import {Sport} from "../app/models/sport.model";
import {Result} from "../app/models/result.model";
import {Club} from "../app/models/club.model";

@Injectable({
  providedIn: 'root'
})
export class ResultServices {

  results:Result[]=[];
  authUrl : string = environment.API_URL+'/results';

  constructor(private http: HttpClient) {
  }

  getResultById(uri:string):Observable<Result>{
    return this.http.get<Result>(this.authUrl+"/"+uri);

  }


  getAllResults(): Observable<Result[]> {
    return this.http.get<Result[]>(this.authUrl);
  }

  addResult(result:Result){
    return this.http.post(this.authUrl,result);
  }

  deleteResult(id:string){
    return this.http.delete(this.authUrl+"/"+id);
  }

  editResult(result:Result){
    return this.http.patch(this.authUrl+"/"+result._id,result);
  }

}
