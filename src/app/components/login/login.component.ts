import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userLoginForm !: FormGroup;
  constructor( private readonly router: Router,
               private readonly userService: UserService,
               private readonly messageService: MessageService) { }

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
    this.userService.getUserLoginCridential(this.userLoginForm.value).subscribe(
      (loginReqResponse) => {
        if(loginReqResponse.hasOwnProperty('token')){
          this.userService.isUserLoginCridentialCorrect = true;
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
