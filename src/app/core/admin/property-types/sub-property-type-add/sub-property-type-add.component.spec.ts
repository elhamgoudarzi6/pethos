import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubPropertyTypeAddComponent } from './sub-property-type-add.component';

describe('SubPropertyTypeAddComponent', () => {
  let component: SubPropertyTypeAddComponent;
  let fixture: ComponentFixture<SubPropertyTypeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubPropertyTypeAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubPropertyTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
