import { TokenService } from './../../../auth/token.service';
import { SetVisitDateTimeComponent } from './set-visit-date-time/set-visit-date-time.component';
import { AddStatusRequestComponent } from './add-status-request/add-status-request.component';
import { LocalStorageService } from './../../../auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-visit-requests',
  templateUrl: './visit-requests.component.html',
  styleUrls: ['./visit-requests.component.scss'],
  providers: [MessageService, DialogService]
})
export class VisitRequestsComponent implements OnInit {
  requests: any[];
  constructor(
    private messageService: MessageService,
    private service: AdminService,
    private token: TokenService,
    private localStorage: LocalStorageService,
    private dialogService: DialogService,

  ) { }

  ngOnInit(): void {
    this.getRequests();
  }

  getRequests(): any {
    this.service
      .getAllVisitRequests(this.localStorage.userToken)
      .subscribe((response) => {
        if (response.success === true) {
          this.requests = response.data;
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

  showSetVisitDateTimeDialog(requestId: string): void {
    const ref = this.dialogService.open(SetVisitDateTimeComponent, {
      data: {
        requestId,
      },
      header: 'ثبت تاریخ و زمان بازدید',
      width: '70%',
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ویرایش اطلاعات ',
          detail: 'اطلاعات با موفقیت ثبت شد.',
        });
        this.getRequests();
      }
    });
  }

  showAddStatusRequestDialog(requestId: string,status:any): void {
    const ref = this.dialogService.open(AddStatusRequestComponent, {
      data: {
        requestId,status
      },
      header: 'ثبت وضعیت جدید',
      width: '70%',
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ویرایش اطلاعات ',
          detail: 'اطلاعات با موفقیت ثبت شد.',
        });
        this.getRequests();
      }
    });
  }

}
