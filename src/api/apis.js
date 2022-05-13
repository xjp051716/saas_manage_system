import request from "./axios";

const apiHead = '/v2/admin';
const apis = {
  login(data) {
    return request(apiHead + '/user_login', data)
  },
  getSimpleSelect(url, data, type) {
    return request(`${apiHead}${url}`, data , type)
  },
  getIndex(data) {
    return request(apiHead + '/index', data)
  }
  
}

export default apis