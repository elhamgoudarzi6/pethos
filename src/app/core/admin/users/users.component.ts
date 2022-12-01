import { TokenService } from './../../../auth/token.service';
import { LocalStorageService } from './../../../auth/local-storage.service';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserAddComponent } from './user-add/user-add.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService],
})
export class UsersComponent implements OnInit {
  users: any[];

  constructor(
    private messageService: MessageService,
    private service: AdminService,
    private token: TokenService,
    private localStorage: LocalStorageService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getUsers();
}
  

  getUsers(): any {
    // let body = {
    //   token:this.localStorage.userToken
    // };
    this.service.getAllUsers(this.localStorage.userToken).subscribe((response) => {
      if (response.success === true) {
        this.users = response.data;
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

  showAddUserDialog(): void {
    const ref = this.dialogService.open(UserAddComponent, {
      header: 'ثبت کاربر',
      width: '70%',
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت اطلاعات ',
          detail: 'اطلاعات با موفقیت ثبت شد.',
        });
        this.getUsers();
      }
    });
  }

  showEditUserDialog(id: string): void {
    let user = this.users.filter((x) => x._id == id)[0];
    const ref = this.dialogService.open(UserEditComponent, {
      data: {
        user,
      },
      header: 'ویرایش کاربر',
      width: '70%',
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ویرایش اطلاعات ',
          detail: 'اطلاعات با موفقیت ویرایش شد.',
        });
        this.getUsers();
      }
    });
  }

  showDetailsUserDialog(id: string): void {
    let user = this.users.filter((x) => x._id == id)[0];
    const ref = this.dialogService.open(UserDetailsComponent, {
      data: {
        user,
      },
      header: 'مشاهده اطلاعات کاربر',
      width: '70%',
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.getUsers();
      }
    });
  }

  deleteUser(id: any, image: any): void {
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

        this.service.deleteUser(this.localStorage.userToken, id).subscribe((response) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({
              severity: 'success',
              summary: ' حذف اطلاعات ',
              detail: response.data,
            });
            this.getUsers();
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
