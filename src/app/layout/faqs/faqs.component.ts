import { LayoutService } from './../layout.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {
faqs: any[] = [];
  constructor(private service: LayoutService) { }

  ngOnInit(): void {
    this.getFaqs();
  }

  getFaqs() {
    this.service.getAllFaqs().subscribe((response) => {
      if (response.success === true) {
        this.faqs = response.data;
      }
    });
  }
}
