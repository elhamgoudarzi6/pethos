import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetVisitDateTimeComponent } from './set-visit-date-time.component';

describe('SetVisitDateTimeComponent', () => {
  let component: SetVisitDateTimeComponent;
  let fixture: ComponentFixture<SetVisitDateTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetVisitDateTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetVisitDateTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
