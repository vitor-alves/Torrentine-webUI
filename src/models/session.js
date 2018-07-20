import { getSessionStatus } from '../services/api';

export default {
  namespace: 'session',

  state: {
    session: {
      // TODO - initializing like this is useful to avoid 'undefined errors'. Do the same to other states like torrent stats.
      status: {
        has_incoming_connections: false,
        upload_rate: 0,
        download_rate: 0,
        total_download: 0,
        total_upload: 0,
        total_payload_download: 0,
        total_payload_upload: 0,
        payload_download_rate: 0,
        payload_upload_rate: 0,
        ip_overhead_upload_rate: 0,
        ip_overhead_download_rate: 0,
        ip_overhead_upload: 0,
        ip_overhead_download: 0,
        dht_upload_rate: 0,
        dht_download_rate: 0,
        dht_nodes: 0,
        dht_upload: 0,
        dht_download: 0,
        tracker_upload_rate: 0,
        tracker_download_rate: 0,
        tracker_upload: 0,
        tracker_download: 0,
        num_peers_connected: 0,
        num_peers_half_open: 0,
        total_peers_connections: 0,
      },
    },
  },

  effects: {
    *getStatus(_, { call, put }) {
      const data = yield call(getSessionStatus);
      yield put({
        type: 'saveSessionStatus',
        payload: data,
      });
    },
  },

  reducers: {
    saveSessionStatus(state, action) {
      let ses = {
        ...action.payload.session,
      };
      for (const key of Object.keys(state.session)) {
        if (key in ses) {
          let { status, ...other_keys } = state.session;
          ses = {
            ...ses,
            ...other_keys,
          };
        }
      }

      return {
        ...state,
        session: ses,
      };
    },
  },
};
