// import { PageLoading } from '@ant-design/pro-layout';

// // loading components from code split
// // https://umijs.org/plugin/umi-plugin-react.html#dynamicimport
// export default PageLoading;
import React from 'react';
import style from './style.less';

const PageLoading: React.FC<{}> = () => (
  <div className={style.loadwrap}>
    正在加载 . . .
  </div>
);

export default PageLoading;