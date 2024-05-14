import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventOverviewEntryComponent } from './event-overview-entry.component';

describe('EventOverviewEntryComponent', () => {
  let component: EventOverviewEntryComponent;
  let fixture: ComponentFixture<EventOverviewEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventOverviewEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventOverviewEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
