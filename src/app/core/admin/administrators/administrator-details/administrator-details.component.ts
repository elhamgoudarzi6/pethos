import { AdminService } from './../../admin.service';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-administrator-details',
  templateUrl: './administrator-details.component.html',
  styleUrls: ['./administrator-details.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class AdministratorDetailsComponent implements OnInit {
  admin: any;
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private localStorage: LocalStorageService,
    private service: AdminService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.admin = this.config.data.admin;
  }

  deleteAdmin(): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
        if (this.admin.image !== '' || this.admin.image !== null) {
          const filename = this.admin.image.replace(/^.*[\\\/]/, '');
          this.service.deleteFile({
            path: filename,
          });
        }

        this.service
          .deleteAdmin(this.localStorage.userToken, this.admin._id)
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
