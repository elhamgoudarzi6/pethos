import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyEditStatusComponent } from './property-edit-status.component';

describe('PropertyEditStatusComponent', () => {
  let component: PropertyEditStatusComponent;
  let fixture: ComponentFixture<PropertyEditStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyEditStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyEditStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
