import {
  getAllTorrentsStatus,
  getAllTorrentsInfo,
  getAllTorrentsFiles,
  getAllTorrentsPeers,
  getAllTorrentsTrackers,
  getAllTorrentsSettings,
  patchTorrentsSettings,
  deleteTorrents,
  stopTorrents,
  patchStartTorrents,
  patchQueueTorrent,
} from '../services/api';

export default {
  namespace: 'torrents',

  state: {
    torrentsList: {},
    data_torrents_files: [],
    data_torrents_info: {},
    data_torrents_peers: [],
    data_torrents_trackers: [],
    data_torrents_status: [],
    data_torrents_details: {},
    data_torrents_settings: {},
    lastSelectedRow: -1,
    lastSelectedId: -1,
    selectedFilters: [],
  },

  effects: {
    *getStatus(_, { call, put }) {
      const data = yield call(getAllTorrentsStatus);
      yield put({
        type: 'saveAllTorrentsStatus',
        payload: data,
      });

      yield put({
        type: 'changeSelectedTorrentDetails',
      });
    },

    *getInfo(_, { call, put }) {
      const data = yield call(getAllTorrentsInfo);
      yield put({
        type: 'saveAllTorrentsInfo',
        payload: data,
      });

      yield put({
        type: 'changeSelectedTorrentInfo',
      });
    },

    *getFiles(_, { call, put }) {
      const data = yield call(getAllTorrentsFiles);
      yield put({
        type: 'saveAllTorrentsFiles',
        payload: data,
      });

      yield put({
        type: 'changeSelectedTorrentFiles',
      });
    },

    *getPeers(_, { call, put }) {
      const data = yield call(getAllTorrentsPeers);
      yield put({
        type: 'saveAllTorrentsPeers',
        payload: data,
      });

      yield put({
        type: 'changeSelectedTorrentPeers',
      });
    },

    *getTrackers(_, { call, put }) {
      const data = yield call(getAllTorrentsTrackers);
      yield put({
        type: 'saveAllTorrentsTrackers',
        payload: data,
      });

      yield put({
        type: 'changeSelectedTorrentTrackers',
      });
    },

    *getSettings(_, { call, put }) {
      const data = yield call(getAllTorrentsSettings);
      yield put({
        type: 'saveAllTorrentsSettings',
        payload: data,
      });

      yield put({
        type: 'changeSelectedTorrentSettings',
      });
    },

    *patchSettings({ payload }, { call, put }) {
      const response = yield call(patchTorrentsSettings, payload);
      console.log(response);
    },

    *setLastSelectedRow({ payload }, { call, put }) {
      yield put({
        type: 'saveLastSelectedRow',
        payload: payload,
      });

      yield put({
        type: 'changeSelectedTorrentTrackers',
      });

      yield put({
        type: 'changeSelectedTorrentFiles',
      });

      yield put({
        type: 'changeSelectedTorrentPeers',
      });

      yield put({
        type: 'changeSelectedTorrentDetails',
      });

      yield put({
        type: 'changeSelectedTorrentSettings',
      });

      yield put({
        type: 'changeSelectedTorrentInfo',
      });
    },

    *addSelectedFilter({ payload }, { call, put }) {
      yield put({
        type: 'insertSelectedFilter',
        payload: payload,
      });
    },

    *delSelectedFilter({ payload }, { call, put }) {
      yield put({
        type: 'removeSelectedFilter',
        payload: payload,
      });
    },

    *removeTorrents({ payload }, { call, put }) {
      const response = yield call(deleteTorrents, payload);
    },

    *pauseTorrents({ payload }, { call, put }) {
      const response = yield call(stopTorrents, payload);
      console.log(response);
    },

    *startTorrents({ payload }, { call, put }) {
      const response = yield call(patchStartTorrents, payload);
      console.log(response);
    },

    *setQueueTorrent({ payload }, { call, put }) {
      const response = yield call(patchQueueTorrent, payload);
      console.log(response);
    },

  },

  reducers: {
    saveAllTorrentsStatus(state, action) {
      // INFO: This will delete any existing torrents in torrentsList that is not in
      // the request json torrents list.
      let tList = {
        ...action.payload.torrents,
      };
      for (const key of Object.keys(state.torrentsList)) {
        if (key in tList) {
          let { status, ...other_keys } = state.torrentsList[key];
          tList[key] = {
            ...tList[key],
            ...other_keys,
          };
        }
      }

      let dtorrents_status = [];
      for (let t in tList) {
        //console.log(i);
        dtorrents_status.push({
          key: t,
          id: t,
          queue_position: tList[t].status.queue_position,
          name: tList[t].status.name,
          download_rate: tList[t].status.download_rate,
          download_limit: tList[t].status.download_limit,
          upload_rate: tList[t].status.upload_rate,
          upload_limit: tList[t].status.upload_limit,
          progress: tList[t].status.progress,
          total_download: tList[t].status.total_download,
          num_seeds: tList[t].status.num_seeds,
          num_peers: tList[t].status.num_peers,
          save_path: tList[t].status.save_path,
          current_tracker: tList[t].status.current_tracker,
          added_time: tList[t].status.added_time,
          active_time: tList[t].status.active_time,
          finished_time: tList[t].status.finished_time,
          seeding_time: tList[t].status.seeding_time,
          info_hash: tList[t].status.info_hash,
        });
      }

      return {
        ...state,
        torrentsList: tList,
        data_torrents_status: dtorrents_status,
      };
    },

    saveAllTorrentsInfo(state, action) {
      // INFO: This will delete any existing torrents in torrentsList that is not in
      // the request json torrents list.
      let tList = {
        ...action.payload.torrents,
      };
      for (const key of Object.keys(state.torrentsList)) {
        if (key in tList) {
          let { info, ...other_keys } = state.torrentsList[key];
          tList[key] = {
            ...tList[key],
            ...other_keys,
          };
        }
      }

      return {
        ...state,
        torrentsList: tList,
      };
    },

    saveAllTorrentsFiles(state, action) {
      // INFO: This will delete any existing torrents in torrentsList that is not in
      // the request json torrents list.
      let tList = {
        ...action.payload.torrents,
      };
      for (const key of Object.keys(state.torrentsList)) {
        if (key in tList) {
          let { files, ...other_keys } = state.torrentsList[key];
          tList[key] = {
            ...tList[key],
            ...other_keys,
          };
        }
      }

      return {
        ...state,
        torrentsList: tList,
      };
    },

    changeSelectedTorrentFiles(state, action) {
      const dtorrents_files = [];
      const id = state.data_torrents_status[state.lastSelectedRow].id;
      let t = state.torrentsList[id];
      if (typeof t !== 'undefined') {
        for (let f in t.files) {
          dtorrents_files.push({
            key: f,
            index: f,
            path: t.files[f].path,
            name: t.files[f].name,
            progress: t.files[f].progress,
            downloaded_total: t.files[f].downloaded_total,
            size: t.files[f].size,
            priority: t.files[f].priority,
          });
        }
      }

      return {
        ...state,
        data_torrents_files: dtorrents_files,
      };
    },

    saveAllTorrentsPeers(state, action) {
      // INFO: This will delete any existing torrents in torrentsList that is not in
      // the request json torrents list.
      let tList = {
        ...action.payload.torrents,
      };
      for (const key of Object.keys(state.torrentsList)) {
        if (key in tList) {
          let { peers, ...other_keys } = state.torrentsList[key];
          tList[key] = {
            ...tList[key],
            ...other_keys,
          };
        }
      }

      return {
        ...state,
        torrentsList: tList,
      };
    },

    changeSelectedTorrentPeers(state, action) {
      const dtorrents_peers = [];
      const id = state.data_torrents_status[state.lastSelectedRow].id;
      let t = state.torrentsList[id];
      if (typeof t !== 'undefined') {
        for (let p in t.peers) {
          dtorrents_peers.push({
            key: p,
            index: p,
            address: t.peers[p].ip + ':' + t.peers[p].port,
            client: t.peers[p].client,
            progress: t.peers[p].progress,
            down_speed: t.peers[p].down_speed,
            up_speed: t.peers[p].up_speed,
          });
        }
      }

      return {
        ...state,
        data_torrents_peers: dtorrents_peers,
      };
    },

    saveAllTorrentsTrackers(state, action) {
      // INFO: This will delete any existing torrents in torrentsList that is not in
      // the request json torrents list.
      let tList = {
        ...action.payload.torrents,
      };
      for (const key of Object.keys(state.torrentsList)) {
        if (key in tList) {
          let { trackers, ...other_keys } = state.torrentsList[key];
          tList[key] = {
            ...tList[key],
            ...other_keys,
          };
        }
      }

      return {
        ...state,
        torrentsList: tList,
      };
    },

    changeSelectedTorrentTrackers(state, action) {
      const dtorrents_trackers = [];
      const id = state.data_torrents_status[state.lastSelectedRow].id;
      let t = state.torrentsList[id];
      if (typeof t !== 'undefined') {
        for (let p in t.trackers) {
          var is_working_string = t.trackers[p].is_working.toString();
          dtorrents_trackers.push({
            key: p,
            index: p,
            tier: t.trackers[p].tier,
            url: t.trackers[p].url,
            min_announce: t.trackers[p].min_announce,
            next_announce: t.trackers[p].next_announce,
            is_working: is_working_string,
            message: t.trackers[p].message,
          });
        }
      }

      return {
        ...state,
        data_torrents_trackers: dtorrents_trackers,
      };
    },

    saveAllTorrentsSettings(state, action) {
      // INFO: This will delete any existing torrents in torrentsList that is not in
      // the request json torrents list.
      let tList = {
        ...action.payload.torrents,
      };
      for (const key of Object.keys(state.torrentsList)) {
        if (key in tList) {
          let { settings, ...other_keys } = state.torrentsList[key];
          tList[key] = {
            ...tList[key],
            ...other_keys,
          };
        }
      }

      return {
        ...state,
        torrentsList: tList,
      };
    },

    changeSelectedTorrentSettings(state, action) {
      const dtorrents_settings = {};
      const id = state.data_torrents_status[state.lastSelectedRow].id;
      let t = state.torrentsList[id];
      if (typeof t !== 'undefined') {
        dtorrents_settings.upload_limit = t.settings.upload_limit;
        dtorrents_settings.download_limit = t.settings.download_limit;
        dtorrents_settings.sequential_download = t.settings.sequential_download;
      }

      return {
        ...state,
        data_torrents_settings: dtorrents_settings,
      };
    },

    saveLastSelectedRow(state, action) {
      // TODO - change the name for save lastSelectedInfo
      console.log(action);
      return {
        ...state,
        lastSelectedRow: action.payload,
        lastSelectedId: state.data_torrents_status[action.payload].id,
      };
    },

    changeSelectedTorrentDetails(state, action) {
      var dtorrents_details = {};
      const id = state.data_torrents_status[state.lastSelectedRow].id;
      let t = state.torrentsList[id];
      if (typeof t !== 'undefined' && typeof t.status !== 'undefined') {
        /*dtorrents_details.total_download = t.status.total_download;
        dtorrents_details.download_rate = t.status.download_rate;
        dtorrents_details.download_limit = t.status.download_limit;
        dtorrents_details.ratio = t.status.total_upload / t.status.total_download;
        dtorrents_details.next_announce = t.status.next_announce;
        dtorrents_details.total_upload = t.status.total_upload;
        dtorrents_details.upload_rate = t.status.upload_rate;
        dtorrents_details.upload_limit = t.status.upload_limit;
        dtorrents_details.eta = 999; // TODO
        dtorrents_details.active_time = t.status.active_time;
        dtorrents_details.seeding_time = t.status.seeding_time;
        dtorrents_details.finished_time = t.status.finished_time;
        dtorrents_details.num_seeds = t.status.num_seeds;
        dtorrents_details.num_peers = t.status.num_peers;
        dtorrents_details.distributed_copies = t.status.distributed_copies;
        dtorrents_details.current_tracker = t.status.current_tracker;
        dtorrents_details.progress = (t.status.progress * 100).toFixed(1); */
        dtorrents_details = {
          ...t.status,
          progress: (t.status.progress * 100).toFixed(1),
          ratio: t.status.total_upload / t.status.total_download,
          eta: 999, // TODO
        };
      }

      return {
        ...state,
        data_torrents_details: dtorrents_details,
      };
    },

    changeSelectedTorrentInfo(state, action) {
      var dtorrents_info = {};
      let t = state.torrentsList[state.lastSelectedId];
      if (typeof t !== 'undefined' && typeof t.info !== 'undefined') {
        dtorrents_info = { ...t.info }; // TODO - use the spread operator like this in other functions in the file. Its better this way.
      }

      return {
        ...state,
        data_torrents_info: dtorrents_info,
      };
    },

    insertSelectedFilter(state, action) {
      const selectedFilters = [...state.selectedFilters];
      selectedFilters.push(action.payload);

      return {
        ...state,
        selectedFilters: selectedFilters,
      };
    },

    insertSelectedFilter(state, action) {
      const selectedFilters = [...state.selectedFilters];
      selectedFilters.push(action.payload);

      return {
        ...state,
        selectedFilters: selectedFilters,
      };
    },

    removeSelectedFilter(state, action) {
      const selectedFilters = [...state.selectedFilters];
      selectedFilters.splice(action.payload, 1);

      return {
        ...state,
        selectedFilters: selectedFilters,
      };
    },
  },
};
