import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { UserService } from './../../user.service';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

@Component({
  selector: 'app-property-edit',
  templateUrl: './property-edit.component.html',
  styleUrls: ['./property-edit.component.scss'],
  providers: [MessageService],
})
export class PropertyEditComponent implements OnInit {
  form: FormGroup;
  states: any[] = [];
  cities: any[] = [];
  features: any[] = [];
  exchanges: any[] = [];
  conditions: any[] = [];
  priceTypes: any[] = [];
  propertyTypes: any[] = [];
  subPropertyTypes: any[] = [];
  transactionTypes: any[] = [];
  isExchangable = false;
  forSale: boolean;
  property: any;
  selectedType: any;
  selectedSubType: any;
  selectedTransactionType: any;
  apiKey: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';
  map: mapboxgl.Map;
  geocoder: MapboxGeocoder;
  selectedLngLat: any;
  keywords: string[] = [];
  imageDescription: string[] = [];
  metaDescription: string[] = [];
  constructor(
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private service: UserService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.priceTypes = [
      { name: 'مناسب', code: 'مناسب' },
      { name: 'به قیمت', code: 'به قیمت' },
    ];
  }

  ngOnInit(): void {
    this.property = this.config.data.property;
    this.keywords = this.property.keywords.split(',');
    this.imageDescription = this.property.imageDescription.split(',');
    this.metaDescription = this.property.metaDescription.split(',');
    this.getPropertyTypes();
    this.getExchanges();
    this.getConditions();
    this.getFeatures();
    this.getTransactionTypes();
    this.fillStates();
    this.createForm();

    (mapboxgl as any).accessToken =
      'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';
    this.map = new mapboxgl.Map({
      container: 'pethos-mapbox',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [48.2890292, 33.4910974],
      zoom: 9,
    });
    this.addMapOptions();
  }

  addMapOptions() {
    let marker = new mapboxgl.Marker({
      draggable: true,
    });

    marker
      .setLngLat([this.property.location[0].lng, this.property.location[0].lat])
      .addTo(this.map);

    this.map.on('click', (e) => {
      marker.remove();
      marker.setDraggable(true);
      marker.setLngLat(e.lngLat).addTo(this.map);
      this.selectedLngLat = {
        lat: e.lngLat.lat,
        lng: e.lngLat.lng,
      };
    });
    marker.on('dragend', () => {
      this.selectedLngLat = marker.getLngLat();
    });

    const geocoder = new MapboxGeocoder({
      mapboxgl: mapboxgl,
      accessToken: mapboxgl.accessToken,
      marker: false,
    });
    geocoder.on('result', (e) => {
      marker.remove();
      marker.setDraggable(true);
      marker.setLngLat(e.result.center).addTo(this.map);
      marker.on('dragend', () => {
        this.selectedLngLat = marker.getLngLat();
      });
    });
    this.map.addControl(geocoder);

    this.map.addControl(new mapboxgl.FullscreenControl());
    this.map.addControl(new mapboxgl.NavigationControl());
  }

  getPropertyTypes(): any {
    this.service
      .getAllPropertyTypes(this.localStorage.userToken)
      .subscribe((response) => {
        if (response.success === true) {
          this.propertyTypes = response.data;
          this.selectedType = this.propertyTypes.find(
            (x) => x._id === this.property.SubPropertyType[0].propertyTypeID
          );
          this.subPropertyTypes = this.selectedType.SubPropertyType;
          this.selectedSubType = this.subPropertyTypes.find(
            (x) => x._id === this.property.SubPropertyType[0]._id
          );
          this.form.controls.propertyTypeID.setValue(this.selectedType);
          this.form.controls.subPropertyTypeID.setValue(this.selectedSubType);
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
      .getAllExchanges(this.localStorage.userToken)
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
      .getAllConditions(this.localStorage.userToken)
      .subscribe((response) => {
        if (response.success === true) {
          this.conditions = response.data;
          this.isExchangable = false;
          this.conditions.forEach((element) => {
            if (element._id === '613bea37818fb846e1269dca') {
              this.isExchangable = true;
            }
          });
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
      .getAllFeatures(this.localStorage.userToken)
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
      .getAllTransactionTypes(this.localStorage.userToken)
      .subscribe((response) => {
        if (response.success === true) {
          this.transactionTypes = response.data;
          this.selectedTransactionType = this.transactionTypes.find(
            (x) => x._id === this.property.transactionTypeID
          );
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' دریافت اطلاعات ',
            detail: response.data,
          });
        }
      });
  }

  onConditionChange(event: any) {
    this.isExchangable = false;
    event.value.forEach((element) => {
      if (element._id === '613bea37818fb846e1269dca') {
        this.isExchangable = true;
      }
    });

    this.form.controls.condition.setValue(event.value);
  }

  onTypeChange(e: any) {
    this.form.controls.propertyTypeID.setValue(e.value._id);
    this.subPropertyTypes = e.value.SubPropertyType;
  }

  onSubTypeChange(e: any) {
    this.form.controls.subPropertyTypeID.setValue(e.value._id);
  }

  onTransactionTypeChange(e: any) {
    this.forSale = false;
    if (e.value._id === '613be86ae83f7824dce7cadb') {
      this.forSale = true;
      this.form.controls.price.setValue(null);
    }
    else{
      this.form.controls.priceMortgage.setValue(null);
      this.form.controls.priceRent.setValue(null);
    }
    this.form.controls.transactionTypeID.setValue(e.value._id);
  }

  createForm() {
    this.form = new FormGroup({
      propertyTypeID: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
      subPropertyTypeID: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
      transactionTypeID: new FormControl(
        this.selectedTransactionType,
        Validators.compose([Validators.required])
      ),
      title: new FormControl(
        this.property.title,
        Validators.compose([Validators.required])
      ),
      priceType: new FormControl(this.property.priceType),
      priceRent: new FormControl(this.property.priceRent),
      priceMortgage: new FormControl(this.property.priceMortgage),
      price: new FormControl(this.property.price),
      age: new FormControl(this.property.age),
      area: new FormControl(this.property.area),
      bedroom: new FormControl(this.property.bedroom),
      bath: new FormControl(this.property.bath),
      state: new FormControl(this.property.state),
      city: new FormControl(this.property.city),
      address: new FormControl(this.property.address),
      location: new FormControl(this.property.location),
      detail: new FormControl(this.property.detail),
      features: new FormControl(this.property.features),
      exchange: new FormControl(this.property.exchange),
      condition: new FormControl(this.property.condition),
      image: new FormControl(this.property.image),
      gallery: new FormControl(this.property.gallery),
      vr: new FormControl(this.property.vr),
      imageDescription: new FormControl(this.imageDescription),
      metaDescription: new FormControl(this.metaDescription),
      keywords: new FormControl(this.keywords),
    });
  }

  onFileUpload(event): void {
    const formData = new FormData();
    formData.append('file', event.files[0], event.files[0].name);
    this.service.uploadFile(formData).subscribe((response) => {
      if (response.success === true) {
        this.form.controls.image.setValue(response.imagePath);

        this.messageService.add({
          severity: 'success',
          summary: ' آپلود تصویر ملک ',
          detail: 'تصویر با موفقیت آپلود شد.',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' آپلود تصویر ملک ',
          detail: response.data,
        });
      }
    });
  }

  onFilesUpload(event): void {
    const formData = new FormData();
    for (let i = 0; i < event.files.length; i++) {
      formData.append('files', event.files[i], event.files[i].name);
    }
    this.service.uploadFiles(formData).subscribe((response) => {
      if (response.success === true) {
        this.form.controls.gallery.setValue(response.imagePath);
        this.messageService.add({
          severity: 'success',
          summary: ' آپلود تصاویر ملک ',
          detail: 'تصاویر با موفقیت آپلود شدند.',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' آپلود تصاویر ملک ',
          detail: response.data,
        });
      }
    });
  }

  onVrFilesUpload(event): void {
    const formData = new FormData();
    for (let i = 0; i < event.files.length; i++) {
      formData.append('files', event.files[i], event.files[i].name);
    }
    this.service.uploadFiles(formData).subscribe((response) => {
      if (response.success === true) {
        this.form.controls.vr.setValue(response.imagePath);
        this.messageService.add({
          severity: 'success',
          summary: ' آپلود تصاویر ملک ',
          detail: 'تصاویر با موفقیت آپلود شدند.',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' آپلود تصاویر ملک ',
          detail: response.data,
        });
      }
    });
  }

  submitForm(): void {
    this.form.patchValue({
      location: this.selectedLngLat,
      state: this.form.controls.state.value.name,
      city: this.form.controls.city.value.name,
      priceType: this.form.controls.priceType.value.name
    });

    //add to db
    this.service
      .updateProperty(this.localStorage.userToken,this.property._id, this.form.value)
      .subscribe((response) => {
        if (response.success === true) {
          this.ref.close(true);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' ثبت اطلاعات ',
            detail: response.data,
          });
        }
      });
  }

  fillStates() {
    this.states = [
      {
        code: '1',
        name: 'آذربایجان شرقی',
      },
      {
        code: '2',
        name: 'آذربایجان غربی',
      },
      {
        code: '3',
        name: 'اردبیل',
      },
      {
        code: '4',
        name: 'اصفهان',
      },
      {
        code: '5',
        name: 'ایلام',
      },
      {
        code: '6',
        name: 'بوشهر',
      },
      {
        code: '7',
        name: 'تهران',
      },
      {
        code: '8',
        name: 'چهارمحال و بختیاری',
      },
      {
        code: '9',
        name: 'خراسان جنوبی',
      },
      {
        code: '10',
        name: 'خراسان رضوی',
      },
      {
        code: '11',
        name: 'خراسان شمالی',
      },
      {
        code: '12',
        name: 'خوزستان',
      },
      {
        code: '13',
        name: 'زنجان',
      },
      {
        code: '14',
        name: 'سمنان',
      },
      {
        code: '15',
        name: 'سیستان و بلوچستان',
      },
      {
        code: '16',
        name: 'فارس',
      },
      {
        code: '17',
        name: 'قزوین',
      },
      {
        code: '18',
        name: 'قم',
      },
      {
        code: '19',
        name: 'گلستان',
      },
      {
        code: '20',
        name: 'گیلان',
      },
      {
        code: '21',
        name: 'لرستان',
      },
      {
        code: '22',
        name: 'مازندران',
      },
      {
        code: '23',
        name: 'مرکزی',
      },
      {
        code: '24',
        name: 'هرمزگان',
      },
      {
        code: '25',
        name: 'همدان',
      },
      {
        code: '26',
        name: 'کردستان',
      },
      {
        code: '27',
        name: 'کرمان',
      },
      {
        code: '28',
        name: 'کرمانشاه',
      },
      {
        code: '29',
        name: 'کهگیلویه و بویر احمد',
      },
      {
        code: '30',
        name: 'یزد',
      },
      {
        code: '31',
        name: 'البرز',
      },
    ];

    this.states.forEach((element) => {
      if (element.name === this.property.state) {
        this.fillCities(element.code);
      }
    });
  }

  fillCities(code: string) {
    this.cities = [];
    switch (code) {
      case '1': {
        this.cities = [
          { code: '1', name: 'آذرشهر' },
          { code: '2', name: 'اسکو' },
          { code: '3', name: 'اهر' },
          {
            code: '4',
            name: 'بستان آباد',
          },
          { code: '5', name: 'بناب' },
          { code: '6', name: 'تبریز' },
          { code: '7', name: 'جلفا' },
          {
            code: '8',
            name: 'چار اویماق',
          },
          { code: '9', name: 'سراب' },
          { code: '10', name: 'شبستر' },
          { code: '11', name: 'عجب شیر' },
          {
            code: '12',
            name: 'مراغه',
          },
          { code: '13', name: 'مرند' },
          { code: '14', name: 'ملکان' },
          { code: '15', name: 'میانه' },
          {
            code: '16',
            name: 'هریس',
          },
          { code: '17', name: 'هشترود' },
          { code: '18', name: 'ورزقان' },
          { code: '19', name: 'کلیبر' },
          {
            code: '20',
            name: 'خدا آفرین',
          },
        ];
        break;
      }
      case '2': {
        this.cities = [
          { code: '21', name: 'ارومیه' },
          { code: '22', name: 'اشنویه' },
          { code: '23', name: 'بوکان' },
          {
            code: '24',
            name: 'پیرانشهر',
          },
          { code: '25', name: 'تکاب' },
          { code: '26', name: 'چالدران' },
          { code: '27', name: 'خوی' },
          {
            code: '28',
            name: 'سردشت',
          },
          { code: '29', name: 'سلماس' },
          { code: '30', name: 'شاهین دژ' },
          { code: '31', name: 'ماکو' },
          {
            code: '32',
            name: 'مهاباد',
          },
          { code: '33', name: 'میاندوآب' },
          { code: '34', name: 'نقده' },
          { code: '35', name: 'شوط' },
          {
            code: '36',
            name: 'پلدشت',
          },
          { code: '37', name: 'چابیاره' },
        ];
        break;
      }
      case '3': {
        this.cities = [
          { code: '38', name: 'اردبیل' },
          { code: '39', name: 'پیله سوار' },
          { code: '40', name: 'پارس آباد' },
          {
            code: '41',
            name: 'خلخال',
          },
          { code: '42', name: 'گرمی' },
          { code: '43', name: 'مشکین شهر' },
          { code: '44', name: 'نمین' },
          {
            code: '45',
            name: 'نیر',
          },
          { code: '46', name: 'کوثر' },
          { code: '47', name: 'سرعین' },
        ];
        break;
      }
      case '4': {
        this.cities = [
          { code: '48', name: 'آران و بیدگل' },
          { code: '49', name: 'اردستان' },
          { code: '50', name: 'اصفهان' },
          {
            code: '51',
            name: 'برخوار',
          },
          { code: '52', name: 'تیران و کرون' },
          { code: '53', name: 'چادگان' },
          { code: '54', name: 'خمینی شهر' },
          {
            code: '55',
            name: 'خوانسار',
          },
          { code: '56', name: 'سمیرم' },
          { code: '57', name: 'دهاقان' },
          { code: '58', name: 'شاهین شهر ومیمه' },
          {
            code: '59',
            name: 'شهرضا',
          },
          { code: '60', name: 'فریدن' },
          { code: '61', name: 'فریدون شهر' },
          { code: '62', name: 'فلاورجان' },
          {
            code: '63',
            name: 'گلپایگان',
          },
          { code: '64', name: 'لنجان' },
          { code: '65', name: 'مبارکه' },
          { code: '66', name: 'نائین' },
          {
            code: '67',
            name: 'نجف آباد',
          },
          { code: '68', name: 'نطنز' },
          { code: '69', name: 'کاشان' },
          { code: '70', name: 'خور و بیابانک' },
          {
            code: '71',
            name: 'بویین میاندشت',
          },
        ];
        break;
      }
      case '5': {
        this.cities = [
          { code: '72', name: 'آبدانان' },
          { code: '73', name: 'ایلام' },
          { code: '74', name: 'ایوان' },
          {
            code: '75',
            name: 'دره شهر',
          },
          { code: '76', name: 'دهلران' },
          { code: '77', name: 'چرداول' },
          { code: '78', name: 'مهران' },
          {
            code: '79',
            name: 'ملکشاهی',
          },
          { code: '80', name: 'بدره' },
          { code: '81', name: 'سیروان' },
        ];
        break;
      }
      case '6': {
        this.cities = [
          { code: '82', name: 'بوشهر' },
          { code: '83', name: 'تنگستان' },
          { code: '84', name: 'جم' },
          {
            code: '85',
            name: 'دشتستان',
          },
          { code: '86', name: 'دشتی' },
          { code: '87', name: 'دیر' },
          { code: '88', name: 'دیلم' },
          {
            code: '89',
            name: 'گناوه',
          },
          { code: '90', name: 'کنگان' },
        ];
        break;
      }
      case '7': {
        this.cities = [
          { code: '91', name: 'اسلامشهر' },
          { code: '92', name: 'پاکدشت' },
          { code: '93', name: 'تهران' },
          {
            code: '94',
            name: 'دماوند',
          },
          { code: '95', name: 'رباط کریم' },
          { code: '96', name: 'شمیرانات' },
          { code: '97', name: 'ری' },
          {
            code: '98',
            name: 'شهریار',
          },
          { code: '99', name: 'فیروزکوه' },
          { code: '100', name: 'ورامین' },
          { code: '101', name: 'بهارستان' },
          {
            code: '102',
            name: 'ملارد',
          },
          { code: '103', name: 'قرچک' },
          { code: '104', name: 'پیشوا' },
          { code: '105', name: 'قدس' },
          { code: '106', name: 'پردیس' },
        ];
        break;
      }
      case '8': {
        this.cities = [
          { code: '107', name: 'اردل' },
          { code: '108', name: 'بروجن' },
          { code: '109', name: 'شهرکرد' },
          {
            code: '110',
            name: 'فارسان',
          },
          { code: '111', name: 'لردگان' },
          { code: '112', name: 'کوهرنگ' },
          { code: '113', name: 'کیار' },
          {
            code: '114',
            name: 'سامان',
          },
          { code: '116', name: 'فرخ شهر' },
          { code: '117', name: 'یلداچی' },
          { code: '118', name: 'بن' },
        ];
        break;
      }
      case '9': {
        this.cities = [
          { code: '119', name: 'بیرجند' },
          { code: '120', name: 'درمیان' },
          { code: '121', name: 'سرایان' },
          {
            code: '122',
            name: 'سرپیشه',
          },
          { code: '123', name: 'طبس' },
          { code: '124', name: 'فردوس' },
          { code: '125', name: 'قائنات' },
          {
            code: '126',
            name: 'نهبندان',
          },
          { code: '127', name: 'بشرویه' },
          { code: '128', name: 'خوسف' },
          { code: '129', name: 'زیرکوه' },
          {
            code: '430',
            name: 'سربیشه',
          },
        ];
        break;
      }
      case '10': {
        this.cities = [
          { code: '130', name: 'بردسکن' },
          { code: '131', name: 'تایباد' },
          { code: '132', name: 'تربت جام' },
          {
            code: '133',
            name: 'تربت حیدریه',
          },
          { code: '134', name: 'چناران' },
          { code: '135', name: 'خلیل آباد' },
          { code: '136', name: 'خواف' },
          {
            code: '137',
            name: 'درگز',
          },
          { code: '138', name: 'رشتخوار' },
          { code: '139', name: 'سبزوار' },
          { code: '140', name: 'سرخس' },
          {
            code: '141',
            name: 'فریمان',
          },
          { code: '142', name: 'قوچان' },
          { code: '143', name: 'گناباد' },
          { code: '144', name: 'مشهد مقدس' },
          {
            code: '145',
            name: 'مه ولات',
          },
          { code: '146', name: 'نیشابور' },
          { code: '147', name: 'کاشمر' },
          { code: '148', name: 'کلات' },
          {
            code: '149',
            name: 'طرقبه شاندیز',
          },
          { code: '150', name: 'چغنای' },
          { code: '151', name: 'جوین' },
          { code: '152', name: 'بجستان' },
          {
            code: '153',
            name: 'زاوه',
          },
          { code: '154', name: 'فیروزه' },
          { code: '155', name: 'باخزر' },
          { code: '429', name: 'اشخانه' },
        ];
        break;
      }
      case '11': {
        this.cities = [
          { code: '156', name: 'اسفراین' },
          { code: '157', name: 'بجنورد' },
          { code: '158', name: 'جاجرم' },
          {
            code: '159',
            name: 'شیروان',
          },
          { code: '160', name: 'فاروج' },
          { code: '161', name: 'مانه و سملقان' },
          { code: '162', name: 'گرمه' },
          {
            code: '163',
            name: 'راز و جرگلان',
          },
        ];
        break;
      }
      case '12': {
        this.cities = [
          { code: '164', name: 'آبادان' },
          { code: '165', name: 'امیدیه' },
          { code: '166', name: 'اندیمشک' },
          {
            code: '167',
            name: 'اهواز',
          },
          { code: '168', name: 'ایذه' },
          { code: '169', name: 'باغ ملک' },
          { code: '170', name: 'بندر ماهشهر' },
          {
            code: '171',
            name: 'بهبهان',
          },
          { code: '172', name: 'خرمشهر' },
          { code: '173', name: 'دزفول' },
          { code: '174', name: 'دشت آزادگان(سوسنگرد)' },
          {
            code: '175',
            name: 'رامشیر',
          },
          { code: '176', name: 'رامهرمز' },
          { code: '177', name: 'شادگان' },
          { code: '178', name: 'شوش' },
          {
            code: '179',
            name: 'شوشتر',
          },
          { code: '180', name: 'گتوند' },
          { code: '181', name: 'لالی' },
          { code: '182', name: 'مسجد سلیمان' },
          {
            code: '183',
            name: 'هندیجان',
          },
          { code: '184', name: 'بندر امام خمینی' },
          { code: '185', name: 'هفتکل' },
          { code: '186', name: 'هویزه' },
          {
            code: '187',
            name: 'اندیکا',
          },
          { code: '188', name: 'باوی' },
          { code: '189', name: 'حمیدیه' },
          { code: '190', name: 'کارون' },
        ];
        break;
      }
      case '13': {
        this.cities = [
          { code: '191', name: 'ابهر' },
          { code: '192', name: 'ایجرود' },
          {
            code: '193',
            name: 'خدابنده(قیدار)',
          },
          { code: '194', name: 'خرم دره' },
          { code: '195', name: 'زنجان' },
          { code: '196', name: 'طارم' },
          {
            code: '197',
            name: 'ماهنشان',
          },
          { code: '198', name: 'سلطانیه' },
        ];
        break;
      }
      case '14': {
        this.cities = [
          { code: '199', name: 'دامغان' },
          { code: '200', name: 'سمنان' },
          { code: '201', name: 'شاهرود' },
          {
            code: '202',
            name: 'گرمسار',
          },
          { code: '203', name: 'مهدی شهر' },
          { code: '204', name: 'میامی' },
          { code: '205', name: 'آرادان' },
        ];
        break;
      }
      case '15': {
        this.cities = [
          { code: '206', name: 'ایرانشهر' },
          { code: '207', name: 'چابهار' },
          { code: '208', name: 'خاش' },
          {
            code: '209',
            name: 'زابل',
          },
          { code: '210', name: 'زاهدان' },
          { code: '211', name: 'زهک' },
          { code: '212', name: 'سراوان' },
          {
            code: '213',
            name: 'سرباز',
          },
          { code: '214', name: 'نیکشهر' },
          { code: '215', name: 'کنارک' },
          { code: '216', name: 'هیرمند' },
          {
            code: '217',
            name: 'قصرقند',
          },
          { code: '218', name: 'مهرستان' },
          { code: '219', name: 'سیب و سوران' },
          { code: '220', name: 'فنوج' },
          {
            code: '221',
            name: 'نیمروز',
          },
          { code: '222', name: 'میرجاوه' },
          { code: '223', name: 'هامون' },
        ];
        break;
      }
      case '16': {
        this.cities = [
          { code: '224', name: 'آباده' },
          { code: '225', name: 'ارسنجان' },
          { code: '226', name: 'استهبان' },
          {
            code: '227',
            name: 'اقلید',
          },
          { code: '228', name: 'بوانات' },
          { code: '229', name: 'پاسارگاد' },
          { code: '230', name: 'جهرم' },
          {
            code: '231',
            name: 'خرم بید',
          },
          { code: '232', name: 'خنج' },
          { code: '233', name: 'داراب' },
          { code: '234', name: 'زرین دشت' },
          {
            code: '235',
            name: 'سپیدان',
          },
          { code: '236', name: 'شیراز' },
          { code: '237', name: 'فراشبند' },
          { code: '238', name: 'فسا' },
          {
            code: '239',
            name: 'فیروزآیاد',
          },
          { code: '240', name: 'قیر و کارزین' },
          { code: '241', name: 'لارستان' },
          { code: '242', name: 'لامرد' },
          {
            code: '243',
            name: 'مرودشت',
          },
          { code: '244', name: 'مهر' },
          { code: '245', name: 'ممستی' },
          { code: '246', name: 'نی ریز' },
          {
            code: '247',
            name: 'کازرون',
          },
          { code: '248', name: 'سروستان' },
          { code: '249', name: 'رستم' },
          { code: '250', name: 'گراش' },
          {
            code: '251',
            name: 'خرامه',
          },
          { code: '252', name: 'کوار' },
        ];
        break;
      }
      case '17': {
        this.cities = [
          { code: '255', name: 'آبیک' },
          { code: '256', name: 'البرز' },
          { code: '257', name: 'بویین زهرا' },
          {
            code: '258',
            name: 'تاکستان',
          },
          { code: '259', name: 'قزوین' },
          { code: '260', name: 'آوج' },
        ];
        break;
      }
      case '18': {
        this.cities = [{ code: '261', name: 'قم' }];
        break;
      }
      case '19': {
        this.cities = [
          { code: '262', name: 'آزادشهر' },
          { code: '263', name: 'گلستان - آزادشهر' },
          {
            code: '264',
            name: 'آق قلا',
          },
          { code: '265', name: 'بندر ترکمن' },
          { code: '266', name: 'بندر گز' },
          { code: '267', name: 'رامیان' },
          {
            code: '268',
            name: 'علی آباد',
          },
          { code: '269', name: 'گرگان' },
          { code: '270', name: 'گنبد کاووس' },
          { code: '271', name: 'مینو دشت' },
          {
            code: '272',
            name: 'کرد کوی',
          },
          { code: '273', name: 'کلاله' },
          { code: '274', name: 'گالیکش' },
          { code: '275', name: 'گمیشان' },
          {
            code: '276',
            name: 'مراوه تپه',
          },
        ];
        break;
      }
      case '20': {
        this.cities = [
          { code: '277', name: 'آستارا' },
          { code: '278', name: 'آستانه اشرفیه' },
          {
            code: '279',
            name: 'املش',
          },
          { code: '280', name: 'بندر انزلی' },
          { code: '281', name: 'تالش' },
          { code: '282', name: 'رشت' },
          {
            code: '283',
            name: 'رضوان شهر',
          },
          { code: '284', name: 'رودبار' },
          { code: '285', name: 'رودسر' },
          { code: '286', name: 'سیاهکل' },
          {
            code: '287',
            name: 'شفت',
          },
          { code: '288', name: 'صومعه سرا' },
          { code: '289', name: 'فومن' },
          { code: '290', name: 'لاهیجان' },
          {
            code: '291',
            name: 'لنگرود',
          },
          { code: '292', name: 'ماسال' },
        ];
        break;
      }
      case '21': {
        this.cities = [
          { code: '293', name: 'ازنا' },
          { code: '294', name: 'الیگودرز' },
          { code: '295', name: 'بروجرد' },
          {
            code: '296',
            name: 'پل دختر',
          },
          { code: '297', name: 'خرم آباد' },
          { code: '298', name: 'دلقان(نورآباد)' },
          { code: '299', name: 'دورود' },
          {
            code: '300',
            name: 'سلسله(الشتر)',
          },
          { code: '301', name: 'کوهدشت' },
        ];
        break;
      }
      case '22': {
        this.cities = [
          { code: '302', name: 'آمل' },
          { code: '303', name: 'بابل' },
          { code: '304', name: 'بابلسر' },
          {
            code: '305',
            name: 'بهشهر',
          },
          { code: '306', name: 'تنکابن' },
          { code: '307', name: 'جویبار' },
          { code: '308', name: 'چالوس' },
          {
            code: '309',
            name: 'رامسر',
          },
          { code: '310', name: 'ساری' },
          { code: '311', name: 'سوادکوه' },
          { code: '312', name: 'عباس آباد' },
          {
            code: '313',
            name: 'قائم شهر',
          },
          { code: '314', name: 'گلوگاه' },
          { code: '315', name: 'محمود آباد' },
          { code: '316', name: 'نور' },
          {
            code: '317',
            name: 'نوشهر',
          },
          { code: '318', name: 'نکا' },
          { code: '319', name: 'فریدونکنار' },
          { code: '320', name: 'زیراب' },
          {
            code: '321',
            name: 'سوادکوه شمالی',
          },
          { code: '322', name: 'میاندرود' },
          { code: '323', name: 'کلاردشت' },
          { code: '324', name: 'سیمرغ' },
        ];
        break;
      }
      case '23': {
        this.cities = [
          { code: '325', name: 'آشتیان' },
          { code: '326', name: 'اراک' },
          { code: '327', name: 'تفرش' },
          {
            code: '328',
            name: 'خمین',
          },
          { code: '329', name: 'دلیجان' },
          { code: '330', name: 'زرندیه' },
          { code: '331', name: 'ساوه' },
          {
            code: '332',
            name: 'شازند',
          },
          { code: '333', name: 'محلات' },
          { code: '334', name: 'کمیجان' },
          { code: '335', name: 'خنداب' },
          {
            code: '336',
            name: 'فراهان',
          },
        ];
        break;
      }
      case '24': {
        this.cities = [
          { code: '337', name: 'بستک' },
          { code: '338', name: 'بندرعباس' },
          { code: '339', name: 'بندر لنگه' },
          {
            code: '340',
            name: 'پارسیان',
          },
          { code: '341', name: 'جاسک' },
          { code: '342', name: 'حاجی آباد' },
          { code: '343', name: 'خمیر' },
          {
            code: '344',
            name: 'رودان(دهبارز)',
          },
          { code: '345', name: 'میناب' },
          { code: '346', name: 'سیربک' },
          { code: '347', name: 'قشم' },
          {
            code: '348',
            name: 'ابوموسی',
          },
          { code: '349', name: 'بشاگرد' },
          { code: '350', name: 'کیش' },
        ];
        break;
      }
      case '25': {
        this.cities = [
          { code: '351', name: 'اسد آباد' },
          { code: '352', name: 'بهار' },
          { code: '353', name: 'تویسرکان' },
          {
            code: '354',
            name: 'رزن',
          },
          { code: '355', name: 'فامتین' },
          { code: '356', name: 'ملایر' },
          { code: '357', name: 'نهاوند' },
          {
            code: '358',
            name: 'همدان',
          },
          { code: '359', name: 'کیودرآهنگ' },
        ];
        break;
      }
      case '26': {
        this.cities = [
          { code: '360', name: 'بانه' },
          { code: '361', name: 'بیجار' },
          { code: '362', name: 'دیواندره' },
          {
            code: '363',
            name: 'سروآباد',
          },
          { code: '364', name: 'سقز' },
          { code: '365', name: 'سنندج' },
          { code: '366', name: 'قروه' },
          {
            code: '367',
            name: 'مریوان',
          },
          { code: '368', name: 'کامیاران' },
          { code: '369', name: 'دهگلان' },
        ];
        break;
      }
      case '27': {
        this.cities = [
          { code: '370', name: 'بافت' },
          { code: '371', name: 'بردسیر(مشیز)' },
          { code: '372', name: 'بم' },
          {
            code: '373',
            name: 'راور',
          },
          { code: '374', name: 'رفسنجان' },
          { code: '375', name: 'زرند' },
          { code: '376', name: 'سیرجان' },
          {
            code: '377',
            name: 'شهر بابک',
          },
          { code: '378', name: 'قهرج' },
          { code: '379', name: 'کرمان' },
          { code: '380', name: 'کوهبنان' },
          {
            code: '381',
            name: 'انار',
          },
          { code: '382', name: 'ریگان' },
          { code: '383', name: 'رابر' },
          { code: '420', name: 'جیرفت' },
          {
            code: '421',
            name: 'رودبار جنوبی',
          },
          { code: '422', name: 'عنبر آباد' },
          { code: '423', name: 'منوجان' },
          { code: '424', name: 'کهنوج' },
          {
            code: '425',
            name: 'قلعه گنج',
          },
        ];
        break;
      }
      case '28': {
        this.cities = [
          { code: '384', name: 'اسلام آباد غرب' },
          { code: '385', name: 'پاوه' },
          {
            code: '386',
            name: 'ثلاث باباجانی',
          },
          { code: '387', name: 'جوانرود' },
          { code: '388', name: 'دالاهو' },
          { code: '389', name: 'روانسر' },
          {
            code: '390',
            name: 'سرپل ذهاب',
          },
          { code: '391', name: 'سنقر' },
          { code: '392', name: 'صحنه' },
          { code: '393', name: 'قصر شیرین' },
          {
            code: '394',
            name: 'گیلانغرب',
          },
          { code: '395', name: 'هرسین' },
          { code: '396', name: 'کرمانشاه' },
          { code: '397', name: 'کنگاور' },
        ];
        break;
      }
      case '29': {
        this.cities = [
          { code: '398', name: 'بهمئی' },
          { code: '399', name: 'دنا' },
          { code: '400', name: 'گچساران' },
          {
            code: '401',
            name: 'کهگیلویه',
          },
          { code: '402', name: 'بویر احمد' },
          { code: '403', name: 'باشت' },
          { code: '427', name: 'یاسوج' },
        ];
        break;
      }
      case '30': {
        this.cities = [
          { code: '404', name: 'ابرکوه' },
          { code: '405', name: 'اردکان' },
          { code: '406', name: 'بافق' },
          {
            code: '407',
            name: 'تفت',
          },
          { code: '408', name: 'خاتم' },
          { code: '409', name: 'اشکذر' },
          { code: '410', name: 'مهریز' },
          {
            code: '411',
            name: 'میبد',
          },
          { code: '412', name: 'یزد' },
          { code: '413', name: 'بهاباد' },
        ];
        break;
      }
      case '31': {
        this.cities = [
          { code: '414', name: 'ساوجبلاغ' },
          { code: '415', name: 'کرج' },
          { code: '416', name: 'نظرآباد' },
          {
            code: '417',
            name: 'فردیس',
          },
          { code: '418', name: 'اشتهارد' },
          { code: '419', name: 'طالقان' },
          { code: '426', name: 'هشتگرد' },
        ];
        break;
      }
      default: {
        this.cities = [];
        break;
      }
    }
  }

  stateOnChange(event: any): void {
    this.fillCities(event.value.code);
  }
}
