import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = 'https://api.pethos.app/api/v1/admin/';

  constructor(private http: HttpClient) { }

  login(data: any): any {
    return this.http.post(this.baseUrl + 'loginAdmin', data);
  }

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

  //#region User
  getAllUsers(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllUser', { params });
  }
  getUser(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getUser/' + id, { params });
  }

  addUser(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'registerUser', data, { params });
  }

  updateUser(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'updateUser/' + id, data, { params });
  }

  deleteUser(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteUser/' + id, { params });
  }
  //#endregion

  //#region FAQ
  getAllFaqs(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllFaq', { params });
  }

  addFaq(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'registerFaq', data, { params });
  }

  updateFaq(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'updateFaq/' + id, data, { params });
  }

  deleteFaq(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteFaq/' + id, { params });
  }
  //#endregion

  //#region News
  getAllNews(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllNews', { params });
  }
  getNews(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getNews/' + id, { params });
  }
  addNews(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'registerNews', data, { params });
  }
  updateNews(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'updateNews/' + id, data, { params });
  }
  deleteNews(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteNews/' + id, { params });
  }
  //#endregion

  //#region Sliders
  getAllSliders(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllslider', { params });
  }

  addSlider(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'registerSlider', data, { params });
  }

  updateSlider(token: string, id: any, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'updateSlider/' + id, data, { params });
  }

  deleteSlider(token: string, id: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteSlider/' + id, { params });
  }
  //#endregion

  //#region Admins
  getAllAdmins(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllAdmin', { params });
  }
  getAdmin(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
   // const params = new HttpParams({ fromObject: { token: token, id: id } })
    return this.http.get(this.baseUrl + 'getAdmin/'+id, { params });
  }
  addAdmin(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'registerAdmin', data, { params });
  }
  updateAdmin(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'updateAdmin/' + id, data, { params });
  }
  deleteAdmin(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteAdmin/' + id, { params });
  }
  changePassword(token: string, id: any, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'changePassword/' + id, data, { params });
  }
  changeUsername(token: string, id: any, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'changeUsername/' + id, data, { params });
  }
  resetPassword(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + '/resetPassword', data, { params });
  }
  //#endregion

  //#region Subscriptions
  getAllSubscriptions(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllSubscription', { params });
  }
  deleteSubscription(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteSubscription/' + id, { params });
  }
  //#endregion

  //#region ContactUs
  getAllContactUs(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllContactUs', { params });
  }
  getContactUs(token: string, id: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getContactUs/' + id, { params });
  }
  deleteContactUs(token: string, id: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteContactUs/' + id, { params });
  }
  //#endregion

  getAgentRating(token: string, id: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAgentRating/' + id, { params });
  }

  //#region Discounts
  getAllDiscounts(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllDiscount', { params });
  }
  addDiscount(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'registerDiscount', data, { params });
  }
  updateDiscount(token: string, id: any, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(
      this.baseUrl + 'updateDiscount/' + id,
      data,
      { params }
    );
  }
  deleteDiscount(token: string, id: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteDiscount/' + id, { params });
  }
  //#endregion

  getAllPethos(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllPethos', { params });
  }
  registerPethos(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'registerPethos',data, { params });
  }

  
  getAllSubPethos(token: string, id: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllSubPethos/' + id, { params });
  }
  registerSubPethos(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'registerSubPethos',data, { params });
  }

    
  getAllSubSubPethos(token: string, id: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllSubSubPethos/' + id, { params });
  }
  registerSubSubPethos(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'registerSubSubPethos',data, { params });
  }

  //#region Agent
  getAllAgentLevel(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllAgentLevel', { params });
  }
  registerAgentLevel(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'registerAgentLevel',data, { params });
  }
  getAllAgents(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllAgent', { params });
  }
  getAllAgentsByCategoryId(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(
      this.baseUrl + 'getAllAgentByCategoryID/' + id,
      { params }
    );
  }
  getAgent(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAgent/' + id, { params });
  }
  addAgent(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'registerAgent', data, { params });
  }
  updateAgent(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'updateAgent/' + id, data, { params });
  }
  deleteAgent(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteAgent/' + id, { params });
  }
  //#endregion

  //#region Property Type
  getAllPropertyTypes(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllPropertyType', { params });
  }
  addPropertyType(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(
      this.baseUrl + 'registerPropertyType',
      data,
      { params }
    );
  }
  updatePropertyType(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(
      this.baseUrl + 'updatePropertyType/' + id,
      data,
      { params }
    );
  }
  deletePropertyType(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(
      this.baseUrl + 'deletePropertyType/' + id,
      { params }
    );
  }
  getAllSubPropertyTypes(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllSubPropertyType', { params });
  }
  getAllSubPropertyTypesByCategoryId(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(
      this.baseUrl + 'getAllSubPropertyType/' + id,
      { params }
    );
  }
  addSubPropertyType(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(
      this.baseUrl + 'registerSubPropertyType',
      data,
      { params }
    );
  }
  updateSubPropertyType(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(
      this.baseUrl + 'updateSubPropertyType/' + id,
      data,
      { params }
    );
  }
  deleteSubPropertyType(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteSubPropertyType/' + id, { params });
  }
  //#endregion

  //#region Ticket
  getAllTickets(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllTicket', { params });
  }
  getAllTicketsByAgentId(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(
      this.baseUrl + 'getAllTicketForAgent/' + id,
      { params }
    );
  }
  getCountOfAllTickets(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'countTicket', { params });
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
  //#endregion

  //#region VisitRequest
  getAllVisitRequests(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllRequestVisit', { params });
  }
  getAllVisitRequestsByAgent(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(
      this.baseUrl + 'getAllRequestVisitForAgent/' + id,
      { params }
    );
  }
  getRequestVisit(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getRequestVisit/' + id, { params });
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

  //#region Property
  getAllProperties(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllProperty', { params });
  }
  getProperty(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getProperty/' + id, { params });
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
}
function params(arg0: string, params: any): any {
  throw new Error('Function not implemented.');
}

