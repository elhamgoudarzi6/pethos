import { AdminService } from './../../admin.service';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.scss'],
  providers: [MessageService],
})
export class NewsEditComponent implements OnInit {
  form: FormGroup;
  news: any;
  keywords: string[] = [];
  imageDescription: string[] = [];
  metaDescription: string[] = [];
  errorMessages = {
    title: [{ type: 'required', message: 'عنوان خبر را وارد کنید.' }],
    brief: [{ type: 'required', message: 'خلاصه خبر را وارد کنید.' }],
    details: [{ type: 'required', message: 'متن خبر را وارد کنید.' }],
    image: [{ type: 'required', message: 'تصویر خبر را آپلود کنید.' }],
  };
  constructor(
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private service: AdminService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.news = this.config.data.news;
    this.news = this.config.data.news;
    this.keywords = this.news.keywords.split(',');
    this.imageDescription = this.news.imageDescription.split(',');
    this.metaDescription = this.news.metaDescription.split(',');

    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      title: new FormControl(
        this.news.title,
        Validators.compose([Validators.required])
      ),
      brief: new FormControl(
        this.news.brief,
        Validators.compose([Validators.required])
      ),
      details: new FormControl(
        this.news.details,
        Validators.compose([Validators.required])
      ),
      keywords: new FormControl(this.keywords),
      image: new FormControl(
        this.news.image,
        Validators.compose([Validators.required])
      ),
      imageDescription: new FormControl(this.imageDescription),
      metaDescription: new FormControl(this.metaDescription),
      tags: new FormControl(this.news.tags),
      date: new FormControl(this.news.date),
    });
  }

  onFileUpload(event): void {
    const formData = new FormData();
    formData.append('file', event.files[0], event.files[0].name);
    this.service.uploadFile(formData).subscribe((response) => {
      if (response.success === true) {
        this.form.controls.image.setValue(response.imagePath);

        this.messageService.add({
          severity: 'success',
          summary: ' آپلود تصویر محصول ',
          detail: 'تصویر با موفقیت آپلود شد.',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' آپلود تصویر محصول ',
          detail: response.data,
        });
      }
    });
  }

  submitForm(): void {
    this.service
      .updateNews(this.localStorage.userToken, this.news._id, this.form.value)
      .subscribe((response) => {
        if (response.success === true) {
          this.ref.close(true);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' ثبت اطلاعات ',
            detail: response.data,
          });
        }
      });
  }
}
