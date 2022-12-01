import { TokenService } from './../../../auth/token.service';
import { UserService } from './../user.service';
import { LocalStorageService } from 'src/app/auth/local-storage.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Component, OnInit } from '@angular/core';
import { StatusRequestComponent } from './status-request/status-request.component';

@Component({
  selector: 'app-visit-requests',
  templateUrl: './visit-requests.component.html',
  styleUrls: ['./visit-requests.component.scss'],
  providers: [MessageService, ConfirmationService,DialogService]
})
export class VisitRequestsComponent implements OnInit {
  requests: any[];
  constructor(
    private messageService: MessageService,
    private service: UserService,
    private token: TokenService,
    private localStorage: LocalStorageService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    this.getRequests();
  }

  getRequests(): any {
    this.service
      .getAllVisitRequests(this.localStorage.userToken, this.localStorage.userID)
      .subscribe((response) => {
        if (response.success === true) {
          this.requests = response.data;
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

  showStatusRequestDialog(requestId: string,status:any): void {
    const ref = this.dialogService.open(StatusRequestComponent, {
      data: {
        requestId,status
      },
      header: 'لیست وضعیت ',
      width: '70%',
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
      }
    });
  }

  deleteVisitRequest(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        this.service.deleteVisitRequest(this.localStorage.userToken, id).subscribe((response) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({
              severity: 'success',
              summary: ' حذف اطلاعات ',
              detail: response.data,
            });
            this.getRequests();
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
