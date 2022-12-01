import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AgentService {
  baseUrl = 'https://api.pethos.app/api/v1/agent/';

  constructor(private http: HttpClient) { }

  login(data: any): any {
    return this.http.post(this.baseUrl + 'loginAgent', data);
  }

  getToken(id: string): any {
    let body = {
      SecretKey: 'sadas@!$@#%!^#!GSDGETWT@#OI%J@#%!*#)^U#)^U!@)U',
    };
    return this.http.post(this.baseUrl + 'getToken/' + id, body);
  }

  getAgentRating(token: string, id: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAgentRating/' + id, { params });
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
  //#region profile
  changePassword(token: string, id: any, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'changePassword/' + id, data, { params });
  }
  changeUsername(token: string, id: any, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'changeUsername/' + id, data, { params });
  }
  changeMobileNumber(token: string, id: any, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'changeMobileNumber/' + id, data, { params });
  }
  resetPassword(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + '/resetPassword', data, { params });
  }
  //#endregion
  findMobile(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'findMobile', data, { params });
  }
  //#region agent
  getAgent(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAgent/' + id, { params });
  }
  updateAgent(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'updateAgent/' + id, data, { params });
  }
  //#endregion

  //#region Property
  getAllPropertyForAgent(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllPropertyForAgent/' + id, { params });
  }
  getProperty(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getProperty/' + id, { params });
  }
  countPropertyForAgent(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'countPropertyForAgent/' + id, { params });
  }
  addProperty(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'registerProperty', data, { params });
  }
  updateProperty(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'updateProperty/' + id, data, { params });
  }
  deleteProperty(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteProperty/' + id, { params });
  }
  //#endregion

  //#region request property
  getAllRequestPropertyForAgent(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllRequestPropertyForAgent/' + id, { params });
  }
  getRequestProperty(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getRequestProperty/' + id, { params });
  }

  updateStatusRequestProperty(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'updateStatusRequestProperty/' + id, data, { params });
  }
  //#endregion

  //#region Ticket
  getAllTicketsByAgentId(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(
      this.baseUrl + 'getAllTicketForAgent/' + id,
      { params }
    );
  }
  getCountOfTicketsByAgentId(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(
      this.baseUrl + 'countTicketForAgent/' + id,
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

  getAllUser(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(
      this.baseUrl + 'getAllUser',
      { params }
    );
  }
  //#endregion

  //#region VisitRequest
  getAllVisitRequestsByAgent(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(
      this.baseUrl + 'getAllRequestVisitForAgent/' + id,
      { params }
    );
  }
  updateVisitRequest(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(
      this.baseUrl + 'updateRequestVisit/' + id,
      data,
      { params }
    );
  }
  updateStatusRequestVisit(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(
      this.baseUrl + 'updateStatusRequestVisit/' + id,
      data,
      { params }
    );
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
  getAllSubPropertyTypes(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllSubPropertyType', { params });
  }
  getAllPropertyTypes(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllPropertyType', { params });
  }
}
function params(arg0: string, params: any): any {
  throw new Error('Function not implemented.');
}

