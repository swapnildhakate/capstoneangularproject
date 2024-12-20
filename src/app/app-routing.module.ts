import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClientLoginComponent } from './client-login/client-login.component';
import { ClientRegistrationComponent } from './client-registration/client-registration.component';
import { MeetingScheduleComponent } from './meeting-schedule/meeting-schedule.component';


const routes: Routes = [
  { path:'', component: HomeComponent},
  { path: 'home', component: HomeComponent },
  { path: 'login', component: ClientLoginComponent },
  { path: 'register', component: ClientRegistrationComponent },
  { path: 'schedule', component: MeetingScheduleComponent },
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
