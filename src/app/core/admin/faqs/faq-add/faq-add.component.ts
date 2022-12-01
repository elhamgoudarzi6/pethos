import { LocalStorageService } from './../../../../auth/local-storage.service';
import { AdminService } from './../../admin.service';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-faq-add',
  templateUrl: './faq-add.component.html',
  styleUrls: ['./faq-add.component.scss'],
  providers: [MessageService],
})
export class FaqAddComponent implements OnInit {
  categories: any[] = [];
  form: FormGroup;
  errorMessages = {
    question: [{ type: 'required', message: 'سوال را وارد کنید.' }],
    reply: [{ type: 'required', message: 'پاسخ را وارد کنید.' }],
    category: [{ type: 'required', message: 'دسته بندی را وارد کنید.' }],
  };
  constructor(
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private service: AdminService,
    public ref: DynamicDialogRef
  ) {
    this.categories = [
      { name: 'خرید / فروش', code: 'خرید / فروش' },
      { name:'رهن / اجاره', code:'رهن / اجاره' },
    ];
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      question: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
      reply: new FormControl(null, Validators.compose([Validators.required])),
      category: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
    });
  }

  submitForm(): void {
    this.form.controls.category.setValue(
      this.form.controls.category.value.name
    );
    this.service
      .addFaq(this.localStorage.userToken, this.form.value)
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
