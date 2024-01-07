import { AdministratorSecurityComponent } from './administrator-security/administrator-security.component';
import { TokenService } from './../../../auth/token.service';
import { LocalStorageService } from './../../../auth/local-storage.service';
import { AdministratorDetailsComponent } from './administrator-details/administrator-details.component';
import { AdministratorEditComponent } from './administrator-edit/administrator-edit.component';
import { AdministratorAddComponent } from './administrator-add/administrator-add.component';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-administrators',
  templateUrl: './administrators.component.html',
  styleUrls: ['./administrators.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService],

})
export class AdministratorsComponent implements OnInit {

  admins: any[];

  constructor(
    private messageService: MessageService,
    private service: AdminService,
    private token: TokenService,
    private localStorage: LocalStorageService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getAdmins();
  }

  getAdmins(): any {
    this.service.getAllAdmins(this.localStorage.userToken).subscribe((response) => {
      if (response.success === true) {
        this.admins = response.data;
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

  showAddAdminDialog(): void {
    const ref = this.dialogService.open(AdministratorAddComponent, {
      header: 'ثبت مدیر',
      width: '70%',
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت اطلاعات ',
          detail: 'اطلاعات با موفقیت ثبت شد.',
        });
        this.getAdmins();
      }
    });
  }

  showEditAdminDialog(id: string): void {
    let admin = this.admins.filter((x) => x._id == id)[0];
    const ref = this.dialogService.open(AdministratorEditComponent, {
      data: {
        admin,
      },
      header: 'ویرایش ادمین',
      width: '70%',
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ویرایش اطلاعات ',
          detail: 'اطلاعات با موفقیت ویرایش شد.',
        });
        this.getAdmins();
      }
    });
  }
  showEditAdminSecurityDialog(id: string): void {
    let admin = this.admins.filter((x) => x._id == id)[0];
    const ref = this.dialogService.open(AdministratorSecurityComponent, {
      data: {
        admin,
      },
      header: 'ویرایش امنیتی ادمین',
      width: '70%',
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ویرایش اطلاعات ',
          detail: 'اطلاعات با موفقیت ویرایش شد.',
        });
        this.getAdmins();
      }
    });
  }

  showDetailsAdminDialog(id: string): void {
    let admin = this.admins.filter((x) => x._id == id)[0];
    const ref = this.dialogService.open(AdministratorDetailsComponent, {
      data: {
        admin,
      },
      header: 'مشاهده اطلاعات مدیر',
      width: '70%',
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.getAdmins();
      }
    });
  }

  deleteAdmin(id: any, image: string): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
        if (image) {
          const filename = image.replace(/^.*[\\\/]/, '');
          this.service.deleteFile({path: filename});
        }

        this.service.deleteAdmin(this.localStorage.userToken, id).subscribe((response) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({
              severity: 'success',
              summary: ' حذف اطلاعات ',
              detail: response.data,
            });
            this.getAdmins();
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
