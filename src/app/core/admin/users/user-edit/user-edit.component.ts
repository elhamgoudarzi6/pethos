import { LocalStorageService } from './../../../../auth/local-storage.service';
import { AdminService } from './../../admin.service';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  providers: [MessageService],
})
export class UserEditComponent implements OnInit {
  user: any;
  form: FormGroup;
  levels: any[] = [];
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
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.user = this.config.data.user;
    this.levels = [
      { name: 'معمولی', code: 'معمولی' },
      { name: 'ویژه', code: 'ویژه' },
    ];
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      mobile: new FormControl(
        this.user.mobile,
        Validators.compose([
          Validators.required,
          Validators.pattern(this.mobileRegix),
        ])
      ),
      birthDate: new FormControl(this.user.birthDate),
      fullName: new FormControl(this.user.fullName),
      image: new FormControl(this.user.image),
      rating: new FormControl(this.user.rating),
      walletValue: new FormControl(this.user.walletValue),
      level: new FormControl(this.user.level),
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
      .updateUser(this.localStorage.userToken, this.user._id, this.form.value)
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
