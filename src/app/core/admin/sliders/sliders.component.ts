import { TokenService } from './../../../auth/token.service';
import { LocalStorageService } from './../../../auth/local-storage.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AdminService } from './../admin.service';
import { SliderEditComponent } from './slider-edit/slider-edit.component';
import { SliderAddComponent } from './slider-add/slider-add.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService],
})
export class SlidersComponent implements OnInit {
  sliders: any[] = [];

  constructor(
    private service: AdminService,
    private token: TokenService,
    private messageService: MessageService,
    public dialogService: DialogService,
    private localStorage: LocalStorageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getSliders();
  }

  getSliders(): any {
    this.service
      .getAllSliders(this.localStorage.userToken)
      .subscribe((response) => {
        if (response.success === true) {
          this.sliders = response.data;
        }
        else{
          this.token.checkTokenExamination(response.data, 'admin');
          this.messageService.add({
            severity: 'error',
            summary: ' دریافت اطلاعات ',
            detail: response.data,
          });
        }
      });
  }

  showAddSliderDialog(): void {
    const ref = this.dialogService.open(SliderAddComponent, {
      header: 'ثبت اسلایدر جدید',
      width: '70%',
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.getSliders();
      }
    });
  }

  showEditSliderDialog(id: string): void {
    let slider = this.sliders.filter((x) => x._id == id)[0];
    const ref = this.dialogService.open(SliderEditComponent, {
      data: {
        slider,
      },
      header: 'ویرایش اسلایدر',
      width: '70%',
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ویرایش اطلاعات ',
          detail: 'اطلاعات با موفقیت ویرایش شد.',
        });
        this.getSliders();
      }
    });
  }

  deleteSlider(id: any, image: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
        if (image) {
          const filename = image.replace(/^.*[\\\/]/, '');
          this.service.deleteFile({
            path: filename,
          });
        }

        this.service
          .deleteSlider(this.localStorage.userToken, id)
          .subscribe((response) => {
            if (response.success === true) {
              this.confirmationService.close();
              this.messageService.add({
                severity: 'success',
                summary: ' حذف اطلاعات ',
                detail: response.data,
              });
              this.getSliders();
            } else {
              this.messageService.add({
                severity: 'error',
                summary: ' حذف اطلاعات ',
                detail: response.data,
              });
            }
          });
      },
      reject: () => {
        // close
        this.confirmationService.close();
      },
    });
  }
}
