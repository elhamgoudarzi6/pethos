import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderEditComponent } from './slider-edit.component';

describe('SliderEditComponent', () => {
  let component: SliderEditComponent;
  let fixture: ComponentFixture<SliderEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
