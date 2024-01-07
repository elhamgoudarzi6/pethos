import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  baseUrl = 'https://api.pethos.app/api/v1/user/';
  constructor(private http: HttpClient) { }

  authUser(data: any): any {
    return this.http.post(this.baseUrl + 'authUser', data);
  }

  getAgentRating(id: any): any {
    return this.http.get(this.baseUrl + 'getAgentRating/' + id);
  }

  registerAgentRating(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'registerAgentRating', data, { params });
  }

  //#region Favorites
  getAllFavorites(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllFavorite/' + id, { params });
  }
  addFavorite(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'registerFavorite', data, { params });
  }
  deleteFavorite(token: string, id: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteFavorite/' + id, { params });
  }
  //#endregion

  //#region VisitRequest
  addVisitRequest(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(
      this.baseUrl + 'registerRequestVisit',
      data,
      { params }
    );
  }


  //#endregion

  //#region Property
  getAllProperties(): any {
    return this.http.get(this.baseUrl + 'getAllProperty');
  }
  getNewestProperty(): any {
    return this.http.get(this.baseUrl + 'newestProperty');
  }
  getProperty(id: string): any {
    return this.http.get(this.baseUrl + 'getProperty/' + id);
  }
  advanceSearchProperty(data: any): any {
    return this.http.post(this.baseUrl + 'advanceSearchProperty', data);
  }
  //#endregion

  //#region Discounts
  getAllDiscounts(): any {
    return this.http.get(this.baseUrl + 'getAllDiscount');
  }
  //#endregion

  //#region Conditions
  getAllConditions(): any {
    return this.http.get(this.baseUrl + 'getAllCondition');
  }
  //#endregion

  //#region Exchanges
  getAllExchanges(): any {
    return this.http.get(this.baseUrl + 'getAllExchange');
  }
  //#endregion

  //#region Transaction Types
  getAllTransactionTypes(): any {
    return this.http.get(this.baseUrl + 'getAllTransactionType');
  }
  //#endregion

  //#region Features
  getAllFeatures(): any {
    return this.http.get(this.baseUrl + 'getAllFeature');
  }
  //#endregion

  //#region Property Types
  getAllPropertyTypes(): any {
    return this.http.get(this.baseUrl + 'getAllPropertyType');
  }
  //#endregion

  //#region Subsciptions
  addSubscription(data: any): any {
    return this.http.post(this.baseUrl + 'registerSubscription', data);
  }
  //#endregion

  //#region Contact Messages
  addContactUs(data: any): any {
    return this.http.post(this.baseUrl + 'registerContactUs', data);
  }
  //#endregion

  //#region Agents
  getAllAgents(): any {
    return this.http.get(this.baseUrl + 'getAllAgent');
  }
  getAgent(id: string): any {
    return this.http.get(this.baseUrl + 'getAgent/' + id);
  }
  //#endregion

  //#region News
  getAllNews(): any {
    return this.http.get(this.baseUrl + 'getAllNews');
  }
  getAllTagNews(): any {
    return this.http.get(this.baseUrl + 'getAllTagNews');
  }
  getAllNewsByTags(data: any): any {
    return this.http.post(this.baseUrl + 'getAllNewsByTag', data);
  }
  getLatestNews(): any {
    return this.http.get(this.baseUrl + 'getLatestNews');
  }
  getNews(id: string): any {
    return this.http.get(this.baseUrl + 'getNews/' + id);
  }
  //#endregion

  //#region Faqs
  getAllFaqs(): any {
    return this.http.get(this.baseUrl + 'getAllFaq');
  }
  //#endregion
}
