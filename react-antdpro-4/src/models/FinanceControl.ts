import { Reducer, Effect } from 'umi';
import { getFinanceList } from '@/services/FinanceControl';
import { setKeys } from '../utils/utils';

export interface FinanceStateType {
  FinanceData: any[];
  current: string;
  total: string;
}

export interface FinanceControlModelType {
  namespace: 'FinanceControl';
  state: FinanceStateType;
  effects: {
    getFinance: Effect;
  };
  reducers: {
    changeFinanceData: Reducer<FinanceStateType>;
  };
}

const FinanceModel: FinanceControlModelType = {
  namespace: 'FinanceControl',

  state: {
    FinanceData: [],
    current: '1',
    total: '0',
  },

  effects: {
    *getFinance({ payload }, { call, put }) {
      const response = yield call(getFinanceList, payload)
      yield put({
        type: 'changeFinanceData',
        payload: response.data
      })
    }
  },

  reducers: {
    changeFinanceData(state, { payload }) {
      return {
        ...state,
        FinanceData: setKeys([...payload.records], 'storeId'),
        total: payload.total,
        current: payload.current,
      };
    },
  },
}
export default FinanceModel;