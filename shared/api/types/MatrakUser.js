// @flow
//import api from '../api';
//import { MatrakCompany } from '../matrakDataTypes';

class Name {
  givenName: string;

  familyName: string;

  fullName: string;
}

export default class MatrakUser {
  id: number;

  auth: string;

  name: Name;

  primaryEmail: number;

  companyProjectID: number;

  companyID: number;

  //company: MatrakCompany;

  constructor(data) {
    Object.assign(this, data);
  }

  // async getCompany() {
  //   return this.company || api.getCompany(this.companyID);
  // }

}
