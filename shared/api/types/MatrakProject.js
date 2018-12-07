// @flow
export default class MatrakProject {
  id: number;

  name: string;

  address: number;

  owner: number;


  constructor(data) {
    Object.assign(this, data);
  }
}
