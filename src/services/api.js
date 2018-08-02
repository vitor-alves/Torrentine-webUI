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

export async function deleteTorrents(params) {
  return request('http://localhost:8040/v1.0/torrents/'+params, { // INFO: params is a sequence of ids in format 1,2,3....
    method: 'DELETE',
    headers: { Authorization: 'Basic ' + btoa('test_user' + ':' + 'test_pass') },
  }); // TODO - get ip/port from state
}

export async function stopTorrents(params) {
  return request('http://localhost:8040/v1.0/torrents/'+params+'/stop', { // INFO: params is a sequence of ids in format 1,2,3....
    method: 'PATCH',
    headers: { Authorization: 'Basic ' + btoa('test_user' + ':' + 'test_pass') },
  }); // TODO - get ip/port from state
}

export async function patchStartTorrents(params) {
  return request('http://localhost:8040/v1.0/torrents/'+params+'/start', { // INFO: params is a sequence of ids in format 1,2,3....
    method: 'PATCH',
    headers: { Authorization: 'Basic ' + btoa('test_user' + ':' + 'test_pass') },
  }); // TODO - get ip/port from state
}

export async function patchQueueTorrent(params) {
  return request('http://localhost:8040/v1.0/queue/torrents/'+params.id, { // INFO: params is a sequence of ids in format 1,2,3....
    method: 'PATCH',
    body: params,
    headers: { Authorization: 'Basic ' + btoa('test_user' + ':' + 'test_pass') },
  }); // TODO - get ip/port from state
}

