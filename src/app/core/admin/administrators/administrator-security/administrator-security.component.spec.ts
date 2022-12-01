import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorSecurityComponent } from './administrator-security.component';

describe('AdministratorSecurityComponent', () => {
  let component: AdministratorSecurityComponent;
  let fixture: ComponentFixture<AdministratorSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministratorSecurityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
