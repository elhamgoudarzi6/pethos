import { AdminService } from './admin.service';
import { LocalStorageService } from './../../auth/local-storage.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import * as moment from 'jalali-moment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  items: MenuItem[];
  fullName:any;
  image: any;
  adminData: any[] = [];

  public date = moment(Date.now()).locale('fa').format('YYYY/M/D');
  public time;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private localStorage: LocalStorageService,
    private router: Router,
    private service: AdminService
  ) {}

  ngOnInit(): void {
    setInterval(() => {
      this.time = moment(Date.now()).locale('fa').format('HH:mm:ss');
    }, 1000);
    if (
      !this.localStorage.getCurrentUser() ||
      this.localStorage.userType != 'admin'
    ) {
      this.router.navigateByUrl('/admin/login');
    } else {
      this.service.getToken(this.localStorage.userID).subscribe((result) => {
        if (result.success === false) {
          this.localStorage.removeCurrentUser();
          this.router.navigateByUrl('/auth');
        }
        this.createMenu();
      });
    }

    // this.service.getAdmin(this.localStorage.userToken,this.localStorage.userID).subscribe((result) => {
    //   if (result.success === true) {
    //     this.adminData=result.data;
    //     console.log(this.adminData['fullName'])
    //   }
    // });
    this.fullName=this.localStorage.userFullName;
    this.image=this.localStorage.userImage;
  }

  createMenu() {
    this.items = [
      {
        label: 'داشبورد',
        routerLink: '/admin',
      },
      {
        label: 'کاربران',
        routerLink: '/admin/users',
      },
      {
        label: 'مدیران',
        routerLink: '/admin/administrators',
      },
      {
        label: 'نمایندگان',
        routerLink: '/admin/agents',
      },
      {
        label: 'املاک',
        routerLink: '/admin/properties',
      },
      {
        label: 'دسته بندی املاک',
        routerLink: '/admin/property-types',
      },
      {
        label: 'تخفیف ها',
        routerLink: '/admin/discounts',
      },
      {
        label: 'پیام ها' ,
        routerLink: '/admin/tickets',
      },
      {
        label: 'درخواست های بازدید' ,
        routerLink: '/admin/requests',
      },
      {
        label: 'مدیریت سایت',
        items: [
          {
            label: 'اخبار',
            routerLink: '/admin/news',
          },
          { separator: true },
          {
            label: 'سوالات متداول',
            routerLink: '/admin/faqs',
          },
          { separator: true },
          {
            label: 'خبرنامه',
            routerLink: '/admin/subscriptions',
          },
          { separator: true },
          {
            label: 'تماس با ما',
            routerLink: '/admin/messages',
          },
        ],
      },
      {
        label: 'مدیریت اپ',
        items: [
          {
            label: 'اسلایدر',
            routerLink: '/admin/sliders',
          },
        ],
      },
    ];
  }
  logOut(): void {
    this.localStorage.removeCurrentUser();
    this.router.navigateByUrl('/');
  }
}
