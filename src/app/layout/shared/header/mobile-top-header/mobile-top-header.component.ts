import { LocalStorageService } from './../../../../auth/local-storage.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-mobile-top-header',
  templateUrl: './mobile-top-header.component.html',
  styleUrls: ['./mobile-top-header.component.scss'],
})
export class MobileTopHeaderComponent implements OnInit {
  items: MenuItem[] = [];
  isLogged = false;
  public displayMobileMenu: boolean = false;
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}
  logOut(): void {
    this.localStorageService.removeCurrentUser();
  }
  ngOnInit(): void {
    if (this.localStorageService.getCurrentUser()) {
      this.isLogged = true;
    }
 
    this.items = [
      {
        label: 'صفحه اصلی',
        icon: 'pi pi-pw pi-home',
        command: (event) => this.router.navigate(['/']),
      },
      {
        label: 'املاک',
        icon: 'pi pi-fw pi-list',
        command: (event) => this.router.navigate(['/properties']),
      },
      {
        label: 'مشاوران',
        icon: 'pi pi-fw pi-users',
        command: (event) => this.router.navigate(['/agents']),
      },
      {
        label: 'اخبار',
        icon: 'pi pi-fw pi-tags',
        command: (event) => this.router.navigate(['/news']),
      },
      {
        label: 'سوالات متداول',
        icon: 'pi pi-fw pi-question-circle',
        command: (event) => this.router.navigate(['/faqs']),
      },
      {
        label: 'شرایط و ضوابط',
        icon: 'pi pi-exclamation-triangle',
        command: (event) => this.router.navigate(['/terms']),
      },
      {
        label: 'درباره ما',
        icon: 'pi pi-fw pi-info-circle',
        command: (event) => this.router.navigate(['/about']),
      },
      {
        label: 'تماس با ما',
        icon: 'pi pi-fw pi-phone',
        command: (event) => this.router.navigate(['/contact']),
      },
    ];

    var mobile = window.document.getElementById('mobile-fixed')!;
    var mobileSticky = 0;
    if (mobile !== null) {
      mobileSticky = mobile.offsetTop;
    }

    window.addEventListener('scroll', scroll, true);

    function scroll() {
      if (mobile !== undefined) {
        if (window.pageYOffset > mobileSticky) {
          mobile.classList.add('sticky');
        } else {
          mobile.classList.remove('sticky');
        }
      }
    }
  }
}
