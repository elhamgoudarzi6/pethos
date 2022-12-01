import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcTopHeaderComponent } from './pc-top-header.component';

describe('PcTopHeaderComponent', () => {
  let component: PcTopHeaderComponent;
  let fixture: ComponentFixture<PcTopHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcTopHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcTopHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
