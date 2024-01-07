import { TokenService } from './../../auth/token.service';
import { UserService } from './user.service';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { LocalStorageService } from './../../auth/local-storage.service';
import { shareReplay, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import * as moment from 'jalali-moment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  items: MenuItem[];
  fullName: any;
  image: any;
  ticketsCount: number = 0;
  public date = moment(Date.now()).locale('fa').format('YYYY/M/D');
  public time;
  constructor(
    private breakpointObserver: BreakpointObserver,
    public localStorage: LocalStorageService,
    private router: Router,
    private service: UserService,
    private token: TokenService
  ) { }

  ngOnInit(): void {
    setInterval(() => {
      this.time = moment(Date.now()).locale('fa').format('HH:mm:ss');
    }, 1000);
    if (
      !this.localStorage.getCurrentUser() ||
      this.localStorage.userType != 'user'
    ) {
      this.router.navigateByUrl('/auth');
    } else {
      this.service.getToken(this.localStorage.userID).subscribe((result) => {
        if (result.success === false) {
          this.localStorage.removeCurrentUser();
          this.router.navigateByUrl('/auth');
        }
      });
    }

    this.service
      .getCountOfAllTickets(
        this.localStorage.userToken,
        this.localStorage.userID
      )
      .subscribe((result) => {
        if (result.success === true) {
          this.ticketsCount = result.data;
        }
        else {
          this.token.checkTokenExamination(result.data, 'user');
        }
      });
      
    this.createMenu();
    this.fullName = this.localStorage.userFullName;
    this.image = this.localStorage.userImage;
  }

  createMenu() {
    this.items = [
      {
        label: 'داشبورد',
        routerLink: '/user',
      },
      {
        label: 'املاک من',
        routerLink: '/user/properties',
      },
      {
        label: 'درخواست های بازدید',
        routerLink: '/user/visit-requests',
      },
      {
        label: 'تیکت ها',
        routerLink: '/user/tickets',
      },
      {
        label: 'پروفایل',
        routerLink: '/user/profile',
      },
    ];
  }

  logOut(): void {
  	console.log(this.localStorage);

    this.localStorage.removeCurrentUser();
    this.router.navigateByUrl('/');
	console.log(this.localStorage);
  }
}
