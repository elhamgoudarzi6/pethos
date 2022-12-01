import { Router } from '@angular/router';
import { LocalStorageService } from './../../auth/local-storage.service';
import { UserService } from './../../core/user/user.service';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  providers: [MessageService],
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];
  page: number = 1;
  pageSize: number = 8;
  total: number = 0;
  isLogged = false;
  userType = '';
  constructor(
    private messageService: MessageService,
    private service: UserService,
    private localStorage: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.localStorage.getCurrentUser()) {
      this.isLogged = true;
      this.userType = this.localStorage.userType;
      if (this.userType === 'user') {
        this.getFavorites();
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: ' دریافت اطلاعات ',
        detail: 'لطفا ابتدا وارد سایت شوید.',
      });
      console.log( this.isLogged)
    }

  }

  getFavorites(): any {
    this.service
      .getAllFavorites(this.localStorage.userToken, this.localStorage.userID)
      .subscribe((response) => {
        if (response.success === true) {
          this.favorites = response.data;
          this.total = this.favorites.length;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' دریافت اطلاعات ',
            detail: response.data,
          });
        }
      });
  }

  deleteFavorite(userID: string, propertyID: string): any {
    this.service
      .deleteFavorite(this.localStorage.userToken, userID, propertyID)
      .subscribe((response) => {
        if (response.success === true) {
          this.messageService.add({
            severity: 'success',
            summary: ' حذف ',
            detail: 'ملک با موفقیت از لیست علاقمندی شما حذف شد.',
          });
          this.getFavorites();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' حذف ',
            detail: response.data,
          });
        }
      });
  }

  redirectToDetail(id: any): void {
    this.router.navigate(['/property/' + id]);
  }

}
