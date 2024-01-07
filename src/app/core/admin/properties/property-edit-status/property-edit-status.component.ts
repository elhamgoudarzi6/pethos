import { AdminService } from './../../admin.service';
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
  propertyTypes: any[] = [];
  subPropertyTypes: any[] = [];
  agents: any[] = [];
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
      { status: 'فعال', value: 'true' },
      { status: 'غیرفعال', value: 'false' },
    ];
    this.Confirmation = [
      { status: 'تایید', value: 'true' },
      { status: 'رد', value: 'false' },
    ];
    this.property = this.config.data.property;
    this.createForm();
    this.getPropertyTypes();
  }

  onStatusChange(e: any) {
    this.form.controls.active.setValue(e.value.value);
  }
  onConfirmationChange(e: any) {
    this.form.controls.agentConfirm.setValue(e.value.value);
  }

  onTypeChange(e: any) {
    this.form.controls.propertyTypeID.setValue(e.value._id);
    this.subPropertyTypes = e.value.SubPropertyType;
  }

  onSubTypeChange(e: any) {
    this.form.controls.subPropertyTypeID.setValue(e.value._id);
    this.service
      .getAllAgentsByCategoryId(
        this.localStorage.userToken, this.form.controls.subPropertyTypeID.value)
      .subscribe((response) => {
        if (response.success === true) {
          this.agents = response.data;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' دریافت اطلاعات ',
            detail: response.data,
          });
        }
      });
  }
  onAgentChange(e: any) {
    this.form.controls.agentID.setValue(e.value._id);
  }

  createForm() {
    this.form = this.formBuilder.group({
      active: new FormControl(null),
      agentConfirm: new FormControl(null),
      propertyTypeID: new FormControl(null),
      subPropertyTypeID: new FormControl(null),
      agentID: new FormControl(null),
    });
  }


  submitForm(): void {
    let data = {
      active: this.form.controls.active.value,
      agentConfirm: this.form.controls.agentConfirm.value,
      agentID: this.form.controls.agentID.value,
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

  getPropertyTypes(): any {
    this.service
      .getAllPropertyTypes(this.localStorage.userToken)
      .subscribe((response) => {
        if (response.success === true) {
          this.propertyTypes = response.data;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' دریافت اطلاعات ',
            detail: response.data,
          });
        }
      });
  }
}
