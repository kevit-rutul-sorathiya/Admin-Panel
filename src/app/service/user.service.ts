import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserInterface} from "../Interfaces/UserInterface";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isUserLoginCridentialCorrect : boolean = false;
  constructor(private readonly http: HttpClient) { }

  getUserLoginCridential(userLoginObject : {login:string,password:string} ){
    return  this.http.post("https://reqres.in/api/login",userLoginObject)
  }

  getUsersList(page : number): Observable<Array<UserInterface>>{
    return this.http.get<Array<UserInterface>>("https://reqres.in/api/users?page="+page);
  }

  getDeleteUser(id:number){
    return this.http.delete(`https://reqres.in/api/users/${id}`)
  }

  getSingleUser(id:number): Observable<UserInterface>{
    return this.http.get<UserInterface>(`https://reqres.in/api/users/${id}`);
  }

  createUser(userDetailObject : UserInterface){
    return this.http.post("https://reqres.in/api/users",userDetailObject)
  }

  updateUserObject(userDetailObject : UserInterface , id:number){
    return this.http.put(`https://reqres.in/api/users/${id}`, userDetailObject);
  }
}
