import { TokenService } from './../../../auth/token.service';
import { FaqEditComponent } from './faq-edit/faq-edit.component';
import { FaqDetailsComponent } from './faq-details/faq-details.component';
import { FaqAddComponent } from './faq-add/faq-add.component';
import { AdminService } from './../admin.service';
import { LocalStorageService } from './../../../auth/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService]
})
export class FaqsComponent implements OnInit {

  faqs: any[];

  constructor(
    private messageService: MessageService,
    private service: AdminService,
    private token: TokenService,
    private localStorage: LocalStorageService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getFaqs();
  }

  getFaqs(): any {
    this.service.getAllFaqs(this.localStorage.userToken).subscribe((response) => {
      if (response.success === true) {
        this.faqs = response.data;
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

  showAddFaqDialog(): void {
    const ref = this.dialogService.open(FaqAddComponent, {
      header: 'ثبت سوال متداول',
      width: '70%',
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت اطلاعات ',
          detail: 'اطلاعات با موفقیت ثبت شد.',
        });
        this.getFaqs();
      }
    });
  }

  showEditFaqDialog(id: string): void {
    let faq = this.faqs.filter((x) => x._id == id)[0];
    const ref = this.dialogService.open(FaqEditComponent, {
      data: {
        faq,
      },
      header: 'ویرایش سوال متداول',
      width: '70%',
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ویرایش اطلاعات ',
          detail: 'اطلاعات با موفقیت ویرایش شد.',
        });
        this.getFaqs();
      }
    });
  }

  showDetailsFaqDialog(id: string): void {
    let faq = this.faqs.filter((x) => x._id == id)[0];
    const ref = this.dialogService.open(FaqDetailsComponent, {
      data: {
        faq,
      },
      header: 'مشاهده اطلاعات سوال متداول',
      width: '70%',
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.getFaqs();
      }
    });
  }

  deleteFaq(id: any, image: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        this.service.deleteFaq(this.localStorage.userToken, id).subscribe((response) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({
              severity: 'success',
              summary: ' حذف اطلاعات ',
              detail: response.data,
            });
            this.getFaqs();
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
