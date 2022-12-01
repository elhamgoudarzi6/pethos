import { LocalStorageService } from './../../../../auth/local-storage.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AdminService } from './../../admin.service';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-discount-add',
  templateUrl: './discount-add.component.html',
  styleUrls: ['./discount-add.component.scss'],
  providers: [MessageService],
})
export class DiscountAddComponent implements OnInit {
  public form: FormGroup;
  errorMessages = {
    discountTitle: [{ type: 'required', message: 'عنوان تخفیف را وارد کنید.' }],
    discountPercent: [
      { type: 'required', message: 'درصد تخفیف را وارد کنید.' },
    ],
  };

  constructor(
    private service: AdminService,
    private localStorage: LocalStorageService,
    public ref: DynamicDialogRef,
    public messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.createform();
  }

  createform(): void {
    this.form = new FormGroup({
      discountTitle: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
      discountCode: new FormControl(null),
      discountPercent: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
    });
  }

  submitForm(): void {
    this.service
      .addDiscount(this.localStorage.userToken, this.form.value)
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
