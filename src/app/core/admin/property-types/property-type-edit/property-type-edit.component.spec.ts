import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyTypeEditComponent } from './property-type-edit.component';

describe('PropertyTypeEditComponent', () => {
  let component: PropertyTypeEditComponent;
  let fixture: ComponentFixture<PropertyTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyTypeEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
