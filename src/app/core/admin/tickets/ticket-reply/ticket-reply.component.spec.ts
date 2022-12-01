import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketReplyComponent } from './ticket-reply.component';

describe('TicketReplyComponent', () => {
  let component: TicketReplyComponent;
  let fixture: ComponentFixture<TicketReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketReplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
