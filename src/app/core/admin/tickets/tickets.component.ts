import { TokenService } from './../../../auth/token.service';
import { DialogService } from 'primeng/dynamicdialog';
import { LocalStorageService } from './../../../auth/local-storage.service';
import { AdminService } from './../admin.service';
import {  MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { TicketReplyComponent } from './ticket-reply/ticket-reply.component';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
  providers: [MessageService, DialogService],
})
export class TicketsComponent implements OnInit {
  tickets: any[];
  constructor(
    private messageService: MessageService,
    private service: AdminService,
    private token: TokenService,
    private localStorage: LocalStorageService,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.getTickets();
  }

  getTickets(): any {
    this.service
      .getAllTickets(this.localStorage.userToken)
      .subscribe((response) => {
        if (response.success === true) {
          this.tickets = response.data;
          (this.tickets)
        } else {
          this.token.checkTokenExamination(response.data, 'admin');
          this.messageService.add({
            severity: 'error',
            summary: ' دریافت اطلاعات ',
            detail: response.data,
          });
        }
      });
  }

  showReplyTicketDialog(ticketId: string): void {
    const ref = this.dialogService.open(TicketReplyComponent, {
      data: {
        ticketId
      },
      header: 'پاسخ پیام',
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
