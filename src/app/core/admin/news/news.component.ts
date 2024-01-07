import { TokenService } from './../../../auth/token.service';
import { NewsAddComponent } from './news-add/news-add.component';
import { NewsEditComponent } from './news-edit/news-edit.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { LocalStorageService } from './../../../auth/local-storage.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService]
})
export class NewsComponent implements OnInit {
  news: any[];

  constructor(
    private messageService: MessageService,
    private service: AdminService,
    private token: TokenService,
    private localStorage: LocalStorageService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getNews();
  }

  getNews(): any {
    this.service.getAllNews(this.localStorage.userToken).subscribe((response) => {
      if (response.success === true) {
        this.news = response.data;
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

  showAddNewsDialog(): void {
    const ref = this.dialogService.open(NewsAddComponent, {
      header: 'ثبت خبر',
      width: '70%',
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت اطلاعات ',
          detail: 'اطلاعات با موفقیت ثبت شد.',
        });
        this.getNews();
      }
    });
  }

  showEditNewsDialog(id: string): void {
    let news = this.news.filter((x) => x._id == id)[0];
    const ref = this.dialogService.open(NewsEditComponent, {
      data: {
        news,
      },
      header: 'ویرایش خبر',
      width: '70%',
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ویرایش اطلاعات ',
          detail: 'اطلاعات با موفقیت ویرایش شد.',
        });
        this.getNews();
      }
    });
  }

  showDetailsNewsDialog(id: string): void {
    let news = this.news.filter((x) => x._id == id)[0];
    const ref = this.dialogService.open(NewsDetailsComponent, {
      data: {
        news,
      },
      header: 'مشاهده اطلاعات خبر',
      width: '70%',
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.getNews();
      }
    });
  }

  deleteNews(id: any, image: any): void {
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

        this.service.deleteNews(this.localStorage.userToken, id).subscribe((response) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({
              severity: 'success',
              summary: ' حذف اطلاعات ',
              detail: response.data,
            });
            this.getNews();
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
