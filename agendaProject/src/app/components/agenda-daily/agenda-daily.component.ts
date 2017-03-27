import { Component, OnInit, Inject, Input } from '@angular/core';
import { Event } from "../../models/event.model";
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';

const DEFAULT_EVENT: Event = Object.freeze({
  id: 0,
  date: 0,
	desc: "New Event"
});

@Component({
  selector: 'app-agenda-daily',
  templateUrl: './agenda-daily.component.html',
  styleUrls: ['./agenda-daily.component.css']
})

export class AgendaDailyComponent implements OnInit {

  @Input()
  date: number;

  constructor(
    @Inject("data") private data
  ) { }

  events: Event[] = [];

  subscriptionEvents: Subscription;

	newEvent: Event = Object.assign({}, DEFAULT_EVENT); 

  ngOnInit() {
    this.getEvents(this.date);
  }

  submitEvent( updatedEvent: Event, eventId: number, inputValue: string ): void {
    if (inputValue.length == 0) {
      this.removeEvent( updatedEvent, eventId );
    } 
  }

  getEvents( date: number ): void {
    if (date) {
      this.subscriptionEvents = this.data.getEvents(date)
        .subscribe(events => this.events = events); 
    }
  }

  createNewEvent(): void {
    if (this.events.length < 2) {
      //add data to data.service
      this.newEvent.date = this.date; 
      this.data.addEvent(this.newEvent)
        .catch(error => console.log(error._body));
      console.log("print out the date: " + this.date);
    }
    console.log("clicked");
  	this.newEvent = Object.assign({}, DEFAULT_EVENT);
  }

  updateEvent( updatedEvent: Event, eventId: number, inputValue: string ): void {
    updatedEvent.desc = inputValue;
    console.log(updatedEvent.desc);
    this.data.updateEvent(updatedEvent, eventId)
      .catch(error => console.log(error._body));
  }

  removeEvent( updatedEvent: Event, eventId: number ): void {
    this.data.removeEvent(updatedEvent, eventId)
      .catch(error => console.log(error._body));
  }
  //error Handler
  private handleError(error: any): Promise<any> {
    console.error("An error occurred", error);
    return Promise.reject(error.body || error);
  }

}
