import React from 'react';
import { Icon } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

const StatusBar = ({ className, session }) => {
  console.log(session);
  const clsString = classNames(styles.statusBar, className);
  return (
    <div className={clsString}>
      <div style={{ paddingLeft: '40px' }}>
        <Icon type="download" /> {session.status.payload_download_rate} (999)
      </div>
      <div>
        <Icon type="upload" /> {session.status.payload_upload_rate} (999)
      </div>
      <div>
        <Icon type="desktop" /> {session.status.total_peers_connections} (999)
      </div>
      <div style={{ paddingRight: '40px' }}>
        <Icon type="share-alt" /> {session.status.dht_nodes}
      </div>
      {/* TODO - DISABLED FOR NOW BECAUSE WE NEED TO IMPLEMENT A TEST IN THE BACKEND
      <div style={{paddingRight: '40px'}} >
      <Icon type="smile-o" /> Port open
      </div> */}
    </div>
  );
};

export default StatusBar;
