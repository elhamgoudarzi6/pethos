import { TokenService } from './../../../auth/token.service';
import { PropertyTypeEditComponent } from './property-type-edit/property-type-edit.component';
import { SubPropertyTypeAddComponent } from './sub-property-type-add/sub-property-type-add.component';
import { PropertyTypeAddComponent } from './property-type-add/property-type-add.component';
import { DialogService } from 'primeng/dynamicdialog';
import { AdminService } from './../admin.service';
import { LocalStorageService } from './../../../auth/local-storage.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { SubPropertyTypeEditComponent } from './sub-property-type-edit/sub-property-type-edit.component';

@Component({
  selector: 'app-property-types',
  templateUrl: './property-types.component.html',
  styleUrls: ['./property-types.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService],
})
export class PropertyTypesComponent implements OnInit {
  types: any[];
  constructor(
    private messageService: MessageService,
    private service: AdminService,
    private token: TokenService,
    private localStorage: LocalStorageService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getPropertyTypes();
  }

  getPropertyTypes(): any {
    this.service
      .getAllPropertyTypes(this.localStorage.userToken)
      .subscribe((response) => {
        if (response.success === true) {
          this.types = response.data;
        } else {
          this.token.checkTokenExamination(response.data, 'admin');
          this.messageService.add({
            severity: 'error',
            summary: ' دریافت اطلاعات ',
            detail: response.data,
          });
        }
      });
  }

  showEditPropertyTypeDialog(id: string): void {
    let type = this.types.filter((x) => x._id == id)[0];

    const ref = this.dialogService.open(PropertyTypeEditComponent, {
      data: {
        type,
      },
      header: 'ویرایش نوع ملک',
      width: '70%',
    });

    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ویرایش اطلاعات ',
          detail: 'اطلاعات با موفقیت ویرایش شد.',
        });
        this.getPropertyTypes();
      }
    });
  }

  showAddPropertyTypeDialog(): void {
    const ref = this.dialogService.open(PropertyTypeAddComponent, {
      header: 'ثبت نوع ملک',
      width: '70%',
    });

    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت اطلاعات ',
          detail: 'اطلاعات با موفقیت ثبت شد.',
        });
        this.getPropertyTypes();
      }
    });
  }

  deletePropertyType(id: any, image: any): void {
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
          .deletePropertyType(this.localStorage.userToken, id)
          .subscribe((response) => {
            if (response.success === true) {
              this.confirmationService.close();
              this.messageService.add({
                severity: 'success',
                summary: ' حذف اطلاعات ',
                detail: response.data,
              });
              this.getPropertyTypes();
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

  showEditSubPropertyTypeDialog(catId: string, id: string): void {

    let subTypes = this.types.filter((x) => x._id == catId)[0].SubPropertyType;
    let type = subTypes.filter((x) => x._id == id)[0];

    const ref = this.dialogService.open(SubPropertyTypeEditComponent, {
      data: {
        type,
      },
      header: 'ویرایش نوع ملک',
      width: '70%',
    });

    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ویرایش اطلاعات ',
          detail: 'اطلاعات با موفقیت ویرایش شد.',
        });
        this.getPropertyTypes();
      }
    });
  }

  showAddSubPropertyTypeDialog(typeId: string): void {
    const ref = this.dialogService.open(SubPropertyTypeAddComponent, {
      data: {
        typeId,
      },
      header: 'ثبت نوع ملک',
      width: '70%',
    });

    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت اطلاعات ',
          detail: 'اطلاعات با موفقیت ثبت شد.',
        });
        this.getPropertyTypes();
      }
    });
  }

  deleteSubPropertyType(id: any, image: any): void {
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
          .deleteSubPropertyType(this.localStorage.userToken, id)
          .subscribe((response) => {
            if (response.success === true) {
              this.confirmationService.close();
              this.messageService.add({
                severity: 'success',
                summary: ' حذف اطلاعات ',
                detail: response.data,
              });
              this.getPropertyTypes();
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
