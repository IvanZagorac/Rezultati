import {User} from "./user.model";

export class Res {
  status?:number;
  description?:string;
  user?:User;
  token?:string='';

}
