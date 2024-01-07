import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LocalStorageService } from 'src/app/auth/local-storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  errorMessages = {
    userName: [
      { type: 'required', message: 'شماره نام کاربری را وارد کنید.' }    ],
    password: [{ type: 'required', message: 'رمز عبور را وارد کنید.' }],
  };

  constructor(
    private service: AdminService,
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (
      this.localStorage.getCurrentUser() &&
      this.localStorage.userType == 'admin'
    ) {
      this.router.navigateByUrl('/admin');
    }

    this.form = new FormGroup({
      userName: new FormControl(
        null,
        Validators.compose([
          Validators.required
        ])
      ),
      password: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
    });
  }

  login(): void {
    this.service.login(this.form.value).subscribe((result) => {
      if (result.success == true) {
        this.localStorage.removeCurrentUser();
        this.localStorage.saveCurrentUser(JSON.stringify(result.data));
        this.router.navigateByUrl('/admin');
      }
    });
  }
}
