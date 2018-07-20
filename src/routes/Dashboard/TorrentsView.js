import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Table, Tabs, Select, Divider, Progress, Checkbox, InputNumber } from 'antd';
import styles from './TorrentsView.less';
import StatusBar from 'components/StatusBar';
import TorrentsTable from 'components/TorrentsTable';

const { TabPane } = Tabs;

const columns_torrents_status = [
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

const columns_torrents_files = [
  { title: '#', width: 50, dataIndex: 'index' },
  { title: 'Priority', width: 150, dataIndex: 'priority' },
  { title: 'Path', width: 600, dataIndex: 'path' },
  { title: 'Progress', width: 200, dataIndex: 'progress' },
  { title: 'Total Download', width: 200, dataIndex: 'downloaded_total' },
  { title: 'Size', width: 200, dataIndex: 'size' },
];

const columns_torrents_peers = [
  { title: 'Address', width: 150, dataIndex: 'address' },
  { title: 'Client', width: 150, dataIndex: 'client' },
  { title: 'Progress', width: 150, dataIndex: 'progress' },
  { title: 'Down Speed', width: 150, dataIndex: 'down_speed' },
  { title: 'Up Speed', width: 150, dataIndex: 'up_speed' },
];

const columns_torrents_trackers = [
  { title: 'Tier', width: 75, dataIndex: 'tier' },
  { title: 'URL', width: 600, dataIndex: 'url' },
  { title: 'Next Announce', width: 150, dataIndex: 'next_announce' },
  { title: 'Working', width: 150, dataIndex: 'is_working' },
  { title: 'Message', width: 400, dataIndex: 'message' },
];

@connect(({ torrents, session }) => ({
  torrents,
  session,
}))
export default class TorrentView extends Component {
  state = {};

  componentDidMount() {
    var torrentStatusUpdateTime = 3000; // TODO - This should be in store

    // TODO - Put this inside the respective components. Only send calls to the api (dispatch) when component is mounted.
    // No need to keep GETing peers when the peer table is not in the screen.
    this.torrentStatusInverval = setInterval(() => {
      const { dispatch } = this.props;
      dispatch({
        type: 'torrents/getStatus',
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
        type: 'session/getStatus',
      });
    }, torrentStatusUpdateTime);
  }

  componentWillUnmount() {
    clearInterval(this.torrentStatusInverval);
  }

  torrents_table_click(record, index) {
    //console.log(record, index);
    //this.props.torrents.lastSelectedRow = index; // TODO - this is NOT the correct way to set the state. Use dispatch or setState. Im not sure.
    //this.forceUpdate();
    const { dispatch } = this.props;
    dispatch({
      type: 'torrents/setLastSelectedRow',
      payload: index,
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
                onClick: e => {
                  console.log(e);
                  this.torrents_table_click(record, index);
                }, // click row
              };
            }}
            rowClassName={(record, index) => {
              if (this.props.torrents.lastSelectedRow === index) return 'ant-table-row-selected';
              else return '';
            }}
            size={'small'}
            bordered={true}
            columns={columns_torrents_status}
            dataSource={torrents.data_torrents_status}
            scroll={{ x: 9000, y: 400 }}
            pagination={false}
          />
        </Row>

        <Row gutter={24}>
          <div>
            <Tabs>
              <TabPane tab="Details" key="1">
                <div>
                  <Row>
                    <Col span={24}>
                      <Progress percent={torrents.data_torrents_details.progress} status="active" />
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
                      <p> Total Size: 999</p>
                      <p> Save Path: 999</p>
                    </Col>
                    <Col span={6}>
                      <p> Pieces: 99 (8MB)</p>
                      <p> Info Hash: 999</p>
                    </Col>
                    <Col span={6}>
                      <p> Created By: abc</p>
                      <p> Created On: abc</p>
                    </Col>
                    <Col span={6}>
                      <p> Added On: 999</p>
                      <p> Completed On: 999</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6}>
                      <p> Private: no</p>
                    </Col>
                    <Col span={18}>
                      <p> Comments: abc</p>
                    </Col>
                  </Row>
                </div>
              </TabPane>
              <TabPane tab="Files" key="2">
                <Table
                  size={'small'}
                  columns={columns_torrents_files}
                  dataSource={torrents.data_torrents_files}
                  scroll={{ x: 1000, y: 200 }}
                  bordered={true}
                  pagination={false}
                />
              </TabPane>
              <TabPane tab="Peers" key="3">
                <Table
                  size={'small'}
                  columns={columns_torrents_peers}
                  dataSource={torrents.data_torrents_peers}
                  scroll={{ x: 1000, y: 200 }}
                  bordered={true}
                  pagination={false}
                />
              </TabPane>
              <TabPane tab="Trackers" key="4">
                <Table
                  size={'small'}
                  columns={columns_torrents_trackers}
                  dataSource={torrents.data_torrents_trackers}
                  scroll={{ x: 1000, y: 200 }}
                  bordered={true}
                  pagination={false}
                />
              </TabPane>
              <TabPane tab="Settings" key="5">
                <Row>
                  <Col span={24}>
                    <Progress percent={50} status="active" />
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <div>
                      <Checkbox>Sequential download</Checkbox>{' '}
                    </div>

                    <div>
                      {' '}
                      <Checkbox>Auto managed</Checkbox>
                    </div>
                    <div>
                      {' '}
                      Download Speed Limit <InputNumber min={-1} defaultValue={99} />{' '}
                    </div>

                    <div>
                      {' '}
                      Upload Speed Limit <InputNumber min={-1} defaultValue={99} />{' '}
                    </div>
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
