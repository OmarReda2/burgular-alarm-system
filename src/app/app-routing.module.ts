import { SensorInputsComponent } from './components/sensor-inputs/sensor-inputs.component';
import { SystemComponent } from './components/system/system.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthonGuard } from './guard/authon.guard';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login' ,component:LoginComponent },
  {path:'register' ,component:RegisterComponent },
  {path:'system' ,component:SystemComponent, canActivate:[AuthonGuard]},
  {path:'sensor-inputs' ,component:SensorInputsComponent},
  // {path:'**' , redirectTo:'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
