import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./authentication/auth.guard";

const routes: Routes = [
  { path:'', component:LoginComponent, pathMatch:'full'},
  { path:'login', component: LoginComponent},
  { path:'dashboard', component:DashboardComponent, canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
