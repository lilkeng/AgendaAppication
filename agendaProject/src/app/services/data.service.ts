import { Injectable } from '@angular/core';
import { Event } from "../models/event.model";
import { Http, Response, Headers } from "@angular/http";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable} from "rxjs/Rx"; 
import "rxjs/add/operator/toPromise";

@Injectable()
export class DataService {  

  constructor(private http: Http) {
    for (var i = 1; i <= 31; i++) {
      this.eventsSourceArray.push(new BehaviorSubject<Event[]>([]));
    }
  }
  
  private eventsSourceArray: Array<BehaviorSubject<Event[]>> = [];

  //getEvents() is a function can be subscripted
  //which it's type is Observable
  getEvents(date: number): Observable<Event[]>{
    this.http.get(`api/v1/events/${date}`)
      .toPromise()
      .then((res: Response) => {
        this.eventsSourceArray[date].next(res.json());
      })
      .catch(this.handleError);
    return this.eventsSourceArray[date].asObservable();
  }

  addEvent(event: Event): Promise<Event> {
  	let headers = new Headers({ 'content-type': 'application/json'});
    return this.http.post('/api/v1/events', event, headers)
      .toPromise()
      .then((res: Response) => {
        console.log(res.json().date);
        this.getEvents(res.json().date);
        return res.json();
      })
      .catch(this.handleError);
  }

  updateEvent(event: Event, id: number): Promise<Event> {
    console.log("update from day:" + event.date);
    let headers = new Headers({ 'content-type': 'application/json'});
    return this.http.post(`/api/v1/events/${id}`, event, headers)
      .toPromise()
      .then((res: Response) => {
        console.log(res.json().date);
        this.getEvents(res.json().date);
        return res.json();
      })
      .catch(this.handleError);
  }

  removeEvent( event: Event, id: number ): Promise<any> {
    console.log("remove from day:" + event.date);
    return this.http.get(`api/v1/rmevent/${id}`)
      .toPromise()
      .then((res: Response) => {
        this.getEvents(event.date);
      })
      .catch(this.handleError);
  }

  //error Handler
  private handleError(error: any): Promise<any> {
    console.error("An error occurred", error);
    return Promise.reject(error.body || error);
  }
}
