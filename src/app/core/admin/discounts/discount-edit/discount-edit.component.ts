import { AdminService } from './../../admin.service';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-discount-edit',
  templateUrl: './discount-edit.component.html',
  styleUrls: ['./discount-edit.component.scss'],
  providers: [MessageService],
})
export class DiscountEditComponent implements OnInit {
  public form: FormGroup;
  discount: any;
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
    public messageService: MessageService,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.discount = this.config.data.discount;
    this.createform();
  }

  createform(): void {
    this.form = new FormGroup({
      discountTitle: new FormControl(
        this.discount.discountTitle,
        Validators.compose([Validators.required])
      ),
      discountCode: new FormControl(this.discount.discountCode),
      discountPercent: new FormControl(
        this.discount.discountPercent,
        Validators.compose([Validators.required])
      ),
    });
  }

  submitForm(): void {
    this.service
      .updateDiscount(
        this.localStorage.userToken,
        this.discount._id,
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
