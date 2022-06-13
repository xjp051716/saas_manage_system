import request from "./axios";

const apiHead = '/v2/company';
const apis = {
  login(data) {
    return request(apiHead + '/login/', 'post', data)
  },
  getSimpleSelect(url, data, type) {
    return request(`${apiHead}${url}/`, type, data)
  },
  getIndex(data) {
    return request(apiHead + '/index_head/', 'get', data)
  },
  getFoldLine(data) {
    return request(apiHead + '/index_fold_line/', 'post', data)
  },
  merchantExamine(data) {
    return request(apiHead + '/merchant_examine/', 'post', data)
  },
  merchantAdd(data) {
    return request(apiHead + '/merchant/', 'post', data)
  },
  merchantDetail(data) {
    return request(apiHead + `/merchant/${data}/`, 'get')
  },
  merchantDel(data) {
    return request(apiHead + `/merchant/${data}/`, 'delete')
  },
  merchantUpdate(data) {
    return request(apiHead + `/merchant/${data.id}/`, 'put', data)
  },
  menu() {
    return request(apiHead + '/menu/', 'get')
  },
  menuAdd(data) {
    return request(apiHead + '/menu/', 'post', data)
  },
  modularity(data) {
    return request(apiHead + '/modularity/', 'get', data)
  },
  modularityAdd(data) {
    return request(apiHead + '/modularity/', 'post', data)
  },
  modularityDetail(data) {
    return request(apiHead + `/modularity/${data}/`, 'get')
  },
  modularityUpdate(data) {
    return request(apiHead + `/modularity/${data.id}/`, 'put', data)
  },
  modularityDel(data) {
    return request(apiHead + `/modularity/${data}/`, 'delete')
  }
}

export default apis