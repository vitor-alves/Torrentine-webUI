import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Button,
  Row,
  Col,
  Table,
  Tabs,
  Select,
  Divider,
  Progress,
  Checkbox,
  InputNumber,
  Input,
} from 'antd';
import styles from './TorrentsView.less';

const { TabPane } = Tabs;

const columnsTorrentsStatus = [
  { title: '#', width: 50, dataIndex: 'queue_position', fixed: 'left' },
  { title: 'Name', width: 350, dataIndex: 'name', fixed: 'left' },
  { title: 'Down Speed', dataIndex: 'download_rate', width: 100 },
  { title: 'Down Limit', dataIndex: 'download_limit', width: 120 },
  { title: 'Up Speed', dataIndex: 'upload_rate', width: 100 },
  { title: 'Up Limit', dataIndex: 'upload_limit', width: 100 },
  { title: 'Progress', dataIndex: 'progress', width: 100 },
  { title: 'Down Total', dataIndex: 'total_download', width: 100 },
  { title: 'Seeds', dataIndex: 'num_seeds', width: 100 },
  { title: 'Peers', dataIndex: 'num_peers', width: 100 },
  { title: 'Save Path', dataIndex: 'save_path', width: 1000 },
  { title: 'Tracker', dataIndex: 'current_tracker', width: 1000 },
  { title: 'Added Time', dataIndex: 'added_time', width: 120 },
  { title: 'Active Time', dataIndex: 'active_time', width: 600 },
  { title: 'Finished Time', dataIndex: 'finished_time', width: 600 },
  { title: 'Seeding Time', dataIndex: 'seeding_time', width: 600 },
  { title: 'Info Hash', dataIndex: 'info_hash', width: 1000 },
];

const columnsTorrentsFiles = [
  { title: '#', width: 50, dataIndex: 'index' },
  { title: 'Priority', width: 150, dataIndex: 'priority' },
  { title: 'Path', width: 600, dataIndex: 'path' },
  { title: 'Progress', width: 200, dataIndex: 'progress' },
  { title: 'Total Download', width: 200, dataIndex: 'downloaded_total' },
  { title: 'Size', width: 200, dataIndex: 'size' },
];

const columnsTorrentsPeers = [
  { title: 'Address', width: 150, dataIndex: 'address' },
  { title: 'Client', width: 150, dataIndex: 'client' },
  { title: 'Progress', width: 150, dataIndex: 'progress' },
  { title: 'Down Speed', width: 150, dataIndex: 'down_speed' },
  { title: 'Up Speed', width: 150, dataIndex: 'up_speed' },
];

const columnsTorrentsTrackers = [
  { title: 'Tier', width: 75, dataIndex: 'tier' },
  { title: 'URL', width: 600, dataIndex: 'url' },
  { title: 'Next Announce', width: 150, dataIndex: 'next_announce' },
  { title: 'Working', width: 150, dataIndex: 'is_working' },
  { title: 'Message', width: 400, dataIndex: 'message' },
];

@connect(({ torrents, program }) => ({
  torrents,
  program,
}))
export default class TorrentView extends Component {
  state = {
    selected_torrent_settings: {
      download_limit: 0,
      upload_limit: 0,
      sequential_download: false,
    },
  };

  componentDidMount() {
    const torrentStatusUpdateTime = 3000; // TODO - This should be in store

    // TODO - Put this inside the respective components. Only send calls to the api (dispatch) when component is visible.
    // No need to keep GETing peers when the peer table is not in the screen.
    this.torrentStatusInverval = setInterval(() => {
      const { dispatch } = this.props;
      dispatch({
        type: 'torrents/getStatus',
      });
      dispatch({
        type: 'torrents/getInfo',
      });
      dispatch({
        type: 'torrents/getFiles',
      });
      dispatch({
        type: 'torrents/getPeers',
      });
      dispatch({
        type: 'torrents/getTrackers',
      });
      dispatch({
        type: 'torrents/getSettings',
      });
      dispatch({
        type: 'program/getStatus',
      });
      dispatch({
        type: 'program/getSettings',
      });
    }, torrentStatusUpdateTime);
  }

  componentWillUnmount() {
    clearInterval(this.torrentStatusInverval);
  }

  torrentsTableClick(record, index) {
    const { dispatch } = this.props;
    const { torrents } = this.props;

    dispatch({
      type: 'torrents/setLastSelectedRow',
      payload: index,
    });

    const id = torrents.data_torrents_status[index].id;
    let t = torrents.torrentsList[id];
    if (typeof t !== 'undefined' && t.settings !== 'undefined') {
      this.setState({
        selected_torrent_settings: {
          download_limit: t.settings.download_limit,
          upload_limit: t.settings.upload_limit,
          sequential_download: t.settings.sequential_download,
        },
      });
    }
  }

  handleAppleSettingsClick() {
    const { dispatch, torrents } = this.props;
    dispatch({
      type: 'torrents/patchSettings',
      payload: {
        torrents: {
          [torrents.lastSelectedId]: { settings: this.state.selected_torrent_settings },
        },
      },
    });
  }

  render() {
    const { torrents } = this.props;

    return (
      <Fragment>
        <Row gutter={24}>
          <Table
            className={styles.torrentsTable}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.torrentsTableClick(record, index);
                },
              };
            }}
            rowClassName={(record, index) => {
              if (torrents.lastSelectedRow === index) return 'ant-table-row-selected';
              else return '';
            }}
            size="small"
            bordered
            columns={columnsTorrentsStatus}
            dataSource={torrents.data_torrents_status}
            scroll={{ x: 9000, y: 400 }}
            pagination={false}
          />
        </Row>

        <Row gutter={24}>
          <div>
            <Tabs>
              <TabPane tab="Details" key="Details">
                <div>
                  <Row>
                    <Col span={24}>
                      <Progress percent={torrents.data_torrents_details.progress} />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6}>
                      <p> Total Download: {torrents.data_torrents_details.total_download}</p>
                      <p> Download Speed: {torrents.data_torrents_details.download_rate}</p>
                      <p> Download Limit: {torrents.data_torrents_details.download_limit}</p>
                      <p> Share Ratio: {torrents.data_torrents_details.ratio}</p>
                    </Col>
                    <Col span={6}>
                      <p> Total Upload: {torrents.data_torrents_details.total_upload}</p>
                      <p> Upload Speed: {torrents.data_torrents_details.upload_rate}</p>
                      <p> Upload Limit: {torrents.data_torrents_details.upload_limit}</p>
                      <p> Next announce: {torrents.data_torrents_details.next_announce}</p>
                    </Col>
                    <Col span={6}>
                      <p> ETA: {torrents.data_torrents_details.eta}</p>
                      <p> Active Time: {torrents.data_torrents_details.active_time}</p>
                      <p> Seeding Time: {torrents.data_torrents_details.seeding_time}</p>
                      <p> Finished Time: {torrents.data_torrents_details.finished_time}</p>
                    </Col>
                    <Col span={6}>
                      <p> Seeds: {torrents.data_torrents_details.num_seeds}</p>
                      <p> Peers: {torrents.data_torrents_details.num_peers}</p>
                      <p> Availability: {torrents.data_torrents_details.distributed_copies}</p>
                      <p> Current Tracker: {torrents.data_torrents_details.current_tracker}</p>
                    </Col>
                  </Row>
                  <Divider orientation="left">Information</Divider>
                  <Row>
                    <Col span={6}>
                      <p> Total Size: {torrents.data_torrents_info.total_size}</p>
                      <p> Save Path: {torrents.data_torrents_details.save_path}</p>
                    </Col>
                    <Col span={6}>
                      <p> Pieces: {torrents.data_torrents_info.num_pieces} ({torrents.data_torrents_info.piece_length})</p>
                      <p> Info Hash: {torrents.data_torrents_info.info_hash}</p>
                    </Col>
                    <Col span={6}>
                      <p> Created By: {torrents.data_torrents_info.creator}</p>
                      <p> Created On: {torrents.data_torrents_info.creation_date}</p>
                    </Col>
                    <Col span={6}>
                      <p> Added On: {torrents.data_torrents_details.added_time}</p>
                      <p> Completed On: {torrents.data_torrents_details.completed_time}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6}>
                      <p> Private: {torrents.data_torrents_info.priv}</p>
                    </Col>
                    <Col span={18}>
                      <p> Comments: {torrents.data_torrents_info.comment}</p>
                    </Col>
                  </Row>
                </div>
              </TabPane>
              <TabPane tab="Files" key="Files">
                <Table
                  size="small"
                  columns={columnsTorrentsFiles}
                  dataSource={torrents.data_torrents_files}
                  scroll={{ x: 1000, y: 200 }}
                  bordered
                  pagination={false}
                />
              </TabPane>
              <TabPane tab="Peers" key="Peers">
                <Table
                  size="small"
                  columns={columnsTorrentsPeers}
                  dataSource={torrents.data_torrents_peers}
                  scroll={{ x: 1000, y: 200 }}
                  bordered
                  pagination={false}
                />
              </TabPane>
              <TabPane tab="Trackers" key="Trackers">
                <Table
                  size="small"
                  columns={columnsTorrentsTrackers}
                  dataSource={torrents.data_torrents_trackers}
                  scroll={{ x: 1000, y: 200 }}
                  bordered
                  pagination={false}
                />
              </TabPane>
              <TabPane tab="Settings" key="Settings">
                <Row>
                  <Col span={6}>
                    <div>
                      <Input
                        addonBefore="Download Speed Limit"
                        addonAfter="KB/s"
                        value={this.state.selected_torrent_settings.download_limit}
                        onChange={e => {
                          this.setState({
                            selected_torrent_settings: {
                              ...this.state.selected_torrent_settings,
                              download_limit: parseInt(e.target.value, 10),
                            },
                          });
                        }}
                      />
                    </div>

                    <div>
                      <Input
                        addonBefore="Upload Speed Limit"
                        addonAfter="KB/s"
                        value={this.state.selected_torrent_settings.upload_limit}
                        onChange={e => {
                          this.setState({
                            selected_torrent_settings: {
                              ...this.state.selected_torrent_settings,
                              upload_limit: parseInt(e.target.value, 10),
                            },
                          });
                        }}
                      />
                    </div>

                    <div>
                      <Checkbox
                        checked={this.state.selected_torrent_settings.sequential_download}
                        onChange={() => {
                          this.setState({
                            selected_torrent_settings: {
                              ...this.state.selected_torrent_settings,
                              sequential_download: !this.state.selected_torrent_settings
                                .sequential_download,
                            },
                          });
                        }}
                      >
                        Sequential download
                      </Checkbox>
                    </div>

                    <Button onClick={this.handleAppleSettingsClick.bind(this)}>
                      {' '}
                      Apple settings{' '}
                    </Button>
                  </Col>
                  <Col span={6} />
                  <Col span={6} />
                  <Col span={6} />
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </Row>
      </Fragment>
    );
  }
}
