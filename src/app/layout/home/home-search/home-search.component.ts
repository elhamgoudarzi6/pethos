import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { LayoutService } from './../../layout.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-search',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.scss'],
  providers: [MessageService],
})
export class HomeSearchComponent implements OnInit {
  properties: any[] = [];
  propertyTypes: any[] = [];
  propertySubTypes: any[] = [];
  transactionTypes: any[] = [];
  selectedTransactionType: any;
  selectedPropertyType: any;
  selectedSubPropertyType: any;
  pethos: any[] = [];
  agentLevel: any[] = [];
  subPropertyTypes: any[] = [];
  priceFrom: any;
  priceTo: any;
  form: FormGroup;
  constructor(
    private service: LayoutService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPropertyTypes();
    this.getTransactionTypes();
    this.createform();

  }

  createform(): void {
    this.form = new FormGroup({
      transactionTypeID: new FormControl(null, Validators.compose([Validators.required])),
      propertyTypeID: new FormControl(null, Validators.compose([Validators.required])),
      subPropertyTypeID: new FormControl(null, Validators.compose([Validators.required])),
    });
  }
  goProperty(transactionTypeID: any, propertyTypeID: any, subPropertyTypeID: any): any {
    if (transactionTypeID === undefined || propertyTypeID === undefined || subPropertyTypeID === undefined) {
      let message;
      if (transactionTypeID === undefined) { message = "لطفا نوع معامله را انتخاب کنید"; }
      if (propertyTypeID === undefined) { message = "لطفا نوع کاربری ملک را انتخاب کنید"; }
      if (subPropertyTypeID === undefined) { message = "لطفا نوع ملک را انتخاب کنید"; }
      this.messageService.add({
        severity: 'error',
        summary: 'خطا',
        detail: message,
      });
    } else {
      this.router.navigateByUrl(
        '/properties/' + transactionTypeID + '/' + propertyTypeID + '/' + subPropertyTypeID
      );
    }

  }

  getPropertyTypes(): any {
    this.service.getAllPropertyTypes().subscribe((response) => {
      if (response.success === true) {
        this.propertyTypes = response.data;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' دریافت اطلاعات ',
          detail: response.data,
        });
      }
    });
  }

  onTypeChange(e: any) {
    this.selectedPropertyType = e.value._id;
    this.subPropertyTypes = e.value.SubPropertyType;
  }

  onSubTypeChange(e: any) {
    this.selectedSubPropertyType = e.value._id;
  }
  onTransactionTypeChange(e: any) {
    this.selectedTransactionType = e.value._id;
  }

  getTransactionTypes(): any {
    this.service.getAllTransactionTypes().subscribe((response) => {
      if (response.success === true) {
        this.transactionTypes = response.data;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' دریافت اطلاعات ',
          detail: response.data,
        });
      }
    });
  }

}