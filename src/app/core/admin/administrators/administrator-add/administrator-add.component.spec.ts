import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorAddComponent } from './administrator-add.component';

describe('AdministratorAddComponent', () => {
  let component: AdministratorAddComponent;
  let fixture: ComponentFixture<AdministratorAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministratorAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
