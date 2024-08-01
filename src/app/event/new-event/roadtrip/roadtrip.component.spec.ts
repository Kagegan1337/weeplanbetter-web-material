import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadtripComponent } from './roadtrip.component';

describe('RoadtripComponent', () => {
  let component: RoadtripComponent;
  let fixture: ComponentFixture<RoadtripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoadtripComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoadtripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
