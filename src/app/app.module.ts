import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientLoginComponent } from './client-login/client-login.component';
import { ClientRegistrationComponent } from './client-registration/client-registration.component';
import { MeetingScheduleComponent } from './meeting-schedule/meeting-schedule.component';
import { ApiService } from './api.service';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientLoginComponent,
    ClientRegistrationComponent,
    MeetingScheduleComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
