import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyEditComponent } from './property-edit.component';

describe('PropertyEditComponent', () => {
  let component: PropertyEditComponent;
  let fixture: ComponentFixture<PropertyEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
