import { LayoutService } from './../layout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss'],
})
export class NewsDetailComponent implements OnInit {
  id: any;
  news: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: LayoutService
  ) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.paramMap.subscribe((params) => (this.id = params.get('id')));
    this.getNews();
  }

  getNews() {
    this.service.getNews(this.id).subscribe((response) => {
      if (response.success === true) {
        this.news = response.data;
      }
    });
  }
}
