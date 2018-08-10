import React, { PureComponent } from 'react';
import {
  Modal,
  Button,
  Menu,
  Icon,
  Spin,
  List,
  Dropdown,
  Avatar,
  Divider,
  Tooltip,
  Upload,
  message,
} from 'antd';
import Debounce from 'lodash-decorators/debounce';
import { Link } from 'dva/router';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';

const Dragger = Upload.Dragger;

export default class GlobalHeader extends PureComponent {
  state = {
    addTorrentVisible: false,

    fileList: [],
    fileNameList: [],
  };

  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }

  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };
  /* eslint-disable*/
  @Debounce(600)
  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }

  addTorrentHandleOk = () => {
    this.setState({
      addTorrentVisible: false,
    });
  };

  addTorrentHandleCancel = () => {
    this.setState({
      addTorrentVisible: false,
    });
  };

  handleUploadChange = info => {
   let fNameList = this.state.fileNameList;
    fNameList.push(info.file.name);
    let fList = this.state.fileList;
    fList.push(info.file);

    this.setState({ fileNameList: fNameList, fileList: fList});
  };

  render() {
    const { currentUser = {}, collapsed, isMobile, logo, onMenuClick, torrents } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="settings">
          <Icon type="setting" /> Settings
        </Menu.Item>
        <Menu.Item key="logs">
          <Icon type="file-text" /> Logs
        </Menu.Item>
        <Menu.Item key="donate">
          <Icon type="wallet" /> Donate
        </Menu.Item>
        <Menu.Item key="about">
          <Icon type="exclamation-circle-o" /> About
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" /> Logout
        </Menu.Item>
      </Menu>
    );
    return (
      <div className={styles.header}>
        {isMobile && [
          <Link to="/" className={styles.logo} key="logo">
            <img src={logo} alt="logo" width="32" />
          </Link>,
          <Divider type="vertical" key="line" />,
        ]}
        <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />

        <div className={styles.left}>
          <Button
            style={{ height: '100%', border: 'none' }}
            size="small"
            onClick={() => {
              this.setState({ addTorrentVisible: true });
            }}
          >
            <Icon type="plus" style={{ fontSize: 20, paddingLeft: '25px' }} /> Add{' '}
          </Button>
          <Modal
            title="Add Torrent"
            visible={this.state.addTorrentVisible}
            onOk={this.addTorrentHandleOk}
            onCancel={this.addTorrentHandleCancel}
          >
            <Button>
              <Icon type="upload" /> Magnet
            </Button>
            <Button>
              <Icon type="upload" /> Infohash
            </Button>
            <Button>
              <Icon type="upload" /> URL
            </Button>
            <Upload
              action="http://localhost:8040/v1.0/torrents/upload" // TODO - this should come from somewhere
              headers={{ Authorization: 'Basic ' + btoa('test_user' + ':' + 'test_pass') }} // TODO - get from store
              onChange={this.handleUploadChange}
              multiple
              fileList={[]}
              style={{ display: 'inline-block' }}
              onPreview={file => {
                file.status = 'error';
              }}
            >
              <Button>
                <Icon type="upload" /> File
              </Button>
            </Upload>

            <List
              size="small"
              bordered
              dataSource={this.state.fileNameList}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Modal>{' '}
          <Button
            style={{ height: '100%', border: 'none' }}
            size="small"
            onClick={() => {
              const { dispatch } = this.props;
              dispatch({
                type: 'torrents/removeTorrents',
                payload: torrents.lastSelectedId,
              });
            }}
          >
            {' '}
            <Icon type="minus" style={{ fontSize: 20, paddingLeft: '25px' }} /> Remove{' '}
          </Button>
          <Button
            style={{ height: '100%', border: 'none' }}
            size="small"
            onClick={() => {
              const { dispatch } = this.props;
              dispatch({
                type: 'torrents/startTorrents',
                payload: torrents.lastSelectedId,
              });
            }}
          >
            {' '}
            <Icon type="caret-right" style={{ fontSize: 20, paddingLeft: '25px' }} /> Start{' '}
          </Button>
          <Button
            style={{ height: '100%', border: 'none' }}
            size="small"
            onClick={() => {
              const { dispatch } = this.props;
              dispatch({
                type: 'torrents/pauseTorrents',
                payload: torrents.lastSelectedId,
              });
            }}
          >
            {' '}
            <Icon type="pause" style={{ fontSize: 20, paddingLeft: '25px' }} /> Pause{' '}
          </Button>
          <Button
            style={{ height: '100%', border: 'none' }}
            size="small"
            onClick={() => {
              const { dispatch } = this.props;
              dispatch({
                type: 'torrents/setQueueTorrent',
                payload: { id: torrents.lastSelectedId, queue_position: 'up' },
              });
            }}
          >
            {' '}
            <Icon type="up" style={{ fontSize: 20, paddingLeft: '25px' }} /> Up{' '}
          </Button>
          <Button
            style={{ height: '100%', border: 'none' }}
            size="small"
            onClick={() => {
              const { dispatch } = this.props;
              dispatch({
                type: 'torrents/setQueueTorrent',
                payload: { id: torrents.lastSelectedId, queue_position: 'down' },
              });
            }}
          >
            {' '}
            <Icon type="down" style={{ fontSize: 20, paddingLeft: '25px' }} /> Down{' '}
          </Button>
          <Button style={{ height: '100%', border: 'none' }} size="small">
            {' '}
            <Icon type="play-circle-o" style={{ fontSize: 20, paddingLeft: '25px' }} /> Stream{' '}
          </Button>
        </div>

        <div className={styles.right}>
          <HeaderSearch
            className={`${styles.action} ${styles.search}`}
            placeholder="Find torrent"
            dataSource={['12345', '6547', '8910']}
            onSearch={value => {
              console.log('input', value); // eslint-disable-line
            }}
            onPressEnter={value => {
              console.log('enter', value); // eslint-disable-line
            }}
          />

          {currentUser.name ? (
            <Dropdown overlay={menu}>
              <span className={`${styles.action} ${styles.account}`}>
                <Avatar size="small" className={styles.avatar} src={currentUser.avatar} />
                <span className={styles.name}>{currentUser.name}</span>
              </span>
            </Dropdown>
          ) : (
            <Spin size="small" style={{ marginLeft: 8 }} />
          )}
        </div>
      </div>
    );
  }
}
