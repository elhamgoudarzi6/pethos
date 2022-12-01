import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { LocalStorageService } from 'src/app/auth/local-storage.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class NewsDetailsComponent implements OnInit {
  news: any;
  keywords: string[] = [];
  imageDescription: string[] = [];
  metaDescription: string[] = [];
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private localStorage: LocalStorageService,
    private service: AdminService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.news = this.config.data.news;
    this.keywords = this.news.keywords.split(',');
    this.imageDescription = this.news.imageDescription.split(',');
    this.metaDescription = this.news.metaDescription.split(',');
  }

  deleteNews(): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        if (this.news.image) {
          const filename = this.news.image.replace(/^.*[\\\/]/, '');
          this.service.deleteFile({
            path: filename,
          });
        }
        // delete from db
        this.service
          .deleteNews(this.localStorage.userToken, this.news._id)
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
