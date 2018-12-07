// @flow
import { MatrakUser } from './matrakDataTypes';
import Config from '../config';


const routes = {
  LOGIN: 'login',
  USER_INFO: 'getuserinfo',
  COMPANY: 'companies',
  USER: 'users',
};

function constructURL(endpoint: string) {
  return `${Config.BASE_URL}${endpoint}`;
}

function queryString(params) {
  const esc = encodeURIComponent;
  return Object.keys(params).map(k => `${esc(k)}=${esc(params[k])}`).join('&');
}

async function post(endpoint: string, Type: constructor, params: object) {
  console.log('post endpoint',endpoint)
  const url = constructURL(params ? `${endpoint}?${queryString(params)}` : endpoint);
  const response = await fetch(url, { method: 'POST' })
  if (!response.ok) throw new Error(response.statusCode);
  const json = response.json();  
  let tt= Type ? await json.then(data =>{ 
    console.log('hggggjhg',data);  
    if(data===0){ 
      console.log('in iffffff')
      return data} else{ 
        console.log('ineeeeeeel')
        return new Type(data)}
  })  : await json;
  console.log('jsondata tt')
  console.log(tt)
  return tt;}

async function get(endpoint: string, type: constructor, params: object) {
  return fetch(
    constructURL(params ? `${endpoint}?${queryString(params)}` : endpoint),
  ).then((response) => {
    if (!response.ok) throw Error(response.statusText);
  });
}

export default {

  async login(user: string, pass: string): Promise<MatrakUser> {
    return await post(`${routes.LOGIN}`, MatrakUser, { user, pass,compress:'false' });
  },

  // async getCompany(companyID: number): Promise<MatrakCompany> {
  //   return await get(routes.COMPANY, MatrakCompany, { companyID });
  // },

  async resetPassword(email: string): Promise<void> {
    return await post(`${routes.USER}/${email}/reset_password`);
  },

};
