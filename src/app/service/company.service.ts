import {
Injectable
} from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CompanyService {
  constructor(private http: Http) {

  }
  getMerchants(page_num) {
    const headers = new Headers({
      'Auth-Token': localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({ headers: headers });

    return this.http
      .post('https://mcfpayapi.ca/api/v1/mgt/get_merchants/', {'page_num': page_num, 'page_size': 8}, { headers: headers}
      ).map((response: Response) => {
        return response.json();
      }).catch(this.handleError);
  }
  getMerchantInfo(page_num, category, account_id) {
    const headers = new Headers({
      'Auth-Token': localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    const body = {
      'account_id': parseInt( account_id, 10),
      'category': category,
      'page_num': page_num,
      'page_size': 8
    };
    const options = new RequestOptions({ headers: headers });

    return this.http
      .post('https://mcfpayapi.ca/api/v1/mgt/get_merchant_info/', body, {headers: headers}
      ).map((response: Response) => {
        return response.json();
      }).catch(this.handleError);
  }
  setMerchantInfo(merchantInfo) {
    const headers = new Headers({
      'Auth-Token': localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    const body = {
      'account_id': merchantInfo.account_id,
      'display_name': merchantInfo.display_name,
      'legal_name': merchantInfo.legal_name,
      'contact_person': merchantInfo.contact_person,
      'email': merchantInfo.email,
      'cell': merchantInfo.cell,
      'address': merchantInfo.address,
      'city': merchantInfo.city,
      'province': merchantInfo.province,
      'postal': merchantInfo.postal,
      'timezone': merchantInfo.timezone
    };
    const options = new RequestOptions({ headers: headers });

    return this.http
      .post('https://mcfpayapi.ca/api/v1/mgt/set_merchant_basic/', body, {headers: headers}
      ).map((response: Response) => {
        return response.json();
      }).catch(this.handleError);
  }
  setMerchantContract(contractInfo) {
    // const startTime = contractInfo.start_date.split('/');
    // const endTime = contractInfo.end_date.split('/');
    // contractInfo.start_date = new Date(startTime[2], startTime[0], startTime[1]).getTime();
    // contractInfo.end_date = new Date(endTime[2], endTime[0], endTime[1]).getTime();
    const headers = new Headers({
      'Auth-Token': localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    const body = {
      'account_id': contractInfo.account_id,
      'contract_price': contractInfo.contract_price,
      'tip_mode': contractInfo.tip_mode,
      'remit_min_in_cent': parseInt( contractInfo.remit_min_in_cent, 10),
      'start_date': contractInfo.start_date,
      'end_date': contractInfo.end_date,
      'note': contractInfo.note,
      'bank_instit': contractInfo.bank_instit,
      'bank_transit': contractInfo.bank_transit,
      'bank_account': contractInfo.bank_account,
    };
    const options = new RequestOptions({ headers: headers });

    return this.http
      .post('https://mcfpayapi.ca/api/v1/mgt/set_merchant_contract/', body, {headers: headers}
      ).map((response: Response) => {
        return response.json();
      }).catch(this.handleError);
  }
  setMerchantUser(item) {
    console.log(item);
    const headers = new Headers({
      'Auth-Token': localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    const body = {
      'password': item.password,
      'account_id': parseInt( item.account_id, 10),
      'username': item.username,
      'role': parseInt( item.role, 10),
      'is_deleted': parseInt( item.is_deleted, 10)
    };
    const options = new RequestOptions({ headers: headers });

    return this.http
      .post('https://mcfpayapi.ca/api/v1/mgt/set_merchant_user/', body, {headers: headers}
      ).map((response: Response) => {
        return response.json();
      }).catch(this.handleError);
  }
  setMerchantDevice(item) {
    const headers = new Headers({
      'Auth-Token': localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    const body = {
      'account_id': parseInt( item.account_id, 10),
      'device_id': item.device_id,
      'is_deleted': parseInt( item.is_deleted, 10)
    };
    const options = new RequestOptions({ headers: headers });

    return this.http
      .post('https://mcfpayapi.ca/api/v1/mgt/set_merchant_device/', body, {headers: headers}
      ).map((response: Response) => {
        return response.json();
      }).catch(this.handleError);
  }
  setMerchantChannel(item) {
    if (!item.sub_mch_industry) {
      item.sub_mch_industry = 0;
    }
    const headers = new Headers({
      'Auth-Token': localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    const body = {
      'account_id': parseInt( item.account_id, 10),
      'channel': item.channel,
      'rate': parseInt( item.rate, 10),
      'sub_mch_id': item.sub_mch_id,
      'sub_mch_name': item.sub_mch_name,
      'sub_mch_industry': parseInt( item.sub_mch_industry, 10),
    };
    const options = new RequestOptions({ headers: headers });

    return this.http
      .post('https://mcfpayapi.ca/api/v1/mgt/set_merchant_channel/', body, {headers: headers}
      ).map((response: Response) => {
        return response.json();
      }).catch(this.handleError);
  }
  addNewUser(item) {
    const headers = new Headers({
      'Auth-Token': localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    const body = {
      'password': item.password,
      'account_id': parseInt( item.account_id, 10),
      'username': item.username,
      'role': parseInt(item.role, 10)
    };
    const options = new RequestOptions({ headers: headers });

    return this.http
      .post('https://mcfpayapi.ca/api/v1/mgt/add_merchant_user/', body, {headers: headers}
      ).map((response: Response) => {
        return response.json();
      }).catch(this.handleError);
  }
  addNewDevice(item) {
    const headers = new Headers({
      'Auth-Token': localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    const body = {
      'account_id': parseInt( item.account_id, 10),
      'device_id': item.device_id
    };
    const options = new RequestOptions({ headers: headers });

    return this.http
      .post('https://mcfpayapi.ca/api/v1/mgt/set_merchant_device/', body, {headers: headers}
      ).map((response: Response) => {
        return response.json();
      }).catch(this.handleError);
    }
    addNewMerchant(item) {
    const headers = new Headers({
      'Auth-Token': localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    const body = {
      'merchant_id': item
    };
    const options = new RequestOptions({ headers: headers });

    return this.http
      .post('https://mcfpayapi.ca/api/v1/mgt/create_new_account/', body, {headers: headers}
      ).map((response: Response) => {
        return response.json();
      }).catch(this.handleError);
  }
  setMerchant(item) {
    const headers = new Headers({
      'Auth-Token': localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    const body = {
      'account_id': parseInt( item.account_id, 10),
      'is_deleted': parseInt( item.is_deleted, 10)
    };
    const options = new RequestOptions({ headers: headers });

    return this.http
      .post('https://mcfpayapi.ca/api/v1/mgt/set_account/', body, {headers: headers}
      ).map((response: Response) => {
        return response.json();
      }).catch(this.handleError);
  }
  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

}