import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyTypeAddComponent } from './property-type-add.component';

describe('PropertyTypeAddComponent', () => {
  let component: PropertyTypeAddComponent;
  let fixture: ComponentFixture<PropertyTypeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyTypeAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
