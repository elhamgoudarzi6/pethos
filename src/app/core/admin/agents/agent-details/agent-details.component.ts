import { AdminService } from './../../admin.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agent-details',
  templateUrl: './agent-details.component.html',
  styleUrls: ['./agent-details.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class AgentDetailsComponent implements OnInit {
  agent: any;
  propertyTypes: any[] = [];
  subPropertyTypes: any[] = [];
  selectedType: any;
  selectedSubType: any;
  selectedLevel: any;
  min:any;
  max:any;
  agentRating:any;
  agentLevel: any[] = [];
  pethos: any[] = [];
  subPethos: any[] = [];
  subSubPethos: any[] = [];
  selectedPethos: any;
  selectedSubPethos: any;
  selectedSubSubPethos: any;
  constructor(
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private confirmationService: ConfirmationService,
    private service: AdminService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.agent = this.config.data.agent;
    this.min=this.agent.AgentLevel[0].min;
    this.max=this.agent.AgentLevel[0].max;
    this.getPropertyTypes();
    this.getAgentLevel();
    this.getPethos();
    this.getAgentRating();

  }

  getAgentRating(): any {
    this.service
      .getAgentRating(this.localStorage.userToken,this.config.data.agent._id)
      .subscribe((response) => {
        if (response.success === true) {
          this.agentRating = response.data;
          console.log(this.agentRating)
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' دریافت اطلاعات ',
            detail: response.data,
          });
        }
      });
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
          console.log(this.selectedLevel)
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
            (x) => x._id === this.selectedSubType.propertyTypeID
          );
          this.subPropertyTypes = this.selectedType.SubPropertyType;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' دریافت اطلاعات ',
            detail: response.data,
          });
        }
      });

  }

  deleteAgent(): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
        if (this.agent.image !== '' || this.agent.image !== null) {
          const filename = this.agent.image.replace(/^.*[\\\/]/, '');
          this.service.deleteFile( {
            path: filename,
          });
        }

        this.service
          .deleteAgent(this.localStorage.userToken, this.agent._id)
          .subscribe((response) => {
            if (response.success === true) {
              this.confirmationService.close();
              this.messageService.add({
                severity: 'success',
                summary: ' حذف اطلاعات ',
                detail: response.data,
              });

              this.ref.close(true);
            } else {
              this.messageService.add({
                severity: 'error',
                summary: ' حذف اطلاعات ',
                detail: response.data,
              });
            }
          });
      },
      reject: () => {
        // close
        this.confirmationService.close();
      },
    });
  }

  cancel() {
    this.ref.close();
  }
}
