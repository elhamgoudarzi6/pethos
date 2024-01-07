import { Router } from '@angular/router';
import { LocalStorageService } from './../../auth/local-storage.service';
import { AuthService } from './../../auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [MessageService],
})
export class AuthComponent implements OnInit {
  @ViewChild('ngOtpInput', { static: true }) ngOtpInputRef: any;
  username: any;
  userData: any;
  form: FormGroup;
  public display: boolean = false;
  public getCodeSMS: string = '';
  public otpCode: string = '';
  public invalidSMS: boolean = false;
  public timeLeft: number = 90;
  public interval: any;
  public resendSMS: boolean = false;
  public validationBtn: boolean = true;

  mobileRegix = /^0?9[123]\d{8}$/;
  errorMessages = {
    mobile: [
      { type: 'required', message: 'شماره موبایل را وارد کنید.' },
      { type: 'minlength', message: 'شماره موبایل باید 11 رقم باشد.' },
      { type: 'maxlength', message: 'شماره موبایل باید 11 رقم باشد.' },
      { type: 'pattern', message: 'لطفا شماره موبایل معتبر وارد کنید.' },
    ],
  };

  constructor(
    private service: AuthService,
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      mobile: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.pattern(this.mobileRegix),
        ])
      ),
    });
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.invalidSMS = false;
        this.resendSMS = true;
        this.timeLeft = 0;
      }
    }, 1000);
  }

  onOtpChange(otp) {
    this.otpCode = otp;
    if (this.otpCode.length === 5) {
      if (this.otpCode !== this.getCodeSMS) {
        this.invalidSMS = true;
        this.validationBtn = true;
      } else {
        this.invalidSMS = false;
        this.validationBtn = false;
        this.redirectToPanel();
      }
    }
  }

  randomNumber() {
    var text = '';
    var possible = '123456789';
    for (var i = 0; i < 5; i++) {
      var sup = Math.floor(Math.random() * possible.length);
      text += i > 0 && sup == i ? '0' : possible.charAt(sup);
    }
    return text;
  }

  sendSMS() {
    this.display = true;
    this.service.getTokenSms().subscribe((tokenRes) => {
      if (tokenRes.IsSuccessful === true) {
        this.getCodeSMS = this.randomNumber();
        let token = tokenRes.TokenKey;
        let data = {
          ParameterArray: [
            {
              Parameter: 'VerificationCode',
              ParameterValue: this.getCodeSMS,
            },
          ],
          Mobile: this.form.controls.mobile.value,
          TemplateId: '53415',
        };
        this.service.sendSms(data, token).subscribe((smsRes) => {
          if (smsRes.IsSuccessful === true) {
            this.invalidSMS = false;
            this.timeLeft = 90;
            this.resendSMS = false;
            this.validationBtn = true;
            clearInterval(this.interval);
            this.otpCode = '';
            this.startTimer();
          }
        });
      }
    });
  }

  redirectToPanel() {
    this.service.authUser(this.form.value).subscribe((result) => {
      if (result.success === true) {
        this.userData = result.data;
        this.localStorage.removeCurrentUser();
        this.localStorage.saveCurrentUser(JSON.stringify(this.userData));
        this.router.navigate(['/user']);
      } else {
        this.messageService.add({
          severity: 'info',
          summary: 'خطا ',
          detail: 'لطفا مجددا تلاش کنید.',
        });
      }
    });
  }

  onCloseDialog() {
    this.invalidSMS = false;
    this.timeLeft = 90;
    this.resendSMS = false;
    this.validationBtn = true;
    this.display = false;
    this.getCodeSMS = '';
    this.otpCode = '';
    clearInterval(this.interval);
  }
}
