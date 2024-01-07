import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTicketAddComponent } from './my-ticket-add.component';

describe('MyTicketAddComponent', () => {
  let component: MyTicketAddComponent;
  let fixture: ComponentFixture<MyTicketAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTicketAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTicketAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
