import { MessageService } from 'primeng/api';
import { LayoutService } from './../layout.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [MessageService],
})
export class ContactComponent implements OnInit {
  form: FormGroup;
  errorMessages = {
    fullName: [
      { type: 'required', message: 'نام و نام خانوادگی را وارد کنید.' },
    ],
    mobile: [
      { type: 'required', message: 'شماره موبایل را وارد کنید'},
    ],
    email: [
      { type: 'required', message: 'آدرس پست الکترونیکی را وارد کنید.' },
      { type: 'email', message: 'آدرس پست الکترونیکی را صحیح وارد کنید.' },
    ],
    title: [{ type: 'required', message: 'عنوان پیام را وارد کنید.' }],
    message: [{ type: 'required', message: 'متن پیام را وارد کنید.' }],
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
      fullName: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
      email: new FormControl(
        null,
        Validators.compose([Validators.required, Validators.email])
      ),
      mobile:  new FormControl(null, Validators.compose([Validators.required])),
      title: new FormControl(null, Validators.compose([Validators.required])),
      message: new FormControl(null, Validators.compose([Validators.required])),
    });
  }

  addContactMessage() {
    this.service.addContactUs(this.form.value).subscribe((response) => {
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
