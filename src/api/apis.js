import request from "./axios";

const apiHead = '/api';
const apis = {
  login(data) {
    return  request(apiHead + '/login', data)
  }
}

export default apis