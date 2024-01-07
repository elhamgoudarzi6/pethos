import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'https://api.pethos.app/api/v1/user/';
  constructor(private http: HttpClient) { }

  getToken(id: string): any {
    let body = {
      SecretKey: 'sadas@!$@#%!^#!GSDGETWT@#OI%J@#%!*#)^U#)^U!@)U',
    };
    return this.http.post(this.baseUrl + 'getToken/' + id, body);
  }

  //#region Files
  uploadFile(data: any): any {
    return this.http.post(this.baseUrl + 'upload', data);
  }

  uploadFiles(data: any): any {
    return this.http.post(this.baseUrl + 'multiUpload', data);
  }

  deleteFile(data: any): any {
    return this.http.post(this.baseUrl + 'deleteFile', data);
  }
  //#endregion

  //#region  User
  getUser(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getUser/' + id, { params });
  }

  updateUser(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'updateUser/' + id, data, { params });
  }

  changeMobileNumber(token: string, id: any, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(
      this.baseUrl + 'changeMobileNumber/' + id,
      data,
      { params }
    );
  }
  findMobile(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'findMobile', data, { params });
  }
  //#endregion

  getAgentRating(token: string, id: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAgentRating/' + id, { params });
  }

  //#region Ticket
  getAllTicketsByUserId(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'allTicketForUser/' + id, { params });
  }
  getCountOfAllTickets(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(
      this.baseUrl + 'countTicketForUser/' + id,
      { params }
    );
  }
  addTicket(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'registerTicket', data, { params });
  }
  replyTicket(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'replyTicket/' + id, data, { params });
  }
  //#endregion

  //#region Agent Categories
  getAllAgentCategory(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllCategoryAgent', { params });
  }
  //#endregion

  //#region Favorites
  getAllFavorites(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllFavorite/' + id, { params });
  }
  deleteFavorite(token: string, userID: string, propertyID: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteFavorite/' + userID + '/' + propertyID, { params });
  }
  //#endregion

  //#region VisitRequest
  getAllVisitRequests(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(
      this.baseUrl + 'getAllRequestVisitByUser/' + id,
      { params }
    );
  }
  getRequestVisit(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getRequestVisit/' + id, { params });
  }
  deleteVisitRequest(token: string, id: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(
      this.baseUrl + 'deleteRequestVisit/' + id,
      { params }
    );
  }
  //#endregion

  //#region Property
  getAllProperties(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(
      this.baseUrl + 'getAllProperty',
      { params }
    );
  }
  getAllPropertiesByUserId(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(
      this.baseUrl + 'getAllPropertyByUser/' + id,
      { params }
    );
  }
  countPropertyByUser(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(
      this.baseUrl + 'countPropertyByUser/' + id,
      { params }
    );
  }
  addProperty(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'registerProperty', data, { params });
  }
  updateProperty(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(
      this.baseUrl + 'updateProperty/' + id,
      data,
      { params }
    );
  }
  deleteProperty(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteProperty/' + id, { params });
  }
  //#endregion

  //#region Discounts
  getAllDiscounts(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllDiscount', { params });
  }
  //#endregion

  //#region Conditions
  getAllConditions(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllCondition', { params });
  }
  //#endregion

  //#region Exchanges
  getAllExchanges(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllExchange', { params });
  }
  //#endregion

  //#region Transaction Types
  getAllTransactionTypes(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllTransactionType', { params });
  }
  //#endregion

  //#region Features
  getAllFeatures(token: string): any {
    const params = new HttpParams().set('token', token);

    return this.http.get(this.baseUrl + 'getAllFeature', { params });
  }
  //#endregion

  //#region Property Types
  getAllPropertyTypes(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllPropertyType', { params });
  }
  //#endregion

  //#region Agents
  getAllAgentsByCategoryId(token: string, id: string): any {
    const params = new HttpParams().set('token', token);

    return this.http.get(
      this.baseUrl + 'getAllAgentByCategoryID/' + id,
      { params }
    );
  }
  //#endregion
}
