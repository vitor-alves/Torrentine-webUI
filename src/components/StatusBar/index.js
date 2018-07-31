import React from 'react';
import { Icon, Popover, Input, Button} from 'antd';
import classNames from 'classnames';
import styles from './index.less';

const content = (
  <div>
    <Input addonBefore="Global Download Rate Limit" addonAfter="kB/s" defaultValue="mysite" style={{width:"350px"}} onPressEnter={() => console.log("oi")} />
    <Button type="primary">Primary</Button>
  </div>
);

const StatusBar = ({ className, program }) => {
  console.log(program);
  const clsString = classNames(styles.statusBar, className);
  return (
    <div className={clsString}>
      <div style={{ paddingLeft: '40px' }}>
            <Popover placement="top" content={content} trigger="click">
        <Icon type="download" /> {program.status.payload_download_rate} ({program.settings.download_rate_limit})
      </Popover>
      </div>
      <div>
        <Icon type="upload" /> {program.status.payload_upload_rate} ({program.settings.upload_rate_limit})
      </div>
      <div>
        <Icon type="desktop" /> {program.status.total_peers_connections} ({program.settings.connections_limit})
      </div>
      <div style={{ paddingRight: '40px' }}>
        <Icon type="share-alt" /> {program.status.dht_nodes}
      </div>
      {/* TODO - DISABLED FOR NOW BECAUSE WE NEED TO IMPLEMENT A TEST IN THE BACKEND
      <div style={{paddingRight: '40px'}} >
      <Icon type="smile-o" /> Port open
      </div> */}
    </div>
  );
};

export default StatusBar;
