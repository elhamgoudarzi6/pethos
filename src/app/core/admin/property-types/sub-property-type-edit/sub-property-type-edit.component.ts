import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AdminService } from './../../admin.service';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-property-type-edit',
  templateUrl: './sub-property-type-edit.component.html',
  styleUrls: ['./sub-property-type-edit.component.scss'],
})
export class SubPropertyTypeEditComponent implements OnInit {
  form: FormGroup;
  type: any;
  types: any;
  errorMessages = {
    propertyTypeID: [
      { type: 'required', message: 'دسته بندی را انتخاب کنید.' },
    ],
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
    this.type = this.config.data.type;
    this.createForm();
    this.getPropertyTypes();
  }

  getPropertyTypes(): any {
    this.service
      .getAllPropertyTypes(this.localStorage.userToken)
      .subscribe((response) => {
        if (response.success === true) {
          this.types = response.data;
          this.types.forEach((element) => {
            if (element._id === this.type.propertyTypeID) {
              this.form.controls.propertyTypeID.setValue(element);
            }
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' دریافت اطلاعات ',
            detail: response.data,
          });
        }
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
  createForm() {
    this.form = new FormGroup({
      propertyTypeID: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
      title: new FormControl(
        this.type.title,
        Validators.compose([Validators.required])
      ),
      image: new FormControl(
        this.type.image,
        Validators.compose([Validators.required])
      ),
    });
  }

  submitForm(): void {
    this.service
      .updateSubPropertyType(
        this.localStorage.userToken,
        this.type._id,
        this.form.value
      )
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
