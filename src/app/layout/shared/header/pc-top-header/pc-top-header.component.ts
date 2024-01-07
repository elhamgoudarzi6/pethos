import { LocalStorageService } from './../../../../auth/local-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pc-top-header',
  templateUrl: './pc-top-header.component.html',
  styleUrls: ['./pc-top-header.component.scss'],
})
export class PcTopHeaderComponent implements OnInit {
  isLogged= false;
  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    if (this.localStorageService.getCurrentUser()) {
      this.isLogged = true;
    }
  }
  logOut(): void {
    this.localStorageService.removeCurrentUser();
  }
}
