import { Component, OnInit, NgModule } from '@angular/core';
import { AgendaDailyComponent } from '../agenda-daily/agenda-daily.component';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
@NgModule({
  declarations: [
    AgendaDailyComponent
  ]
})
export class AgendaComponent implements OnInit {

  monthArr = [[null, null, null, null, 1, 2 ,3],
                    [4,5,6,7,8,9,10],
                    [11,12,13,14,15,16,17],
                    [18,19,20,21,22,23,24],
                    [25,26,27,28,29,30,31]]
  date: number;

  constructor() {
    
  }

  ngOnInit() {
    
  }
}
