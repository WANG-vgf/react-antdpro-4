// hooks.js
import { useState, useEffect } from 'react';

export const usePageList = ({ list, page, loading }, api) => {
  // 注意useState的值顺序不能变，因为hook内部的值是用链表存储的，例如最好不要在外围加条件判断
  const [values, setValues] = useState({});
  const [selectRowKeys, setSelectRowkeys] = useState([]);

  const handleSearch = values => {
    setValues(values);
  };

  const fetch = (page = 1, pageSize = 10) => {
   // 为了封装性，直接用全局的dispatch，不用手动传进来了
    window.g_app._store.dispatch({
      type: api,
      payload: {
        page,
        pageSize,
        ...values
      }
    });
  };
  // 根据values变化触发拉取分页和重置选择的动作
  useEffect(() => {
    fetch()
    setSelectRowkeys([])
  }, [values]);
  
 // 搜索框的属性
  const searchProps = {
    handleSearch,
  };
 
// 分页表格的属性
  const tableProps = {
    dataSource: list,
    pagination: page,
    onChange: ({ current, pageSize }) => fetch(current, pageSize),
    loading,
    rowSelection: {
      selectRowKeys,
      onChange: k => setSelectRowkeys(k),
    },
  };

  return {
    values,
    searchProps,
    tableProps,
    selectRowKeys,
  };
};
