import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AdminService } from './../../admin.service';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agent-edit',
  templateUrl: './agent-edit.component.html',
  styleUrls: ['./agent-edit.component.scss'],
  providers: [MessageService],
})
export class AgentEditComponent implements OnInit {
  agent: any;
  form: FormGroup;
  propertyTypes: any[] = [];
  subPropertyTypes: any[] = [];
  selectedType: any;
  selectedSubType: any;
  agentLevel: any[] = [];
  selectedLevel: any;
  pethos: any[] = [];
  subPethos: any[] = [];
  subSubPethos: any[] = [];
  selectedPethos: any;
  selectedSubPethos: any;
  selectedSubSubPethos: any;
  min: any;
  max: any;

  mobileRegix = /^0?9[123]\d{8}$/;
  errorMessages = {
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
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.agent = this.config.data.agent;
    this.min = this.agent.AgentLevel[0].min;
    this.max = this.agent.AgentLevel[0].max;
    this.getPropertyTypes();
    this.getAgentLevel();
    this.getPethos();
    this.createForm();
  }

  getPethos(): any {
    this.service
      .getAllPethos(this.localStorage.userToken)
      .subscribe((response) => {
        if (response.success === true) {
          this.pethos = response.data;
          this.selectedPethos = this.pethos.filter(x => x._id === this.agent.pethosID)[0];
          this.subPethos = this.selectedPethos.SubPethos;
          this.selectedSubPethos = this.subPethos.filter(x => x._id === this.agent.subPethosID)[0];
          this.subSubPethos = this.selectedSubPethos.SubSubPethos;
          this.selectedSubSubPethos = this.subSubPethos.filter(x => x._id === this.agent.subSubPethosID)[0];
          this.form.controls.pethosID.setValue(this.selectedPethos._id);
          this.form.controls.subPethosID.setValue(this.selectedSubPethos._id);
          this.form.controls.subSubPethosID.setValue(this.selectedSubSubPethos._id);
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
          this.selectedLevel = this.agent.AgentLevel[0];
          this.form.controls.levelID.setValue(this.selectedLevel._id);
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
          this.selectedSubType = this.agent.SubPropertyType[0];
          this.selectedType = this.propertyTypes.find(
            (x) => x._id === this.selectedSubType.propertyTypeID);
          this.subPropertyTypes = this.selectedType.SubPropertyType;
          this.form.controls.propertyTypeID.setValue(this.selectedType._id);
          this.form.controls.subPropertyTypeID.setValue(this.selectedSubType._id);
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
  }
  onSubPethosChange(e: any) {
    this.form.controls.subpethosID.setValue(e.value._id);
  }
  onSubSubPethosChange(e: any) {
    this.form.controls.subSubpethosID.setValue(e.value._id);
  }

  onLevelChange(e: any) {
    this.form.controls.levelID.setValue(e.value._id);
    this.min = e.value.min;
    this.max = e.value.max;
  }

  onTypeChange(e: any) {
    this.form.controls.propertyTypeID.setValue(e.value._id);
    this.subPropertyTypes = e.value.SubPropertyType;
    this.form.controls.subPropertyTypeID.setValue(e.value.SubPropertyType[0]._id)
  }

  onSubTypeChange(e: any) {
    this.form.controls.subPropertyTypeID.setValue(e.value._id);
  }

  createForm() {
    this.form = new FormGroup({
      pethosID: new FormControl(this.selectedPethos),
      mobile: new FormControl(
        this.agent.mobile,
        Validators.compose([
          Validators.required,
          Validators.pattern(this.mobileRegix),
        ])
      ),
      info: new FormControl(this.agent.info),
      levelID: new FormControl(this.selectedLevel),
      propertyTypeID: new FormControl(
        this.selectedType,
        Validators.compose([Validators.required])
      ),
      subPropertyTypeID: new FormControl(
        this.selectedSubType,
        Validators.compose([Validators.required])
      ),
      fullName: new FormControl(
        this.agent.fullName,
        Validators.compose([Validators.required])
      ),
      image: new FormControl(this.agent.image),
    });
  }

  onFileUpload(event): void {
    const formData = new FormData();
    formData.append('file', event.files[0], event.files[0].name);
    this.service
      .uploadFile(formData)
      .subscribe((response) => {
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
      .updateAgent(this.localStorage.userToken, this.agent._id, this.form.value)
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
