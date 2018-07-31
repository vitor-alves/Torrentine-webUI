import { getProgramStatus, getProgramSettings} from '../services/api';

export default {
  namespace: 'program',

  state: {
    program: {
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

      settings: {
            download_rate_limit: 0,
            upload_rate_limit: 0,
            connections_limit: 0,
            active_seeds: 0,
            active_downloads: 0,
            active_limit: 0,
            default_download_path: "."
        },
    },
  },

  effects: {
    *getStatus(_, { call, put }) {
      const data = yield call(getProgramStatus);
      yield put({
        type: 'saveProgramStatus',
        payload: data,
      });
    },

    *getSettings(_, { call, put }) {
      const data = yield call(getProgramSettings);
      yield put({
        type: 'saveProgramSettings',
        payload: data,
      });
    },
  },

  reducers: {
    saveProgramStatus(state, action) {
      let prog = {
        ...action.payload.program,
      };
      for (const key of Object.keys(state.program)) {
        if (key in prog) {
          let { status, ...other_keys } = state.program;
          prog = {
            ...prog,
            ...other_keys,
          };
        }
      }

      return {
        ...state,
        program: prog,
      };
    },

    saveProgramSettings(state, action) {
      let prog = {
        ...action.payload.program,
      };
      for (const key of Object.keys(state.program)) {
        if (key in prog) {
          let { settings, ...other_keys } = state.program;
          prog = {
            ...prog,
            ...other_keys,
          };
        }
      }

      return {
        ...state,
        program: prog,
      };
    },
  },
};
