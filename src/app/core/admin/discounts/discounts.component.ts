import { TokenService } from './../../../auth/token.service';
import { DiscountAddComponent } from './discount-add/discount-add.component';
import { DiscountEditComponent } from './discount-edit/discount-edit.component';
import { LocalStorageService } from './../../../auth/local-storage.service';
import { AdminService } from './../admin.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService],
})
export class DiscountsComponent implements OnInit {
  discounts: any[];

  constructor(
    private messageService: MessageService,
    private service: AdminService,
    private token: TokenService,
    private localStorage: LocalStorageService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getDiscounts();
  }

  getDiscounts(): any {
    this.service
      .getAllDiscounts(this.localStorage.userToken)
      .subscribe((response) => {
        if (response.success === true) {
          this.discounts = response.data;
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

  showEditDiscountDialog(id: string): void {
    let discount = this.discounts.filter((x) => x._id == id)[0];

    const ref = this.dialogService.open(DiscountEditComponent, {
      data: {
        discount,
      },
      header: 'ویرایش تخفیف',
      width: '70%',
    });

    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ویرایش اطلاعات ',
          detail: 'اطلاعات با موفقیت ویرایش شد.',
        });
        this.getDiscounts();
      }
    });
  }

  showAddDiscountDialog(): void {
    const ref = this.dialogService.open(DiscountAddComponent, {
      header: 'ثبت تخفیف',
      width: '70%',
    });

    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت اطلاعات ',
          detail: 'اطلاعات با موفقیت ثبت شد.',
        });
        this.getDiscounts();
      }
    });
  }

  deleteDiscount(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
        this.service.deleteDiscount(this.localStorage.userToken, id).subscribe((response) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({
              severity: 'success',
              summary: ' حذف اطلاعات ',
              detail: response.data,
            });
            this.getDiscounts();
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
