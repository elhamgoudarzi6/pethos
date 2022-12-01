import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGoalComponent } from './home-goal.component';

describe('HomeGoalComponent', () => {
  let component: HomeGoalComponent;
  let fixture: ComponentFixture<HomeGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeGoalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
