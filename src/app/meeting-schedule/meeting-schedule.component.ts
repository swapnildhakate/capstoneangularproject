import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-meeting-schedule',
  templateUrl: './meeting-schedule.component.html',
  styleUrls: ['./meeting-schedule.component.css']
})
export class MeetingScheduleComponent implements OnInit {
  topic: string = '';
  numberOfPeople: any = '';
  startTime: string = '';
  message: string = '';
  showMessage: boolean = false;
  meetings: any[] = [];
  viewSchedule: boolean = false;
  username: string = '';
  newMeeting: any = null;

  constructor(private http: HttpClient, private apiService: ApiService) { }

  ngOnInit(): void {
    this.username = this.transformToTitleCase(this.apiService.getUserName() || (typeof localStorage !== 'undefined' ? localStorage.getItem('username') : '') || '');
    this.getMeetings();
  }

  scheduleMeeting(): void {
    const meeting = {
      topic: this.topic,
      numberOfPeople: this.numberOfPeople,
      startTime: this.startTime
    };

    this.http.post('http://localhost:5000/schedule', meeting)
      .subscribe((response: any) => {
        this.message = 'Meeting scheduled successfully';
        this.showMessage = true;
        this.newMeeting = meeting; // Store the new meeting details
        this.getMeetings(); // Refresh meetings list after scheduling
        this.resetForm();
        this.hideMessageAfterTime(); // Hide the message after a time
      }, (error) => {
        console.error('An error occurred while scheduling the meeting.', error);
        this.message = 'An error occurred while scheduling the meeting';
        this.showMessage = true;
        this.hideMessageAfterTime(); // Hide the message after a time
      });
  }

  getMeetings(): void {
    const params = new HttpParams().set('username', this.username);
    this.http.get('http://localhost:5000/meetings', { params })
      .subscribe((response: any) => {
        this.meetings = response;
      }, (error) => {
        console.error('An error occurred while fetching meetings.', error);
      });
  }
  

  deleteMeeting(id: number): void {
    if (confirm('Are you sure you want to delete this meeting?')) {
      this.http.delete(`http://localhost:5000/meetings/${id}`)
        .subscribe((response: any) => {
          this.message = 'Meeting deleted successfully';
          this.showMessage = true;
          this.getMeetings(); // Refresh meetings list after deletion
          this.hideMessageAfterTime(); // Hide the message after a time
        }, (error) => {
          console.error('An error occurred while deleting the meeting.', error);
          this.message = 'An error occurred while deleting the meeting';
          this.showMessage = true;
          this.hideMessageAfterTime(); // Hide the message after a time
        });
    }
  }

  resetForm(): void {
    this.topic = '';
    this.numberOfPeople = '';
    this.startTime = '';
  }

  hideMessageAfterTime(): void {
    setTimeout(() => {
      this.showMessage = false;
      this.newMeeting = null; // Hide the new meeting details after the message disappears
    }, 5000); // Hide the message after 5 seconds
  }

  transformToTitleCase(name: string): string { 
    return name.replace(/\b\w/g, char => char.toUpperCase()); 
  }

  toggleView(): void {
    this.viewSchedule = !this.viewSchedule;
  }

  logout(): void {
    this.apiService.logout();
  }
}
