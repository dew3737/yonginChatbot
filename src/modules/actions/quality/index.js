import { createAction, handleActions } from 'redux-actions';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { requestDMPost, requestQuality } from 'modules/fetch/api';
import { setChatList } from 'modules/actions/chat';
import { activeModal } from 'modules/actions/statusMenu';

const SET_MESSAGE_ID = 'quality/SET_MESSAGE_ID';
const SET_OPTIONS = 'quality/SET_OPTIONS';
const FETCH_OPTIONS = 'quality/FETCH_OPTIONS';
const SEND_QUALITY = 'quality/SEND_QUALITY';
const SET_RESPONSE = 'quality/SET_RESPONSE';
const SET_QUALITY = 'quality/SET_QUALITY';

export const setQuality = createAction(SET_QUALITY);
export const sendQuality = createAction(SEND_QUALITY);
export const fetchOptions = createAction(FETCH_OPTIONS);
export const setMessageId = createAction(SET_MESSAGE_ID);
export const setOptions = createAction(SET_OPTIONS);
export const setResponse = createAction(SET_RESPONSE);

export function* fetchQualityOptions() {
  const {
    data: { quality },
  } = yield call(requestQuality);
  yield put(setOptions(quality));
}

export function* getQualityOptions() {
  yield takeLatest(FETCH_OPTIONS, fetchQualityOptions);
}

export function* createQuality(action) {
  const messageId = action.payload.message_id;
  const param = {
    session_id: sessionStorage.getItem('session_id'),
    ...action.payload,
  };

  const response = yield call(requestDMPost, param);

  const chatItem = yield select(state => state.chatList.data.find(i => i.id === messageId));
  chatItem.isQualitySend = true;

  // yield put(setChatList());
  yield put(setResponse(response.data.data.result.fulfillment.speech));
  yield put(activeModal('feedbackResponseModal'));
}

export function* sendQualityGenerator() {
  yield takeLatest(SEND_QUALITY, createQuality);
}

const quality = handleActions(
  {
    [SET_QUALITY]: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    [SET_MESSAGE_ID]: (state, action) => {
      return {
        ...state,
        messageId: action.payload,
      };
    },
    [SET_OPTIONS]: (state, action) => {
      return {
        ...state,
        options: action.payload,
      };
    },
    [SET_RESPONSE]: (state, action) => {
      return {
        ...state,
        response: action.payload,
      };
    },
  },
  {
    messageId: '',
    response: [],
    options: [],
  }
);

export default quality;
