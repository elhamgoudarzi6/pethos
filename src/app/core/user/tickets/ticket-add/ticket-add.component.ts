import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './../../user.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { LocalStorageService } from 'src/app/auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-add',
  templateUrl: './ticket-add.component.html',
  styleUrls: ['./ticket-add.component.scss'],
  providers: [MessageService],
})
export class TicketAddComponent implements OnInit {
  form: FormGroup;
  categories: any[] = [];
  selectedCategory: any;
  errorMessages = {
    title: [{ type: 'required', message: 'عنوان را وارد کنید.' }],
    message: [{ type: 'required', message: 'پیام را وارد کنید.' }],
    propertyCategoryID: [
      { type: 'required', message: 'دسته بندی املاک را انتخاب کنید.' },
    ],
  };
  constructor(
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private service: UserService,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.getCategories();
  }

  getCategories(): any {
    this.service
      .getAllAgentCategory(this.localStorage.userToken)
      .subscribe((response) => {
        if (response.success === true) {
          this.categories = response.data;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' دریافت اطلاعات ',
            detail: response.data,
          });
        }
      });
  }

  onCategoryChange(e: any) {
    this.selectedCategory = e.value._id;
  }

  createForm() {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.compose([Validators.required])),
      propertyCategoryID: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
      userID: new FormControl(this.localStorage.userID),
      agentID: new FormControl(null),
      date: new FormControl(null),
      time: new FormControl(null),
      detail: new FormGroup({
        message: new FormControl(
          null,
          Validators.compose([Validators.required])
        ),
        from: new FormControl('user'),
        to: new FormControl('agent'),
        date: new FormControl(null),
        time: new FormControl(null),
      }),
    });
  }

  submitForm(): void {
    let agentId;
    this.service
      .getAllAgentsByCategoryId(
        this.localStorage.userToken,
        this.selectedCategory
      )
      .subscribe((response) => {
        if (response.success === true) {
          if (response.data.length === 0) {
            this.messageService.add({
              severity: 'error',
              summary:
                ' برای این دسته بندی هیچ مشاوری تعریف نشده است. با مدیر سیستم تماس بگیرید. ',
              detail: response.data,
            });
            return;
          } else if (response.data.length === 1) {
            agentId = response.data[0]._id;
          } else {
            agentId =
              response.data[this.generateRandom(response.data.length)]._id;
          }

          this.form.controls.agentID.setValue(agentId);
          this.form.patchValue({
            date: new Date().toLocaleDateString('fa-IR'),
            time: new Date().toLocaleTimeString('fa-IR'),
            detail: {
              date: new Date().toLocaleDateString('fa-IR'),
              time: new Date().toLocaleTimeString('fa-IR'),
            },
          });
          console.log(this.form.value);

          this.service
            .addTicket(this.localStorage.userToken, this.form.value)
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
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' ثبت اطلاعات ',
            detail: response.data,
          });
        }
      });
  }

  generateRandom(max) {
    return Math.floor(Math.random() * max);
  }
}
