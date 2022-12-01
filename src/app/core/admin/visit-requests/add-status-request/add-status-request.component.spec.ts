import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStatusRequestComponent } from './add-status-request.component';

describe('AddStatusRequestComponent', () => {
  let component: AddStatusRequestComponent;
  let fixture: ComponentFixture<AddStatusRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStatusRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStatusRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
