import { AgentService } from './../../agent.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LocalStorageService } from 'src/app/auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-edit',
  templateUrl: './property-edit-status.component.html',
  styleUrls: ['./property-edit-status.component.scss'],
  providers: [MessageService],
})
export class PropertyEditStatusComponent implements OnInit {
  public form: FormGroup;
  property: any;
  statuses: any[];
  Confirmation: any[];
  constructor(
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private service: AgentService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.statuses = [
      { status: 'فعال', value: 'true' },
      { status: 'غیرفعال', value: 'false' },
    ];
    this.Confirmation = [
      { status: 'تایید', value: 'true' },
      { status: 'تایید نشده', value: 'false' },
    ];
    this.property = this.config.data.property;
    this.createForm();
  }

  onStatusChange(e: any) {
    this.form.controls.active.setValue(e.value.value);
  }
  onConfirmationChange(e: any) {
    this.form.controls.agentConfirm.setValue(e.value.value);
  }

  createForm() {
    this.form = this.formBuilder.group({
      active: new FormControl(null),
      agentConfirm: new FormControl(null),
    });
  }


  submitForm(): void {
    let data = {
      active: this.form.controls.active.value,
      agentConfirm: this.form.controls.agentConfirm.value,
    }
    this.service.updateProperty(this.localStorage.userToken, this.property._id, data)
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
