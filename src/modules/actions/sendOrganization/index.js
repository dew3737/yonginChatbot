import { createAction, handleActions } from 'redux-actions';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { requestDMPost } from 'modules/fetch/api';
import moment from 'moment';
const SEND_ORGANIZATION = 'sendOrganization/SEND_ORGANIZATION';
const ORGANIZATION_RESULT = 'sendOrganization/ORGANIZATION_RESULT';

export const sendOrganization = createAction(SEND_ORGANIZATION);
export const organizationResult = createAction(ORGANIZATION_RESULT);

export function* sendOrganizationaction(action) {
  if (action.payload.status !== 'stop') {
    const instr = `조직도 검색 내용 → ${action.payload.user_name ? `이름 : ${action.payload.user_name}, ` : ''}
    ${action.payload.position_name ? `직위 : ${action.payload.position_name}, ` : ''}
    ${action.payload.depth_name ? `부서 : ${action.payload.depth_name}, ` : ''}
    ${action.payload.team_name ? `팀 : ${action.payload.team_name}, ` : ''}
    ${action.payload.work ? `업무 : ${action.payload.work}, ` : ''}
    from : ${Number(action.payload.from)}`;

    // console.log('inStr:::', instr);
    const paramSet = {
      user_id: sessionStorage.getItem('user_id'),
      in_type: 'query',
      in_str: instr,
      session_id: sessionStorage.getItem('session_id'),
      channel_id: sessionStorage.getItem('device'),
      parameters: { organization: JSON.stringify(action.payload) },
    };
    const response = yield call(requestDMPost, paramSet);

    // const chatList = yield select(state => state.chatList.data);

    const getOrganization = response.data.data?.result?.fulfillment?.messages || [];

    let result = [];
    let count = 0;
    if (getOrganization.length > 0) {
      result = getOrganization[0].items;
      count = getOrganization[1].items[0].value.value;
      // console.log('result:::', result);
      // console.log('count:::', count);
    }
    // const messageForm = {
    //   messageId: 'bot_satisfy_' + chatList.length,
    //   createAt: moment().format('a hh:mm').replace('pm', '오후').replace('am', '오전'),
    //   data: chatResult,
    //   chatType: 'bot',
    // };
    // chatList.push(messageForm);

    const organizationList = yield select(state => state.organizationResult.result);
    if (action.payload.status) {
      result = organizationList.concat(result);
    }

    yield put({
      type: ORGANIZATION_RESULT,
      payload: {
        result: result || [],
        count: count || 0,
      },
    });
  } else {
    yield put({
      type: ORGANIZATION_RESULT,
      payload: {
        result: [],
        count: 0,
      },
    });
  }
}

export function* sendOrganizationSaga() {
  yield takeLatest(SEND_ORGANIZATION, sendOrganizationaction);
}
const initialState = {
  result: [],
  count: 0,
};

export default handleActions(
  {
    [ORGANIZATION_RESULT]: (state, action) => ({
      result: action.payload.result,
      count: action.payload.count,
    }),
  },
  initialState
);
// export function* getChatListSaga() {
//   yield takeLatest(GET_CHAT_LIST, sendSatisfyaction);
// }

// export default starScore;
