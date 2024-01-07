import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from './../../admin.service';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-administrator-edit',
  templateUrl: './administrator-edit.component.html',
  styleUrls: ['./administrator-edit.component.scss'],
  providers: [MessageService]
})
export class AdministratorEditComponent implements OnInit {
  admin: any;
  form: FormGroup;
  errorMessages = {
    fullName: [
      { type: 'required', message: 'نام و نام خانوادگی را وارد کنید.' },
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
    this.admin = this.config.data.admin;

    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      fullName: new FormControl(
        this.admin.fullName,
        Validators.compose([Validators.required])
      ),
      image: new FormControl(this.admin.image),
      accessLevel: new FormControl(this.admin.accessLevel),
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
      .updateAdmin(this.localStorage.userToken, this.admin._id, this.form.value)
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
