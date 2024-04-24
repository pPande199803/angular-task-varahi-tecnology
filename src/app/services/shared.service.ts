import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor( private http : HttpClient ) { }

  // get Register data for login 

  getUsers(){
    return this.http.get('http://localhost:3000/users');
  }


  // get User by id

  getUserById(id:number){
    return this.http.get('http://localhost:3000/users/'+id)
  }


  updateUserDetailsById(id:number, data:Users){
    return this.http.put('http://localhost:3000/users/'+id, data)
  }

// post register data 
  userRegisterData(data:Users){
    return this.http.post('http://localhost:3000/users', data);
  }

  // delete user data 

  deleteUserData(id:any){
    return this.http.delete("http://localhost:3000/users/"+id)
  }

}
