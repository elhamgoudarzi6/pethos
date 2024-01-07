import { Router } from '@angular/router';
import { LayoutService } from './../layout.service';
import { MessageService } from 'primeng/api';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  providers: [MessageService],
})
export class NewsComponent implements OnInit {
  latestNews: any[] = [];
  news: any[] = [];
  newList: any[] = [];
  tags: any[] = [];
  selectedTags: any[] = [];
  page: number = 1;
  pageSize: number = 9;
  total: number = 0;
  search: any;
  constructor(
    private service: LayoutService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.getAllNews().subscribe((response) => {
      if (response.success === true) {
        this.news = response.data;
        this.total = this.news.length;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' دریافت اطلاعات ',
          detail: response.data,
        });
      }
    });

    this.service.getLatestNews().subscribe((response) => {
      if (response['success'] === true) {
        this.latestNews = response['data'];
      }
    });
    
    this.service.getAllTagNews().subscribe((response) => {
      if (response.success === true) {
        response.data.forEach((element) => {
          if (element.tags.length > 0) {
            element.tags.forEach((item) => {
              this.tags.push(item);
            });
          }
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' دریافت اطلاعات ',
          detail: response.data,
        });
      }
    });
  }

  setTags(tag: string) {
    if (this.selectedTags.length > 0) {
      let index = -1;
      index = this.selectedTags.findIndex((x) => x === tag);
      if (index !== -1) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(tag);
      }
    } else {
      this.selectedTags.push(tag);
    }

    this.getNewsByTag();
  }

  getNewsByTag() {
    let tags = {
      tags: [this.selectedTags],
    };
    this.service.getAllNewsByTags(tags).subscribe((response) => {
      console.log(tags);

      if (response.success === true) {
        this.news = response.data;
        this.total = this.news.length;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' دریافت اطلاعات ',
          detail: response.data,
        });
      }
    });
  }

  redirectToDetail(id: any): void {
    this.router.navigate(['/new/' + id]);
  }

  searchNews(): void {
    this.news.forEach((element) => {
      if (element.title.contains(this.search)) {
        this.newList.push(element);
      }
    });

    if (this.newList.length > 0) {
      this.news = this.newList;
    }
  }

  clearSearch(): void {
    this.newList = [];
    this.service.getAllNews().subscribe((response) => {
      if (response.success === true) {
        this.news = response.data;
        this.total = this.news.length;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' دریافت اطلاعات ',
          detail: response.data,
        });
      }
    });
  }
}
