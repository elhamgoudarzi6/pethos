import { TokenService } from './../../../auth/token.service';
import { LocalStorageService } from 'src/app/auth/local-storage.service';
import { DialogService } from 'primeng/dynamicdialog';
import { UserService } from './../user.service';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { TicketAddComponent } from './ticket-add/ticket-add.component';
import { TicketReplyComponent } from './ticket-reply/ticket-reply.component';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
  providers: [MessageService, DialogService],
})
export class TicketsComponent implements OnInit {
  tickets: any[];
  ticketsCount: number = 0;

  constructor(
    private messageService: MessageService,
    private service: UserService,
    private token: TokenService,
    private localStorage: LocalStorageService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.getTickets();
    this.service
    .getCountOfAllTickets(
      this.localStorage.userToken,
      this.localStorage.userID
    )
    .subscribe((result) => {
      if (result.success === true) {
        this.ticketsCount = result.data;
      }
      else {
        this.token.checkTokenExamination(result.data, 'user');
      }
    });
  }

  getTickets(): any {
    this.service
      .getAllTicketsByUserId(this.localStorage.userToken, this.localStorage.userID)
      .subscribe((response) => {
        if (response.success === true) {
          this.tickets = response.data;

        } else {
          this.token.checkTokenExamination(response.data, 'user');
          this.messageService.add({
            severity: 'error',
            summary: ' دریافت اطلاعات ',
            detail: response.data,
          });
        }
      });
  }

  showAddTicketDialog(): void {
    const ref = this.dialogService.open(TicketAddComponent, {
      header: 'ثبت پیام',
      width: '70%',
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت اطلاعات ',
          detail: 'اطلاعات با موفقیت ثبت شد.',
        });
        this.getTickets();
      }
    });
  }



  showReplyTicketDialog(ticketId: string): void {
    const ref = this.dialogService.open(TicketReplyComponent, {
      data: {
        ticketId,
      },
      header: 'پاسخ تیکت',
      width: '70%',
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ویرایش اطلاعات ',
          detail: 'اطلاعات با موفقیت ویرایش شد.',
        });
        this.getTickets();
      }
    });
  }
}
