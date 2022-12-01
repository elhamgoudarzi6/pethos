import { LocalStorageService } from './../../../../auth/local-storage.service';
import { UserEditComponent } from './../user-edit/user-edit.component';
import { FormGroup, FormControl } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AdminService } from './../../admin.service';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class UserDetailsComponent implements OnInit {
  user: any;
  constructor(
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private confirmationService: ConfirmationService,
    private service: AdminService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.user = this.config.data.user;
  }

  deleteUser(): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
        if (this.user.image !== '' || this.user.image !== null) {
          const filename = this.user.image.replace(/^.*[\\\/]/, '')
          this.service.deleteFile({path: filename});
        }

        this.service.deleteUser(this.localStorage.userToken, this.user._id).subscribe((response) => {
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
