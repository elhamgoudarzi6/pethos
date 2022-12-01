import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVisitRequestsComponent } from './my-visit-requests.component';

describe('MyVisitRequestsComponent', () => {
  let component: MyVisitRequestsComponent;
  let fixture: ComponentFixture<MyVisitRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyVisitRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyVisitRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
