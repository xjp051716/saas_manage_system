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
  },
  userList(data) {
    return request(apiHead + '/user/', 'get', data)
  },
  userAdd(data) {
    return request(apiHead + '/user/', 'post', data)
  },
  userDetail(data) {
    return request(apiHead + `/user/${data}/`, 'get')
  },
  userUpdate(data) {
    return request(apiHead + `/user/${data.id}/`, 'put', data)
  },
  userDel(data) {
    return request(apiHead + `/user/${data}/`, 'delete')
  },
  noticeList(data) {
    return request(apiHead + '/notice/', 'get', data)
  },
  noticeAdd(data) {
    return request(apiHead + '/notice/', 'post', data)
  },
  noticeDetail(data) {
    return request(apiHead + `/notice/${data}/`, 'get')
  },
  noticeUpdate(data) {
    return request(apiHead + `/notice/${data.id}/`, 'put', data)
  },
  noticeDel(data) {
    return request(apiHead + `/notice/${data}/`, 'delete')
  },
  vip_template(data) {
    return request(apiHead + '/vip_template/', 'post', data)
  },
  cardTemplateQuery(data) {
    return request(apiHead + '/card_template_query/', 'post', data)
  },
  cardTemplateSet(data) {
    return request(apiHead + '/card_template_create/', 'post', data)
  },
  cardTemplateModify(data) {
    return request(apiHead + '/card_template_modify/', 'post', data)
  },
  fileUpload(data) {
    return request(apiHead + '/file_upload/', 'post', data)
  },
  cardFormTemplate(data) {
    return request(apiHead + '/card_form_template_set/', 'post', data)
  },
  getAliCardUrl(data) {
    return request(apiHead + '/ali_card_activate_url/', 'post', data)
  },
  miniVersionUpload(data) {
    return request(apiHead + '/mini_version_upload/', 'post', data)
  },
  miniVersionAudit(data) {
    return request(apiHead + `/mini_version_audit_apply/${data.id}`, 'post', data)
  }
}

export default apis