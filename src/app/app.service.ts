import {
  Injectable
} from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AppService {

  constructor(private http: Http) {

  }

  getCompanyInfo() {
    const headers = new Headers({
      'Auth-Token': localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({ headers: headers });

    return this.http
      .post('https://mcfpayapi.ca/api/v1/mgt/get_company_info/', {}, { headers: headers}
      ).map((response: Response) => {
        return response.json();
      }).catch(this.handleError);
  }
  getSettlements(page_num) {
    const headers = new Headers({
      'Auth-Token': localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({ headers: headers });

    return this.http
      .post('https://mcfpayapi.ca/api/v1/mgt/get_candidate_settle/', {'page_num': page_num, 'page_size': 10}, {headers: headers}
      ).map((response: Response) => {
        return response.json();
      }).catch(this.handleError);
  }
  getTodayBill(page_num, account_id) {
    const headers = new Headers({
      'Auth-Token': localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({ headers: headers });

    return this.http
      .post('https://mcfpayapi.ca/api/v1/mgt/get_hot_txns/', {'account_id': parseInt(account_id, 10),
      'page_num': page_num, 'page_size': 10}, {headers: headers}
      ).map((response: Response) => {
        return response.json();
      }).catch(this.handleError);
  }
  getBillHistory(time, page_num, account_id) {
    console.log(time);
    const headers = new Headers({
      'Auth-Token': localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    const body = {
      'account_id': parseInt(account_id, 10),
      'start_time': time.iv_start,
      'end_time': time.iv_end,
      'page_num': page_num,
      'page_size': 10
   };
    const options = new RequestOptions({ headers: headers });

    return this.http
      .post('https://mcfpayapi.ca/api/v1/mgt/query_txns_by_time/', JSON.stringify(body), {headers: headers}
      ).map((response: Response) => {
        return response.json();
      }).catch(this.handleError);
  }
  getOtherHistory(page_num, account_id) {
    const headers = new Headers({
      'Auth-Token': localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    const body = {
      'account_id': parseInt(account_id, 10),
      'start_time': '2000/01/01',
      'end_time': Date.now(),
      'page_num': page_num,
      'page_size': 10
   };
    const options = new RequestOptions({ headers: headers });

    return this.http
      .post('https://mcfpayapi.ca/api/v1/mgt/query_txns_by_time/', JSON.stringify(body), {headers: headers}
      ).map((response: Response) => {
        return response.json();
      }).catch(this.handleError);
  }
  login(model) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const body = {
      'username': model.username,
      'password': model.password,
      'version': 'v0.1'
    };
    const options = new RequestOptions({ headers: headers });

    return this.http
      .post('https://mcfpayapi.ca/mgt/login/', body, {headers: headers}
      ).map((response: Response) => {
        return response.json();
      }).catch(this.handleError);
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
  }
  addSettlement(item) {
    const headers = new Headers({
      'Auth-Token': localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    const body = {
      'account_id': parseInt(item.account_id, 10)
   };
    const options = new RequestOptions({ headers: headers });

    return this.http
      .post('https://mcfpayapi.ca/api/v1/mgt/add_settle/', JSON.stringify(body), {headers: headers}
      ).map((response: Response) => {
        return response.json();
      }).catch(this.handleError);
  }
  getMerchantSettlement(page_num) {
    const headers = new Headers({
      'Auth-Token': localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    const body = {
      'page_num': page_num,
      'page_size': 10
   };
    const options = new RequestOptions({ headers: headers });

    return this.http
      .post('https://mcfpayapi.ca/api/v1/mgt/get_merchant_settlement/', JSON.stringify(body), {headers: headers}
      ).map((response: Response) => {
        return response.json();
      }).catch(this.handleError);
  }
  setSettlement(item) {
    const headers = new Headers({
      'Auth-Token': localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    const body = {
      'settle_id': item.settle_id,
      'is_remitted': 1
   };
    const options = new RequestOptions({ headers: headers });

    return this.http
      .post('https://mcfpayapi.ca/api/v1/mgt/set_settlement/', JSON.stringify(body), {headers: headers}
      ).map((response: Response) => {
        return response.json();
      }).catch(this.handleError);
  }
  private handleError(error: Response) {
    return Observable.throw(error.json());
  }
  getMerchantSettlementByid(page_num, id) {
    const headers = new Headers({
      'Auth-Token': localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    const body = {
      'account_id': parseInt(id, 10),
      'page_num': page_num,
      'page_size': 10
   };
    const options = new RequestOptions({ headers: headers });

    return this.http
      .post('https://mcfpayapi.ca/api/v1/mgt/get_merchant_settlement/', JSON.stringify(body), {headers: headers}
      ).map((response: Response) => {
        return response.json();
      }).catch(this.handleError);
  }
}
