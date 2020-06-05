import React from 'react';
import style from './style.less';
import {
  LoadingOutlined,
} from '@ant-design/icons';

const PageLoading: React.FC<{}> = () => (
  <div className={style.load_wrap}>
    <LoadingOutlined style={{
      'fontSize': '66px'
    }} />
    <p className={style.load_text}>加载中 . . .</p>
  </div>
);

export default PageLoading;