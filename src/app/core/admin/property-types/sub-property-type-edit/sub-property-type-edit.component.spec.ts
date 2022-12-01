import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubPropertyTypeEditComponent } from './sub-property-type-edit.component';

describe('SubPropertyTypeEditComponent', () => {
  let component: SubPropertyTypeEditComponent;
  let fixture: ComponentFixture<SubPropertyTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubPropertyTypeEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubPropertyTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
