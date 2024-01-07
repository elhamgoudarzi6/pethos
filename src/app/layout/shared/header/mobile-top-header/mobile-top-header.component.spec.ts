import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileTopHeaderComponent } from './mobile-top-header.component';

describe('MobileTopHeaderComponent', () => {
  let component: MobileTopHeaderComponent;
  let fixture: ComponentFixture<MobileTopHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileTopHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileTopHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
