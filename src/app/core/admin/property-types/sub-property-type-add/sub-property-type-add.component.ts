import { LocalStorageService } from './../../../../auth/local-storage.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AdminService } from './../../admin.service';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-property-type-add',
  templateUrl: './sub-property-type-add.component.html',
  styleUrls: ['./sub-property-type-add.component.scss'],
  providers: [MessageService],
})
export class SubPropertyTypeAddComponent implements OnInit {
  form: FormGroup;

  errorMessages = {
    title: [{ type: 'required', message: 'عنوان را وارد کنید.' }],
    image: [{ type: 'required', message: 'تصویر را آپلود کنید.' }],
  };
  constructor(
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private service: AdminService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      propertyTypeID: new FormControl(
        this.config.data.typeId,
        Validators.compose([Validators.required])
      ),
      title: new FormControl(null, Validators.compose([Validators.required])),
      image: new FormControl(null, Validators.compose([Validators.required])),
    });
  }
  onFileUpload(event): void {
    const formData = new FormData();
    formData.append('file', event.files[0], event.files[0].name);
    this.service
      .uploadFile(formData).subscribe((response) => {
        if (response.success === true) {
          this.form.controls.image.setValue(response.imagePath);
          this.messageService.add({
            severity: 'success',
            summary: ' آپلود تصویر  ',
            detail: 'تصویر با موفقیت آپلود شد.',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' آپلود تصویر  ',
            detail: response.data,
          });
        }
      });
  }
  submitForm(): void {
    this.service
      .addSubPropertyType(this.localStorage.userToken, this.form.value)
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
