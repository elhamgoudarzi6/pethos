import { LayoutService } from './../../layout.service';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [MessageService],
})
export class FooterComponent implements OnInit {
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
    private service: LayoutService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.createform();
  }

  createform(): void {
    this.form = new FormGroup({
      mobile: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(11),
          Validators.pattern(this.mobileRegix),
        ])
      ),
    });
  }

  subscribe() {
    this.service.addSubscription(this.form.value).subscribe((response) => {
      if (response.success === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت اطلاعات ',
          detail: 'پیام شما با موفقیت ثبت شد.',
        });
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
