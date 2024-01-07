import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AdminService } from './../../admin.service';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-set-visit-date-time',
  templateUrl: './set-visit-date-time.component.html',
  styleUrls: ['./set-visit-date-time.component.scss'],
  providers: [MessageService]
})
export class SetVisitDateTimeComponent implements OnInit {
  form: FormGroup;
  statusForm: FormGroup;
  visitStates: any;
  errorMessages = {
    dateVisit: [{ type: 'required', message: 'تاریخ بازدید را وارد کنید.' }],
    // status: [{ type: 'required', message: 'وضعیت بازدید را انتخاب کنید.' }],
    timeVisit: [{ type: 'required', message: 'ساعت بازدید را وارد کنید.' }],
  };
  allStatus: any[] = [];
  constructor(
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private service: AdminService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.service
      .getAllVisitRequestsByAgent(this.localStorage.userToken, this.localStorage.userID)
      .subscribe((response) => {
        if (response.success === true) {
          this.allStatus = response.data[0].status;
        } else {
          // this.token.checkTokenExamination(response.data, 'admin');
          this.messageService.add({
            severity: 'error',
            summary: ' دریافت اطلاعات ',
            detail: response.data,
          });
        }
      });
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      timeVisit: new FormControl(null, Validators.compose([Validators.required])),
      dateVisit: new FormControl(null, Validators.compose([Validators.required])),
    });

  }


  submitForm(): void {
    this.service
      .updateVisitRequest(this.localStorage.userToken, this.config.data.requestId, this.form.value)
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


  // addStatus(date: any, time: any) {
  //   if (date != '' && time != '') {
  //     this.allStatus.push({
  //       date: date,
  //       time: time,
  //       status: "ok",
  //     });
  //   } else {
  //     console.log('err')
  //   }
  // }

  // deleteStatus(index: any) {
  //   this.allStatus.splice(index, 1);
  // }
}
