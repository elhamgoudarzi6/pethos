import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AdminService } from './../../admin.service';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agent-add',
  templateUrl: './agent-add.component.html',
  styleUrls: ['./agent-add.component.scss'],
  providers: [MessageService],
})
export class AgentAddComponent implements OnInit {
  form: FormGroup;
  propertyTypes: any[] = [];
  pethos: any[] = [];
  subPethos: any[] = [];
  subSubPethos: any[] = [];
  agentLevel: any[] = [];
  subPropertyTypes: any[] = [];
  min: any;
  max: any;
  mobileRegix = /^0?9[123]\d{8}$/;
  errorMessages = {
    pethosID: [{ type: 'required', message: 'مجموعه را وارد کنید.' }],
    mobile: [
      { type: 'required', message: 'شماره موبایل را وارد کنید.' },
      { type: 'minlength', message: 'شماره موبایل باید 11 رقم باشد.' },
      { type: 'maxlength', message: 'شماره موبایل باید 11 رقم باشد.' },
      { type: 'pattern', message: 'لطفا شماره موبایل معتبر وارد کنید.' },
    ],
    fullName: [
      { type: 'required', message: 'نام و نام خانوادگی را وارد کنید.' },
    ],
    propertyTypeID: [{ type: 'required', message: 'نوع ملک را وارد کنید.' }],
    subPropertyTypeID: [
      { type: 'required', message: 'زیردسته نوع ملک را وارد کنید.' },
    ],
  };

  constructor(
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private service: AdminService,
    public ref: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getPropertyTypes();
    this.getAgentLevel();
    this.getPethos();
  }

  getPethos(): any {
    this.service
      .getAllPethos(this.localStorage.userToken)
      .subscribe((response) => {
        if (response.success === true) {
          this.pethos = response.data;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' دریافت اطلاعات ',
            detail: response.data,
          });
        }
      });
  }

  getAgentLevel(): any {
    this.service
      .getAllAgentLevel(this.localStorage.userToken)
      .subscribe((response) => {
        if (response.success === true) {
          this.agentLevel = response.data;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' دریافت اطلاعات ',
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

  onPethosChange(e: any) {
    this.form.controls.pethosID.setValue(e.value._id);
    this.subPethos = e.value.SubPethos;
  }

  onSubPethosChange(e: any) {
    this.form.controls.subPethosID.setValue(e.value._id);
    this.subSubPethos = e.value.SubSubPethos;
  }

  onSubSubPethosChange(e: any) {
    this.form.controls.subSubPethosID.setValue(e.value._id);
  }

  onLevelChange(e: any) {
    this.form.controls.levelID.setValue(e.value._id);
    this.min = e.value.min;
    this.max = e.value.max;
  }

  onTypeChange(e: any) {
    this.form.controls.propertyTypeID.setValue(e.value._id);
    this.subPropertyTypes = e.value.SubPropertyType;
  }

  onSubTypeChange(e: any) {
    this.form.controls.subPropertyTypeID.setValue(e.value._id);
  }

  createForm() {
    this.form = new FormGroup({
      pethosID: new FormControl(null,
        Validators.compose([Validators.required])),
      subPethosID: new FormControl(null,
        Validators.compose([Validators.required])),
      subSubPethosID: new FormControl(null,
        Validators.compose([Validators.required])),
      mobile: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(11),
          Validators.pattern(this.mobileRegix),
        ])
      ),
      info: new FormControl(null),
      levelID: new FormControl(null),
      propertyTypeID: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
      subPropertyTypeID: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
      fullName: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
      image: new FormControl(null),
    });
  }

  onFileUpload(event): void {
    const formData = new FormData();
    formData.append('file', event.files[0], event.files[0].name);
    this.service
      .uploadFile(formData).subscribe((response) => {
        if (response.success === true) {
          this.form.controls.image.setValue(response.imagePath);
          this.messageService.add({
            severity: 'success',
            summary: ' آپلود تصویر  ',
            detail: 'تصویر با موفقیت آپلود شد.',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' آپلود تصویر  ',
            detail: response.data,
          });
        }
      });
  }

  submitForm(): void {
    this.service
      .addAgent(this.localStorage.userToken, this.form.value)
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
