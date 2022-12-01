import { LayoutService } from './../../layout.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-agents',
  templateUrl: './home-agents.component.html',
  styleUrls: ['./home-agents.component.scss'],
})
export class HomeAgentsComponent implements OnInit {
  agents: any[] = [];
  agentRating: any[] = [];
  customOptions: OwlOptions = {
    autoplay: true,
    autoplaySpeed: 1000,
    autoplayTimeout: 5000,
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    nav: true,
    margin: 10,
    navText: [
      '<i class="fa fa-chevron-left fa-2x"></i>',
      '<i class="fa fa-chevron-right fa-2x"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
  };
  constructor(private service: LayoutService,private router: Router) {}
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
