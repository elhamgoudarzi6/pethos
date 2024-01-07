import { AdminService } from './../../admin.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider-edit',
  templateUrl: './slider-edit.component.html',
  styleUrls: ['./slider-edit.component.scss'],
  providers: [MessageService]
})
export class SliderEditComponent implements OnInit {

  slider: any;
  public form: FormGroup;
  errorMessages = {
    tag: [{ type: 'required', message: 'تگ اسلایدر را وارد کنید.' }],
    imageurl: [{ type: 'required', message: 'تصویر اسلایدر را وارد کنید.' }],
  };

  constructor(
    private localStorage: LocalStorageService,
    public service: AdminService,
    public messageService: MessageService,
    public config: DynamicDialogConfig,
    public dialogRef: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.slider = this.config.data.slider;
    this.createform();
  }

  createform(): void {
    this.form = new FormGroup({
      link: new FormControl(this.slider.link),
      tag: new FormControl(this.slider.tag, Validators.compose([Validators.required])),
      imageurl: new FormControl(
        this.slider.imageurl,
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
      .updateSlider(this.localStorage.userToken,this.slider._id, this.form.value)
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
