import { Router } from '@angular/router';
import { LayoutService } from '../../layout.service';
import { LocalStorageService } from 'src/app/auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-properties',
  templateUrl: './home-properties.component.html',
  styleUrls: ['./home-properties.component.scss'],
  providers: [MessageService]
})
export class HomePropertiesComponent implements OnInit {
  properties: any[] = [];
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
    navText: ['<i class="fa fa-chevron-left fa-2x"></i>', '<i class="fa fa-chevron-right fa-2x"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    }
  };

  form: FormGroup;
  constructor(
    private service: LayoutService,
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.service.getNewestProperty().subscribe((response) => {
      if (response.success === true) {
        this.properties = response.data;
      }
    });
  }

  addToFavorites(id: any) {
    console.log(id)
    if (this.localStorage.getCurrentUser()) {
      let data = {
        userID: this.localStorage.userID,
        propertyID: id,
      }
      console.log(data)
      this.service
        .addFavorite(this.localStorage.userToken, data)
        .subscribe((response) => {
          if (response.success === true) {
            this.messageService.add({
              severity: 'success',
              summary: ' ثبت اطلاعات ',
              detail: 'ملک مورد نظر به لیست علاقه مندی شما اضافه شد..',
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
        detail: 'لطفا ایتدا وارد سایت شوید.',
      });
    }
  }

  redirectToDetail(id: any): void {
    this.router.navigate(['/property/' + id]);
  }

}
