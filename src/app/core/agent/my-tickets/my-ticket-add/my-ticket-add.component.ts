import { LocalStorageService } from 'src/app/auth/local-storage.service';
import { AgentService } from './../../agent.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-ticket-add',
  templateUrl: './my-ticket-add.component.html',
  styleUrls: ['./my-ticket-add.component.scss'],
  providers: [MessageService]
})
export class MyTicketAddComponent implements OnInit {
  form: FormGroup;
  users: any[] = [];
  selectedUser: any;
  errorMessages = {
    title: [{ type: 'required', message: 'عنوان را وارد کنید.' }],
    message: [{ type: 'required', message: 'پیام را وارد کنید.' }],
    userID: [{ type: 'required', message: 'کاربر را انتخاب کنید.' }],
  };
  constructor(
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private service: AgentService,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getUsers();
  }

  getUsers(): any {
    this.service
      .getAllUser(this.localStorage.userToken)
      .subscribe((response) => {
        if (response.success === true) {
          this.users = response.data;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' دریافت اطلاعات ',
            detail: response.data,
          });
        }
      });
  }

  onUserChange(e: any) {
    this.form.controls.userID.setValue(e.value._id);
  }
  createForm() {
    this.form = new FormGroup({
      title: new FormControl(null),
      userID: new FormControl(null, Validators.compose([Validators.required])),
      agentID: new FormControl(this.localStorage.userID),
      date: new FormControl(null),
      time: new FormControl(null),
      detail: new FormGroup({
        message: new FormControl(
          null,
          Validators.compose([Validators.required])
        ),
        from: new FormControl('agent'),
        to: new FormControl('user'),
        date: new FormControl(null),
        time: new FormControl(null),
      }),
    });
  }

  submitForm(): void {
    this.form.patchValue({
      date: new Date().toLocaleDateString('fa-IR'),
      time: new Date().toLocaleTimeString('fa-IR'),
      detail: {
        date: new Date().toLocaleDateString('fa-IR'),
        time: new Date().toLocaleTimeString('fa-IR'),
      },
    });

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
  }
}
