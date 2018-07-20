import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function getAllTorrentsStatus() {
  return request('http://localhost:8040/v1.0/session/torrents//status', {
    headers: { Authorization: 'Basic ' + btoa('test_user' + ':' + 'test_pass') },
  }); // TODO - get ip/port from state
}

export async function getAllTorrentsFiles() {
  return request('http://localhost:8040/v1.0/session/torrents//files', {
    headers: { Authorization: 'Basic ' + btoa('test_user' + ':' + 'test_pass') },
  }); // TODO - get ip/port from state
}

export async function getAllTorrentsPeers() {
  return request('http://localhost:8040/v1.0/session/torrents//peers', {
    headers: { Authorization: 'Basic ' + btoa('test_user' + ':' + 'test_pass') },
  }); // TODO - get ip/port from state
}

export async function getAllTorrentsTrackers() {
  return request('http://localhost:8040/v1.0/session/torrents//trackers', {
    headers: { Authorization: 'Basic ' + btoa('test_user' + ':' + 'test_pass') },
  }); // TODO - get ip/port from state
}

export async function getSessionStatus() {
  return request('http://localhost:8040/v1.0/session/status', {
    headers: { Authorization: 'Basic ' + btoa('test_user' + ':' + 'test_pass') },
  }); // TODO - get ip/port from state
}
