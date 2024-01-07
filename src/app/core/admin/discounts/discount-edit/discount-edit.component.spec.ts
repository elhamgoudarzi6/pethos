import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountEditComponent } from './discount-edit.component';

describe('DiscountEditComponent', () => {
  let component: DiscountEditComponent;
  let fixture: ComponentFixture<DiscountEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
