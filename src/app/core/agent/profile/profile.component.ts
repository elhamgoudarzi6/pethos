import { TokenService } from './../../../auth/token.service';
import { AuthService } from './../../../auth/auth.service';
import { Router } from '@angular/router';
import { AgentService } from './../agent.service';
import { LocalStorageService } from './../../../auth/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService],
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;
  mobileForm: FormGroup;
  usernameForm: FormGroup;
  passwordForm: FormGroup;
  agent: any;
  countPropertyForAgent: any;
  public display: boolean = false;
  public getCodeSMS: string = '';
  public otpCode: string = '';
  public invalidSMS: boolean = false;
  public timeLeft: number = 90;
  public interval: any;
  public resendSMS: boolean = false;
  public validationBtn: boolean = true;
  usernameErrorMessages = {
    userName: [{ type: 'required', message: 'نام کاربری را وارد کنید.' }],
  };
  passwordErrorMessages = {
    password: [{ type: 'required', message: 'رمز عبور را وارد کنید.' }],
  };
  mobileRegix = /^0?9[123]\d{8}$/;
  errorMessages = {
    mobile: [
      { type: 'required', message: 'شماره موبایل را وارد کنید.' },
      { type: 'minlength', message: 'شماره موبایل باید 11 رقم باشد.' },
      { type: 'maxlength', message: 'شماره موبایل باید 11 رقم باشد.' },
      { type: 'pattern', message: 'لطفا شماره موبایل معتبر وارد کنید.' },
    ],
  };
  agentRating: any;


  constructor(
    private localStorage: LocalStorageService,
    private messageService: MessageService,
    private router: Router,
    private service: AgentService,
    private authService: AuthService,
    private token: TokenService
  ) { }

  ngOnInit(): void {
    if (this.localStorage.getCurrentUser()) {
      this.getUserData();
    } else {
      this.localStorage.removeCurrentUser();
      this.router.navigate(['/auth']);
    }

    this.service
      .countPropertyForAgent(this.localStorage.userToken, this.localStorage.userJson._id)
      .subscribe((response) => {
        if (response.success === true) {
          this.countPropertyForAgent = response.data;
        }
      });

    this.service.getAgentRating(this.localStorage.userToken, this.localStorage.userID)
      .subscribe((response) => {
        if (response.success === true) {
          this.agentRating = response.data;
          console.log(this.agentRating)
        }
      });
  }

  async getUserData() {
    await this.service
      .getAgent(this.localStorage.userToken, this.localStorage.userJson._id)
      .subscribe((response) => {
        if (response.success === true) {
          this.agent = response.data;
          this.createUserForm();
          this.createMobileForm();
          this.createPasswordForm();
          this.createUserNameForm();
        }
      });
  }

  createPasswordForm() {
    this.passwordForm = new FormGroup({
      password: new FormControl(null),
    });
  }

  createUserNameForm() {
    this.usernameForm = new FormGroup({
      userName: new FormControl(this.agent.userName),
    });
  }

  createUserForm() {
    this.userForm = new FormGroup({
      birthDate: new FormControl(this.agent.birthDate),
      fullName: new FormControl(this.agent.fullName),
      image: new FormControl(this.agent.image),
      info: new FormControl(this.agent.info),
    });
  }

  createMobileForm() {
    this.mobileForm = new FormGroup({
      mobile: new FormControl(
        this.agent.mobile,
        Validators.compose([
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.pattern(this.mobileRegix),
        ])
      ),
    });
  }



  updateUser() {
    this.service
      .updateAgent(
        this.localStorage.userToken,
        this.localStorage.userJson._id,
        this.userForm.value
      )
      .subscribe((response) => {
        if (response.success === true) {
          this.messageService.add({
            severity: 'success',
            summary: 'ثبت اطلاعات',
            detail: response.data,
          });
        }
      });
  }

  changeUsername() {
    this.service
      .changePassword(
        this.localStorage.userToken,
        this.localStorage.userID,
        this.usernameForm.value
      )
      .subscribe((response) => {
        if (response.success === true) {
          this.messageService.add({
            severity: 'success',
            summary: 'ثبت اطلاعات',
            detail: response.data,
          });
        }
      });
  }
  changePassword() {
    this.service
      .changePassword(
        this.localStorage.userToken,
        this.localStorage.userID,
        this.passwordForm.value
      )
      .subscribe((response) => {
        if (response.success === true) {
          this.messageService.add({
            severity: 'success',
            summary: 'ثبت اطلاعات',
            detail: response.data,
          });
        }
      });
  }

  onFileUpload(event): void {
    const formData = new FormData();
    formData.append('file', event.files[0], event.files[0].name);
    this.service.uploadFile(formData).subscribe((response) => {
      if (response.success === true) {
        this.userForm.controls.image.setValue(response.imagePath);
        this.messageService.add({
          severity: 'success',
          summary: ' آپلود تصویر محصول ',
          detail: 'تصویر با موفقیت آپلود شد.',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' آپلود تصویر محصول ',
          detail: response.data,
        });
      }
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
        this.redirectToPanel();
      } else {
        this.invalidSMS = false;
        this.validationBtn = false;
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
    this.service
      .findMobile(this.localStorage.userToken, this.mobileForm.value)
      .subscribe((response) => {
        if (response.success != true) {
          this.display = true;
          this.authService.getTokenSms().subscribe((tokenRes) => {
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
                Mobile: this.mobileForm.controls.mobile.value,
                TemplateId: '53415',
              };
              this.authService.sendSms(data, token).subscribe((smsRes) => {
                if (smsRes.IsSuccessful === true) {
                  this.startTimer();
                }
              });
            }
          });
        } else {
          this.messageService.add({
            severity: 'info',
            summary: 'هشدار ',
            detail: 'امکان ثبت این شماره موبایل نمی باشد.',
          });
        }
      });
  }

  redirectToPanel() {
    this.service
      .findMobile(this.localStorage.userToken, this.mobileForm.value)
      .subscribe((duplicate) => {
        if (duplicate.success === true) {
          this.messageService.add({
            severity: 'error',
            summary: 'خطا ',
            detail: 'این شماره قبلا ثبت شده است.',
          });
        } else {
          this.service
            .changeMobileNumber(
              this.localStorage.userToken,
              this.localStorage.userJson._id,
              this.mobileForm.value
            )
            .subscribe((result) => {
              if (result.success === true) {
                this.localStorage.removeCurrentUser();
                this.router.navigateByUrl('/auth');
              } else {
                this.token.checkTokenExamination(result.data, 'user');
                this.messageService.add({
                  severity: 'info',
                  summary: 'خطا ',
                  detail: 'لطفا مجددا تلاش کنید.',
                });
              }
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
