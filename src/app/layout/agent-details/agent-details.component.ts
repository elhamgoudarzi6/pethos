import { LayoutService } from './../layout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './../../auth/local-storage.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-agent-details',
  templateUrl: './agent-details.component.html',
  styleUrls: ['./agent-details.component.scss'],
  providers: [MessageService]
})
export class AgentDetailsComponent implements OnInit {
  fullname: any;
  email: any;
  mobile: any;
  message: any;
  id: any;
  agent: any;
  agentRating: any;
  rate: number = 0;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: LayoutService,
    private localStorage: LocalStorageService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.paramMap.subscribe((params) => (this.id = params.get('id')));
    this.getAgent();
    this.getAgentRating();
  }

  getAgent() {
    this.service.getAgent(this.id).subscribe((response) => {
      if (response.success === true) {
        this.agent = response.data;
      }
    });
  }

  getAgentRating() {
    this.service.getAgentRating(this.id).subscribe((response) => {
      if (response.success === true) {
        let x = response.data;
        this.agentRating=Math.round(x);
        //this.agentRating=x.toFixed(2)
      }
    });
  }
  onRateChange(e: any) {
    if (this.localStorage.getCurrentUser()) {
      this.rate = e.value;
      let data = {
        userID: this.localStorage.userID,
        agentID: this.id,
        rating: this.rate,
      }
      this.service.registerAgentRating(this.localStorage.userToken, data)
        .subscribe((response) => {
          if (response.success === true) {
            this.messageService.add({
              severity: 'success',
              summary: ' ثبت اطلاعات ',
              detail:response.data,
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: ' ثبت اطلاعات ',
              detail: response.data,
            });
          }
        });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: ' ورود به سایت ',
        detail: 'لطفا ابتدا وارد سایت شوید.',
      });
    }
  }

}
