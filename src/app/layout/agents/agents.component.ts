import { Router } from '@angular/router';
import { LayoutService } from './../layout.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LocalStorageService } from './../../auth/local-storage.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss'],
  providers: [MessageService]

})
export class AgentsComponent implements OnInit {
  agents: any[] = [];
  agentRating: any[] = [];
  constructor(private service: LayoutService,
    private router: Router,
    private messageService: MessageService,
    private localStorage: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.getAgents();
  }

  getAgents() {
    this.service.getAllAgents().subscribe((response) => {
      if (response.success === true) {
        this.agents = response.data;
        let count = this.agents.length;
        for (let i = 0; i <= count - 1; i++) {
          let id = this.agents[i]._id;
          this.service.getAgentRating(id).subscribe((response) => {
            if (response.success === true) {
              let rate = Math.round(response.data);
              this.agentRating.push({ id, rate });
            }
          });
        }
      }
    });
  }


  redirectToDetail(id: any): void {
    this.router.navigate(['/agent/' + id]);
  }
}
