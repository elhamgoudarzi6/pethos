import { AgentService } from './agent.service';
import { LocalStorageService } from './../../auth/local-storage.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import * as moment from 'jalali-moment';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss'],
})
export class AgentComponent implements OnInit {
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
    private service: AgentService
  ) {}

  ngOnInit(): void {
    setInterval(() => {
      this.time = moment(Date.now()).locale('fa').format('HH:mm:ss');
    }, 1000);
    if (
      !this.localStorage.getCurrentUser() ||
      this.localStorage.userType != 'agent'
    ) {
      this.router.navigateByUrl('/agent/login');
    } else {
      this.service.getToken(this.localStorage.userID).subscribe((result) => {
        if (result.success === false) {
          this.localStorage.removeCurrentUser();
          this.router.navigateByUrl('/auth');
        }
        this.createMenu();
      });
    }
    this.fullName=this.localStorage.userFullName;
    this.image=this.localStorage.userImage;
  }
  getToken(userID: any) {
    throw new Error('Method not implemented.');
  }

  createMenu() {
    this.items = [
      {
        label: 'داشبورد',
        routerLink: '/agent',
      },
      {
        label: 'املاک من',
        routerLink: '/agent/my-properties',
      },
      {
        label: 'تیکت های من' ,
        routerLink: '/agent/my-tickets',
      },
      {
        label: 'درخواست های بازدید من' ,
        routerLink: '/agent/my-requests',
      },
      {
        label: 'پروفایل' ,
        routerLink: '/agent/profile',
      },
    ];
  }
  logOut(): void {
    this.localStorage.removeCurrentUser();
    this.router.navigateByUrl('/');
  }
}
