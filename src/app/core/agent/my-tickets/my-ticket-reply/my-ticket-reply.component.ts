import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AgentService } from './../../agent.service';
import { LocalStorageService } from 'src/app/auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-ticket-reply',
  templateUrl: './my-ticket-reply.component.html',
  styleUrls: ['./my-ticket-reply.component.scss'],
  providers: [MessageService]
})
export class MyTicketReplyComponent implements OnInit {

  public form: FormGroup;
  errorMessages = {
    message: [{ type: 'required', message: 'پیام را وارد کنید.' }],
  };
  constructor(
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private service: AgentService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private formBuilder: FormBuilder,

  ) { }


  ngOnInit(): void {
    this.createform();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      message: new FormControl(null)
    });
  }

  submitForm(): void {
    let data = {
      detail: {
        message:this.form.controls.message.value,
        from: 'agent',
        to: 'user',
        date: new Date().toLocaleDateString('fa-IR'),
        time: new Date().toLocaleTimeString('fa-IR'),
      }
    }
    this.service
      .replyTicket(this.localStorage.userToken, this.config.data.ticketId, data)
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

