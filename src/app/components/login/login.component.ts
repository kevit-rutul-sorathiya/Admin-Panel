import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {DataService} from "../../service/data.service";
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userLoginForm !: FormGroup;
  constructor( private http: HttpClient,
               private router: Router,
               private dataService: DataService,
               private messageService: MessageService) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(){
    this.userLoginForm = new FormGroup({
      'email': new FormControl('',[Validators.required,Validators.email,Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      'password': new FormControl('',[Validators.required,Validators.minLength(5)])
    })
  }

  onUserLoginFormSubmit(){
    if(this.userLoginForm.invalid){
      alert("Enter valid data!!");
      return;
    }
    this.dataService.getUserLoginCridential(this.userLoginForm.value).subscribe(
      (loginReqResponse) => {
        if(loginReqResponse.hasOwnProperty('token')){
          this.dataService.isUserLoginCridentialCorrect = true;
          this.messageService.add({key: 'loginKey', severity:'success', summary: 'Login successfully!!'});
          this.router.navigate(['dashboard']);
        }
      },
       (loginReqResponse) => {
        this.userLoginForm.reset();
        this.messageService.add({key: 'loginRejectionKey', severity:'error', summary:loginReqResponse.error.error});
      }
    )

  }

}
