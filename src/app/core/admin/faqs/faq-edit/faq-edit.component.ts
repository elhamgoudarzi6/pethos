import { AdminService } from './../../admin.service';
import { MessageService } from 'primeng/api';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-faq-edit',
  templateUrl: './faq-edit.component.html',
  styleUrls: ['./faq-edit.component.scss'],
  providers: [MessageService],
})
export class FaqEditComponent implements OnInit {
  categories: any[] = [];
  form: FormGroup;
  faq: any;
  errorMessages = {
    question: [{ type: 'required', message: 'سوال را وارد کنید.' }],
    reply: [{ type: 'required', message: 'پاسخ را وارد کنید.' }],
    category: [{ type: 'required', message: 'دسته بندی را وارد کنید.' }],
  };
  constructor(
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private service: AdminService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.categories = [
      { name: 'خرید / فروش', code: 'خرید / فروش' },
      { name:'رهن / اجاره', code:'رهن / اجاره' },
    ];
  }

  ngOnInit(): void {
    this.faq = this.config.data.faq;

    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      question: new FormControl(
        this.faq.question,
        Validators.compose([Validators.required])
      ),
      reply: new FormControl(
        this.faq.reply,
        Validators.compose([Validators.required])
      ),
      category: new FormControl(
        this.faq.category,
        Validators.compose([Validators.required])
      ),
    });
  }

  submitForm(): void {
    this.form.controls.category.setValue(
      this.form.controls.category.value.name
    );

    this.service
      .updateFaq(this.localStorage.userToken, this.faq._id, this.form.value)
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
