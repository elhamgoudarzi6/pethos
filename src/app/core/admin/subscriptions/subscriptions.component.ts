import { TokenService } from './../../../auth/token.service';
import { LocalStorageService } from './../../../auth/local-storage.service';
import { AdminService } from './../admin.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class SubscriptionsComponent implements OnInit {
  subscriptions: any[];

  constructor(
    private messageService: MessageService,
    private service: AdminService,
    private token: TokenService,
    private localStorage: LocalStorageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getSubscriptions();
  }

  getSubscriptions(): any {
    this.service
      .getAllSubscriptions(this.localStorage.userToken)
      .subscribe((response) => {
        if (response.success === true) {
          this.subscriptions = response.data;
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

  deleteSubscription(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        this.service
          .deleteSubscription(this.localStorage.userToken, id)
          .subscribe((response) => {
            if (response.success === true) {
              this.confirmationService.close();
              this.messageService.add({
                severity: 'success',
                summary: ' حذف اطلاعات ',
                detail: response.data,
              });
              this.getSubscriptions();
            } else {
              this.messageService.add({
                severity: 'error',
                summary: ' حذف اطلاعات ',
                detail: response.data,
              });
            }
          });
      },
      reject: () => {
        // close
        this.confirmationService.close();
      },
    });
  }
}
