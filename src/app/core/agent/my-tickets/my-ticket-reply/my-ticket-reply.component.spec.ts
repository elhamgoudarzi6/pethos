import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTicketReplyComponent } from './my-ticket-reply.component';

describe('MyTicketReplyComponent', () => {
  let component: MyTicketReplyComponent;
  let fixture: ComponentFixture<MyTicketReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTicketReplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTicketReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
