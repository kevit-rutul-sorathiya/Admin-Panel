import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUser} from "../Interfaces/IUser";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  isUserLoginCridentialCorrect : boolean = false;
  constructor(private http: HttpClient) { }

  getUserLoginCridential(userLoginObject : {login:string,password:string} ){
    return  this.http.post("https://reqres.in/api/login",userLoginObject)
  }

  getUsersList(page : number){
    return this.http.get("https://reqres.in/api/users?page="+page);
  }

  getDeleteUser(id:number){
    return this.http.delete(`https://reqres.in/api/users/${id}`)
  }

  getSingleUser(id:number): Observable<IUser>{
    return this.http.get<IUser>(`https://reqres.in/api/users/${id}`);
  }

  createUser(userDetailObject : IUser){
    return this.http.post("https://reqres.in/api/users",userDetailObject)
  }

  updateUserObject(userDetailObject : IUser , id:number){
    return this.http.put(`https://reqres.in/api/users/${id}`, userDetailObject);
  }
}
