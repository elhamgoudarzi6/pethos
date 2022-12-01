import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminService } from './../../admin.service';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider-add',
  templateUrl: './slider-add.component.html',
  styleUrls: ['./slider-add.component.scss'],
  providers: [MessageService],
})
export class SliderAddComponent implements OnInit {
  public form: FormGroup;
  errorMessages = {
    tag: [{ type: 'required', message: 'تگ اسلایدر را وارد کنید.' }],
    imageurl: [{ type: 'required', message: 'تصویر اسلایدر را وارد کنید.' }],
  };

  constructor(
    private localStorage: LocalStorageService,
    public service: AdminService,
    public messageService: MessageService,
    public dialogRef: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.createform();
  }

  createform(): void {
    this.form = new FormGroup({
      link: new FormControl(null),
      tag: new FormControl(null, Validators.compose([Validators.required])),
      imageurl: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
    });
  }

  onFileUpload(event): void {
    const formData = new FormData();
    formData.append('file', event.files[0], event.files[0].name);
    this.service
    .uploadFile(formData)
      .subscribe((response) => {
        if (response.success === true) {
          this.form.controls.imageurl.setValue(response.imagePath);

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
      .addSlider(this.localStorage.userToken, this.form.value)
      .subscribe((response) => {
        if (response.success === true) {
          this.dialogRef.close(true);
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
