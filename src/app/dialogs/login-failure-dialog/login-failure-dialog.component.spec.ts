import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFailureDialogComponent } from './login-failure-dialog.component';

describe('LoginFailureDialogComponent', () => {
  let component: LoginFailureDialogComponent;
  let fixture: ComponentFixture<LoginFailureDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFailureDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginFailureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
