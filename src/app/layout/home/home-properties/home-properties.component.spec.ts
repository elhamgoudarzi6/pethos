import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePropertiesComponent } from './home-properties.component';

describe('HomePropertiesComponent', () => {
  let component: HomePropertiesComponent;
  let fixture: ComponentFixture<HomePropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePropertiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
