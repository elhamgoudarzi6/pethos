import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AdminService } from './../../admin.service';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-add-status-request',
  templateUrl: './add-status-request.component.html',
  styleUrls: ['./add-status-request.component.scss']
})
export class AddStatusRequestComponent implements OnInit {
  statuses: any[];
  allStatus: any[] = [];
  public form: FormGroup;
  constructor(
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private service: AdminService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.statuses = [
      { status: 'در حال بررسی' },
      { status: 'تعیین زمان بازدید' },
      { status: 'بازدید شد' },
      { status: 'پسندیده شد' },
      { status: 'پسندیده نشد' },
      { status: 'قرارداد بسته شد' },
      { status: 'به توافق نرسید' },
    ];
    this.createForm();
    this.allStatus = this.config.data.status;
  }
  createForm() {
    this.form = this.formBuilder.group({
      status: new FormControl(null),
    });
  }

  onStatusChange(e: any) {
    this.form.controls.status.setValue(e.value.status);
  }

  submitForm(): void {
    let data = {
      status: {
        status:this.form.controls.status.value,
        date: new Date().toLocaleDateString('fa-IR'),
        time: new Date().toLocaleTimeString('fa-IR'),
      }
    }
    this.service
      .updateStatusRequestVisit(this.localStorage.userToken,
        this.config.data.requestId, data)
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
