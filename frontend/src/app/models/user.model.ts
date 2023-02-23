export class User {
  username:string;
  password:string;
  repeatPass:string
  id:string;
  name:string;
  email:string;

  constructor() {
    this.username='';
    this.password='';
    this.id='';
    this.repeatPass=''
    this.name='';
    this.email=''
  }
}
