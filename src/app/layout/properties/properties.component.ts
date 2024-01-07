import { FormGroup, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { LocalStorageService } from 'src/app/auth/local-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LayoutService } from './../layout.service';
import { MenuItem, MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss'],
  providers: [MessageService],
})
export class PropertiesComponent implements OnInit {
  public items: MenuItem[];
  public home: MenuItem;
  sortID = 1;
  public displayMobileFilter: boolean = false;
  public Items: any[] = [];
  properties: any[] = [];
  page: number = 1;
  pageSize: number = 9;
  total: number = 0;
  transactionTypes: any[] = [];
  selectedtransactionType: any = '0';
  propertyTypes: any[] = [];
  selectedPropertyType: any = '0';
  subPropertyTypes: any[] = [];
  selectedSubPropertyType: any = '0';
  features: any[] = [];
  selectedFeatures: any[] = [];
  conditions: any[] = [];
  baths: any[] = [];
  rooms: any[] = [];
  selectedbaths: any[] = [];
  selectedrooms: any[] = [];
  selectedConditions: any[] = [];
  exchanges: any[] = [];
  selectedExchanges: any[] = [];
  hasDiscount: any;
  priceFrom: number;
  priceTo: number;
  form: FormGroup;
  currentTransactionType: any;
  currentPropertyType: any;
  currentSubPropertyType: any;
  areaTo: any;
  areaFrom: any;
  keywords: string[] = [];
  constructor(
    private service: LayoutService,
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.baths = [
      { title: 'یک', value: 1 },
      { title: 'دو', value: 2 },
      { title: 'سه', value: 3 },
      { title: 'چهار', value: 3 },
    ];
    this.rooms = [
      { title: 'یک', value: 1 },
      { title: 'دو', value: 2 },
      { title: 'سه', value: 3 },
      { title: 'چهار', value: 3 },
    ];
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.paramMap.subscribe((params) => {
      this.selectedtransactionType = params.get('transaction');
      this.selectedPropertyType = params.get('type');
      this.selectedSubPropertyType = params.get('subType');
    });

    this.getPropertyTypes();
    this.getExchanges();
    this.getConditions();
    this.getFeatures();
    this.getTransactionTypes();
    let data;
    if (this.selectedtransactionType === '0' && this.selectedPropertyType === '0'
      && this.selectedSubPropertyType === '0') {
      data = {
        updatedAt: -1,
      };
    } else if (this.selectedtransactionType === '0' && this.selectedPropertyType !== '0' && this.selectedSubPropertyType === '0') {
      data = {
        propertyTypeID: this.selectedPropertyType,
        updatedAt: -1,
      };
    } else if (this.selectedtransactionType === '0' && this.selectedPropertyType !== '0' && this.selectedSubPropertyType !== '0') {
      data = {
        propertyTypeID: this.selectedPropertyType,
        subPropertyTypeID: this.selectedSubPropertyType,
        updatedAt: -1,
      };
    } else if (this.selectedtransactionType !== '0' && this.selectedPropertyType !== '0' && this.selectedSubPropertyType !== '0') {
      data = {
        propertyTypeID: this.selectedPropertyType,
        subPropertyTypeID: this.selectedSubPropertyType,
        transactionTypeID: this.selectedtransactionType,
        updatedAt: -1,
      };
    }
    this.service.advanceSearchProperty(data).subscribe((response) => {
      if (response.success === true) {
        this.properties = response.data;
        this.total = response.data.length;
      }
    });
  }

  searchProperty(): any {
    var keywords = this.keywords,
      regex = keywords.join("|");
    let data;
    data = {
      transactionTypeID: this.selectedtransactionType,
      propertyTypeID: this.selectedPropertyType,
      subPropertyTypeID: this.selectedSubPropertyType,
      keywords: regex,
      priceMin: this.priceFrom,
      priceMax: this.priceTo,
      areaMin: this.areaFrom,
      areaMax: this.areaTo,
      bath: this.selectedbaths.length > 0 ? this.selectedbaths.map(function (x) { return (x.value) }) : [1, 2, 3, 4, 5],
      bedroom: this.selectedrooms.length > 0 ? this.selectedrooms.map(function (x) { return (x.value) }) : [1, 2, 3, 4, 5],
      condition: this.selectedConditions.length > 0 ? this.selectedConditions.map(function (x) { return (x.title) }) : this.conditions.map(function (x) { return (x.title) }),
      exchange: this.selectedExchanges.length > 0 ? this.selectedExchanges.map(function (x) { return (x.title) }) : this.exchanges.map(function (x) { return (x.title) }),
      features: this.selectedFeatures.length > 0 ? this.selectedFeatures.map(function (x) { return (x.title) }) : this.features.map(function (x) { return (x.title) }),
    }
    this.service.advanceSearchProperty(data).subscribe((response) => {
      if (response.success === true) {
        this.properties = response.data;
        this.total = response.data.length;
      }
    });
    if(this.displayMobileFilter===true){this.displayMobileFilter=false}
  }

  onChangeSortID(e: any) {
    this.sortID = e;
    let data;
    switch (this.sortID) {
      case 1:
        data = {
          propertyTypeID: this.selectedPropertyType,
          subPropertyTypeID: this.selectedSubPropertyType,
          transactionTypeID: this.selectedtransactionType,
          updatedAt: 1,
          priceMin: this.priceFrom,
          priceMax: this.priceTo,
          areaMin: this.areaFrom,
          areaMax: this.areaTo,
          bath: this.selectedbaths.length > 0 ? this.selectedbaths.map(function (x) { return (x.value) }) : [1, 2, 3, 4, 5],
          bedroom: this.selectedrooms.length > 0 ? this.selectedrooms.map(function (x) { return (x.value) }) : [1, 2, 3, 4, 5],
          condition: this.selectedConditions.length > 0 ? this.selectedConditions.map(function (x) { return (x.title) }) : this.conditions.map(function (x) { return (x.title) }),
          exchange: this.selectedExchanges.length > 0 ? this.selectedExchanges.map(function (x) { return (x.title) }) : this.exchanges.map(function (x) { return (x.title) }),
          features: this.selectedFeatures.length > 0 ? this.selectedFeatures.map(function (x) { return (x.title) }) : this.features.map(function (x) { return (x.title) }),
        };
        break;
      case 2:
        data = {
          propertyTypeID: this.selectedPropertyType,
          subPropertyTypeID: this.selectedSubPropertyType,
          transactionTypeID: this.selectedtransactionType,
          price: 1,
          priceMin: this.priceFrom,
          priceMax: this.priceTo,
          areaMin: this.areaFrom,
          areaMax: this.areaTo,
          bath: this.selectedbaths.length > 0 ? this.selectedbaths.map(function (x) { return (x.value) }) : [1, 2, 3, 4, 5],
          bedroom: this.selectedrooms.length > 0 ? this.selectedrooms.map(function (x) { return (x.value) }) : [1, 2, 3, 4, 5],
          condition: this.selectedConditions.length > 0 ? this.selectedConditions.map(function (x) { return (x.title) }) : this.conditions.map(function (x) { return (x.title) }),
          exchange: this.selectedExchanges.length > 0 ? this.selectedExchanges.map(function (x) { return (x.title) }) : this.exchanges.map(function (x) { return (x.title) }),
          features: this.selectedFeatures.length > 0 ? this.selectedFeatures.map(function (x) { return (x.title) }) : this.features.map(function (x) { return (x.title) }),
        };
        break;
      case 3:
        data = {
          propertyTypeID: this.selectedPropertyType,
          subPropertyTypeID: this.selectedSubPropertyType,
          transactionTypeID: this.selectedtransactionType,
          price: -1,
          priceMin: this.priceFrom,
          priceMax: this.priceTo,
          areaMin: this.areaFrom,
          areaMax: this.areaTo,
          bath: this.selectedbaths.length > 0 ? this.selectedbaths.map(function (x) { return (x.value) }) : [1, 2, 3, 4, 5],
          bedroom: this.selectedrooms.length > 0 ? this.selectedrooms.map(function (x) { return (x.value) }) : [1, 2, 3, 4, 5],
          condition: this.selectedConditions.length > 0 ? this.selectedConditions.map(function (x) { return (x.title) }) : this.conditions.map(function (x) { return (x.title) }),
          exchange: this.selectedExchanges.length > 0 ? this.selectedExchanges.map(function (x) { return (x.title) }) : this.exchanges.map(function (x) { return (x.title) }),
          features: this.selectedFeatures.length > 0 ? this.selectedFeatures.map(function (x) { return (x.title) }) : this.features.map(function (x) { return (x.title) }),
        };
        break;
    }
    this.service.advanceSearchProperty(data).subscribe((response) => {
      if (response.success === true) {
        this.properties = response.data;
        this.total = response.data.length;
        this.Items = Array(this.total)
          .fill(0)
          .map((x, i) => ({ id: i }));
        // this.pageOfItems = undefined;
      }
    });
  }

  onRemoveKey(e: any) {
    this.keywords.pop();
  }
  onAddKey(e: any) {
    this.keywords.push(e.value);
  }
  onTypeChange(e: any) {
    this.selectedPropertyType = e.value._id;
    this.subPropertyTypes = e.value.SubPropertyType;
  }
  onSubTypeChange(e: any) {
    this.selectedSubPropertyType = e.value._id;
  }
  onInputpriceFrom(e: any) {
    this.priceFrom = e.value
  }
  onInputpriceTo(e: any) {
    this.priceTo = e.value
  }
  onInputareaTo(e: any) {
    this.areaTo = e.value
  }
  onInputareaFrom(e: any) {
    this.areaFrom = e.value
  }

  onChangeBath(e: any) {
    this.selectedbaths = e.value;
    console.log(this.selectedbaths)
  }
  onChangeRoom(e: any) {
    this.selectedrooms = e.value;
  }
  onChangeExchange(e: any) {
    this.selectedExchanges = e.value;
  }
  onChangeFeature(e: any) {
    this.selectedFeatures = e.value;
  }
  onChangeCondition(e: any) {
    this.selectedConditions = e.value;
  }
  goProperty(transactionTypeID: any, propertyTypeID: any, subPropertyTypeID: any): any {
    this.router.navigateByUrl(
      '/properties/' + transactionTypeID + '/' + propertyTypeID + '/' + subPropertyTypeID
    );
  }

  getPropertyTypes(): any {
    this.service
      .getAllPropertyTypes()
      .subscribe((response) => {
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


  getExchanges(): any {
    this.service
      .getAllExchanges()
      .subscribe((response) => {
        if (response.success === true) {
          this.exchanges = response.data;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' دریافت اطلاعات ',
            detail: response.data,
          });
        }
      });
  }

  getConditions(): any {
    this.service
      .getAllConditions()
      .subscribe((response) => {
        if (response.success === true) {
          this.conditions = response.data;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' دریافت اطلاعات ',
            detail: response.data,
          });
        }
      });
  }

  getFeatures(): any {
    this.service
      .getAllFeatures()
      .subscribe((response) => {
        if (response.success === true) {
          this.features = response.data;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' دریافت اطلاعات ',
            detail: response.data,
          });
        }
      });
  }

  getTransactionTypes(): any {
    this.service
      .getAllTransactionTypes()
      .subscribe((response) => {
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

  addToFavorites(id: any) {
    if (this.localStorage.getCurrentUser()) {
      let data = {
        userID: this.localStorage.userID,
        propertyID: id,
      }
      this.service
        .addFavorite(this.localStorage.userToken, data)
        .subscribe((response) => {
          if (response.success === true) {
            this.messageService.add({
              severity: 'success',
              summary: ' ثبت اطلاعات ',
              detail: 'ملک مورد نظر به لیست علاقه مندی شما اضافه شد..',
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: ' ثبت اطلاعات ',
              detail: response.data,
            });
          }
        });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: ' ورود به سایت ',
        detail: 'لطفا ابتدا وارد سایت شوید.',
      });
    }
  }

  redirectToDetail(id: any): void {
    this.router.navigate(['/property/' + id]);
  }

}
