import { Effect, Reducer } from 'umi';
import * as allIcons from '@ant-design/icons/es';
import React from 'react';

const toHump = (name: string) => (
  name.replace(/-(\w)/g, (all: string, letter: any) => letter.toUpperCase())
)

import { queryCurrent, query as queryUsers, getMenu } from '@/services/user';

export interface CurrentUser {
  avatar?: string;
  name?: string;
  title?: string;
  group?: string;
  signature?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  userid?: string;
  unreadCount?: number;
}

export interface UserModelState {
  currentUser?: CurrentUser;
  menuData?: any[]
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
    getMenu: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    changeNotifyCount: Reducer<UserModelState>;
    saveMenu: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {},
    menuData: []
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      // const response = yield call(queryCurrent);
      const response = {
        name: 'giun.fa',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        userid: '00000001',
      }
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *getMenu(_, { call, put }) {
      const response = yield call(getMenu);
      let menuArr: any[] = [];
      response.data.map((item: any) => {
        let chirdren: { path: string; name: string; }[] = [];
        if (item.menuTreeVOList) {
          item.menuTreeVOList.map((child: any) => {
            chirdren.push({
              path: `/${item.menuCode}/${child.menuCode}`,
              name: child.menuName,
            })
          })
        }
        //antd4 icon图标动态生成 
        const v4IconName = toHump(item.icon.replace(item.icon[0], item.icon[0].toUpperCase()));
        const newIcon = React.createElement(allIcons[item.icon] || allIcons[''.concat(v4IconName, 'Outlined')]);
        menuArr.push({
          path: `/${item.menuCode}`,
          name: item.menuName,
          icon: newIcon,
          children: chirdren,
          authority: 'user'
        })
      })
      yield put({
        type: 'saveMenu',
        payload: menuArr,
      });
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    saveMenu(state, action) {
      return {
        ...state,
        menuData: action.payload || []
      }
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};

export default UserModel;