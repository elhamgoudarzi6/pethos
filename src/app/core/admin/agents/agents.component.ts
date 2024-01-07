import { TokenService } from './../../../auth/token.service';
import { AgentDetailsComponent } from './agent-details/agent-details.component';
import { AgentEditComponent } from './agent-edit/agent-edit.component';
import { AgentAddComponent } from './agent-add/agent-add.component';
import { LocalStorageService } from './../../../auth/local-storage.service';
import { AdminService } from './../admin.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService]
})
export class AgentsComponent implements OnInit {
  agents: any[];
  constructor(
    private messageService: MessageService,
    private service: AdminService,
    private token: TokenService,
    private localStorage: LocalStorageService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getAgents();
  }

  getAgents(): any {
    this.service.getAllAgents(this.localStorage.userToken).subscribe((response) => {
      if (response.success === true) {
        this.agents = response.data;
      } else {
        this.token.checkTokenExamination(response.data, 'admin');
        this.messageService.add({
          severity: 'error',
          summary: ' دریافت اطلاعات ',
          detail: response.data,
        });
      }
    });
  }

  showAddAgentDialog(): void {
    const ref = this.dialogService.open(AgentAddComponent, {
      header: 'ثبت نماینده',
      width: '70%',
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت اطلاعات ',
          detail: 'اطلاعات با موفقیت ثبت شد.',
        });
        this.getAgents();
      }
    });
  }

  showEditAgentDialog(id: string): void {
    let agent = this.agents.filter((x) => x._id == id)[0];
    const ref = this.dialogService.open(AgentEditComponent, {
      data: {
        agent,
      },
      header: 'ویرایش نماینده',
      width: '70%',
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ویرایش اطلاعات ',
          detail: 'اطلاعات با موفقیت ویرایش شد.',
        });
        this.getAgents();
      }
    });
  }

  showDetailsAgentDialog(id: string): void {
    let agent = this.agents.filter((x) => x._id == id)[0];
    const ref = this.dialogService.open(AgentDetailsComponent, {
      data: {
        agent,
      },
      header: 'مشاهده اطلاعات نماینده',
      width: '70%',
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.getAgents();
      }
    });
  }

  deleteAgent(id: any, image: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
        if (image) {
          const filename = image.replace(/^.*[\\\/]/, '');
          this.service.deleteFile({path: filename});
        }

        this.service.deleteAgent(this.localStorage.userToken, id).subscribe((response) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({
              severity: 'success',
              summary: ' حذف اطلاعات ',
              detail: response.data,
            });
            this.getAgents();
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
}
