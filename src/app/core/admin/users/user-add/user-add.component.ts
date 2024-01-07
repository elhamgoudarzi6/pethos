import { LocalStorageService } from './../../../../auth/local-storage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from './../../admin.service';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
  providers: [MessageService],
})
export class UserAddComponent implements OnInit {
  form: FormGroup;
  mobileRegix = /^0?9[123]\d{8}$/;
  errorMessages = {
    mobile: [
      { type: 'required', message: 'شماره موبایل را وارد کنید.' },
      { type: 'minlength', message: 'شماره موبایل باید 11 رقم باشد.' },
      { type: 'maxlength', message: 'شماره موبایل باید 11 رقم باشد.' },
      { type: 'pattern', message: 'لطفا شماره موبایل معتبر وارد کنید.' },
    ],
  };
  constructor(
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private service: AdminService,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.createForm();
  }


  createForm() {
    this.form = new FormGroup({
      mobile: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(this.mobileRegix),
        ])
      ),
      birthDate: new FormControl(null),
      fullName: new FormControl(null),
      image: new FormControl(null),
    });
  }

  onFileUpload(event): void {
    const formData = new FormData();
    formData.append('file', event.files[0], event.files[0].name);
    this.service
      .uploadFile(formData)
      .subscribe((response) => {
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
      .addUser(this.localStorage.userToken, this.form.value)
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
function id(id: any, string: any) {
  throw new Error('Function not implemented.');
}

