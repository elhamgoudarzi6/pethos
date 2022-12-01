import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorEditComponent } from './administrator-edit.component';

describe('AdministratorEditComponent', () => {
  let component: AdministratorEditComponent;
  let fixture: ComponentFixture<AdministratorEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministratorEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
