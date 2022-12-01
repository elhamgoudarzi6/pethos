import { LayoutService } from './../../layout.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-news',
  templateUrl: './home-news.component.html',
  styleUrls: ['./home-news.component.scss'],
})
export class HomeNewsComponent implements OnInit {
  news: any[] = [];
  latestNews: any[] = [];
  customOptions: OwlOptions = {
    autoplay: false,
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
    navText: ['<i class="fa fa-chevron-left fa-2x"></i>', '<i class="fa fa-chevron-right fa-2x"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    }
  };

  constructor(private service: LayoutService) {
  }

  ngOnInit(): void {
    this.getLatestNews();
    this.service.getLatestNews().subscribe((response) => {
      if (response['success'] === true) {
        this.latestNews = response['data'];
      }
    });
  }

  getLatestNews() {
    this.service.getLatestNews().subscribe((response) => {
      if (response.success === true) {
        this.news = response.data;
      }
    });
  }
}
