import React, { PureComponent } from 'react';
import { Menu, Icon, Spin, Tag, Dropdown, Avatar, Divider, Tooltip } from 'antd';
import Debounce from 'lodash-decorators/debounce';
import { Link } from 'dva/router';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';

export default class GlobalHeader extends PureComponent {
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
  render() {
    const {
      currentUser = {},
      collapsed,
      isMobile,
      logo,
      onMenuClick,
    } = this.props;
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
          <Icon type="plus" style={{ fontSize: 20, paddingLeft: '25px' }} /> Add
          <Icon type="minus" style={{ fontSize: 20, paddingLeft: '25px' }} /> Remove
          <Icon type="caret-right" style={{ fontSize: 20, paddingLeft: '25px' }} /> Start
          <Icon type="pause" style={{ fontSize: 20, paddingLeft: '25px' }} /> Pause
          <Icon type="up" style={{ fontSize: 20, paddingLeft: '25px' }} /> Up
          <Icon type="down" style={{ fontSize: 20, paddingLeft: '25px' }} /> Down
          <Icon type="play-circle-o" style={{ fontSize: 20, paddingLeft: '25px' }} /> Stream
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
