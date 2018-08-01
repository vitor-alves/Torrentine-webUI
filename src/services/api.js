import request from '../utils/request';

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function getAllTorrentsStatus() {
  return request('http://localhost:8040/v1.0/torrents//status', {
    headers: { Authorization: 'Basic ' + btoa('test_user' + ':' + 'test_pass') },
  }); // TODO - get ip/port from state
}

export async function getAllTorrentsInfo() {
  return request('http://localhost:8040/v1.0/torrents//info', {
    headers: { Authorization: 'Basic ' + btoa('test_user' + ':' + 'test_pass') },
  }); // TODO - get ip/port from state
}

export async function getAllTorrentsFiles() {
  return request('http://localhost:8040/v1.0/torrents//files', {
    headers: { Authorization: 'Basic ' + btoa('test_user' + ':' + 'test_pass') },
  }); // TODO - get ip/port from state
}

export async function getAllTorrentsPeers() {
  return request('http://localhost:8040/v1.0/torrents//peers', {
    headers: { Authorization: 'Basic ' + btoa('test_user' + ':' + 'test_pass') },
  }); // TODO - get ip/port from state
}

export async function getAllTorrentsTrackers() {
  return request('http://localhost:8040/v1.0/torrents//trackers', {
    headers: { Authorization: 'Basic ' + btoa('test_user' + ':' + 'test_pass') },
  }); // TODO - get ip/port from state
}

export async function getProgramStatus() {
  return request('http://localhost:8040/v1.0/program/status', {
    headers: { Authorization: 'Basic ' + btoa('test_user' + ':' + 'test_pass') },
  }); // TODO - get ip/port from state
}

export async function getProgramSettings() {
  return request('http://localhost:8040/v1.0/program/settings', {
    headers: { Authorization: 'Basic ' + btoa('test_user' + ':' + 'test_pass') },
  }); // TODO - get ip/port from state
}

export async function getAllTorrentsSettings() {
  return request('http://localhost:8040/v1.0/torrents//settings', {
    headers: { Authorization: 'Basic ' + btoa('test_user' + ':' + 'test_pass') },
  }); // TODO - get ip/port from state
}

export async function patchTorrentsSettings(params) {
  return request('http://localhost:8040/v1.0/torrents/settings', {
    method: 'PATCH',
    body: params,
    headers: { Authorization: 'Basic ' + btoa('test_user' + ':' + 'test_pass') },
  }); // TODO - get ip/port from state
}

