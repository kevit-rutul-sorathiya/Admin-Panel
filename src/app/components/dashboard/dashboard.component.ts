import { Component, OnInit } from '@angular/core';
import {DataService} from "../../service/data.service";
import {IUser} from "../../Interfaces/IUser";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfirmationService, MessageService} from 'primeng/api';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  styles:[`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `]
})
export class DashboardComponent implements OnInit {
  page:number = 1;
  userID : number = -1;
  userDetailForm !: FormGroup;
  usersList= [];
  user!:IUser;
  display:boolean =false;
  constructor(private dataService: DataService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.dataService.getUsersList().subscribe(
      (usersList:any)=>{
         this.page = usersList.total;
         console.log(this.page);
        this.usersList = usersList.data;
      }
    )
  }

  private initForm(){
    this.userDetailForm = new FormGroup({
      'firstName': new FormControl('',[Validators.required,Validators.minLength(2)]),
      'lastName': new FormControl('', [Validators.required,Validators.minLength(2)]),
      'imageLink': new FormControl('',[Validators.required,Validators.minLength(5)]),
      'email': new FormControl('',[Validators.required,Validators.email,Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')])
    })
  }

  deleteProduct(id : number){
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: ()=>{
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'User deleted', life: 3000});
        this.dataService.getDeleteUser(id).subscribe(
          (res)=>{
            console.log(res);
          }
        )
      }
    });
  }

  editProduct(id : number){
    this.display=true;
    this.dataService.getSingleUser(id).subscribe(
      (singleUserObject:any)=>{
        this.userID = singleUserObject.data.id;
        this.userDetailForm.controls['firstName'].setValue(singleUserObject.data.first_name);
        this.userDetailForm.controls['lastName'].setValue(singleUserObject.data.last_name);
        this.userDetailForm.controls['imageLink'].setValue(singleUserObject.data.avatar);
        this.userDetailForm.controls['email'].setValue(singleUserObject.data.email);
      }
    )
  }

  openDialog(){
    this.display=true;
    this.userDetailForm.reset();
  }

  onUserDetailFormSubmit(){
    if(this.userID !== -1){
      this.dataService.updateUserObject(this.userDetailForm.value,this.userID).subscribe(
        (res:any)=>{
          console.log(res);
          this.userDetailForm.reset();
          this.messageService.add({key: 'updateKey', severity:'success', summary: 'Updated successfully!!'});
        }
      );
      this.userID = -1;
    }else{
      this.dataService.createUser(this.userDetailForm.value).subscribe(
        (addUserRes)=>{
          console.log(addUserRes);
          this.messageService.add({key: 'addKey', severity:'success', summary: 'Created successfully!!'});
          this.userDetailForm.reset();
        }
      )
    }
    this.display=false;
  }

  onLogoutClick(){
    this.router.navigate(['login'])
  }
}
