import { TokenService } from './../../../auth/token.service';

import { DialogService } from 'primeng/dynamicdialog';
import { AgentService } from './../agent.service';
import { LocalStorageService } from 'src/app/auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { MyTicketAddComponent } from './my-ticket-add/my-ticket-add.component';
import { MyTicketReplyComponent } from './my-ticket-reply/my-ticket-reply.component';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.scss'],
  providers: [MessageService, DialogService]

})
export class MyTicketsComponent implements OnInit {

  tickets: any[];

  constructor(
    private messageService: MessageService,
    private service: AgentService,
    private token: TokenService,
    private localStorage: LocalStorageService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.getTickets();
  }

  getTickets(): any {
    this.service
      .getAllTicketsByAgentId(this.localStorage.userToken,
         this.localStorage.userID)
      .subscribe((response) => {
        if (response.success === true) {
          this.tickets = response.data;
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

  showAddTicketDialog(): void {
    const ref = this.dialogService.open(MyTicketAddComponent, {
      header: 'ثبت تیکت',
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
    const ref = this.dialogService.open(MyTicketReplyComponent, {
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
