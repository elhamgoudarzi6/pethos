import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcHeaderComponent } from './pc-header.component';

describe('PcHeaderComponent', () => {
  let component: PcHeaderComponent;
  let fixture: ComponentFixture<PcHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
