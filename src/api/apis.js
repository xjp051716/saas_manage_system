import request from "./axios";

const apiHead = '/api';
const apis = {
  login(data) {
    return request(apiHead + '/login', data)
  },
  getSimpleSelect(url, data, type) {
    return request(`${apiHead}${url}`, data , type)
  },
  getIndex(data) {
    return request(apiHead + '/index', data)
  }
  
}

export default apis