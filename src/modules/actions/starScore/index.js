import { createAction, handleActions } from 'redux-actions';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { requestDMPost } from 'modules/fetch/api';
import moment from 'moment';
const SEND_STAR_SCORE = 'starScore/SEND_STAR_SCORE';
const GET_CHAT_RESULT = 'chat/GET_CHAT_RESULT';

export const sendSatisfy = createAction(SEND_STAR_SCORE);

export default function* sendSatisfyaction(action) {
  // console.log('sendSatisfyaction!!!!!!!!!', action);
  const paramSet = {
    user_id: sessionStorage.getItem('user_id'),
    in_type: 'satisfy',
    session_id: sessionStorage.getItem('session_id'),
    channel_id: sessionStorage.getItem('device'),
    parameters: {
      star: action.payload.score.toString(),
      rate_msg: action.payload.content,
    },
  };

  const response = yield call(requestDMPost, paramSet);

  const chatList = yield select(state => state.chatList.data);

  const chatResult = response.data.data?.result?.fulfillment || {};

  const messageForm = {
    messageId: 'bot_satisfy_' + chatList.length,
    createAt: moment().format('a hh:mm').replace('pm', '오후').replace('am', '오전'),
    data: chatResult,
    chatType: 'bot',
  };
  chatList.push(messageForm);

  yield put({
    type: GET_CHAT_RESULT,
    payload: {
      status: response.status,
      data: chatList || [],
    },
  });
}
export function* sendSatisfyactionSaga() {
  yield takeLatest(SEND_STAR_SCORE, sendSatisfyaction);
}

// export function* getChatListSaga() {
//   yield takeLatest(GET_CHAT_LIST, sendSatisfyaction);
// }

// export default starScore;
