import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { AdminService } from './../../admin.service';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-faq-details',
  templateUrl: './faq-details.component.html',
  styleUrls: ['./faq-details.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class FaqDetailsComponent implements OnInit {
  faq: any;
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private localStorage: LocalStorageService,
    private service: AdminService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.faq = this.config.data.faq;
  }

  deleteFaq(): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
        this.service
          .deleteFaq(this.localStorage.userToken, this.faq._id)
          .subscribe((response) => {
            if (response.success === true) {
              this.confirmationService.close();
              this.messageService.add({
                severity: 'success',
                summary: ' حذف اطلاعات ',
                detail: response.data,
              });

              this.ref.close(true);
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

  cancel() {
    this.ref.close();
  }
}
