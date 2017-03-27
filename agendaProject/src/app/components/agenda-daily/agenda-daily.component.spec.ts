import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaDailyComponent } from './agenda-daily.component';

describe('AgendaDailyComponent', () => {
  let component: AgendaDailyComponent;
  let fixture: ComponentFixture<AgendaDailyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendaDailyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
