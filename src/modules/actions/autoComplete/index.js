import { createAction, handleActions } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { requestAutoCompleteList } from 'modules/fetch/api';

// saga 액션명
const AUTO_COMPLETE_GET = 'autoComplete/AUTO_COMPLETE_GET';
const AUTO_COMPLETE_RESULT = 'autoComplete/AUTO_COMPLETE_RESULT';
const AUTO_COMPLETE = 'autoComplete/AUTO_COMPLETE';
const AUTO_COMPLETE_RESET = 'autoComplete/AUTO_COMPLETE_RESET';
const AUTO_COMPLETE_DISPLAY = 'autoComplete/AUTO_COMPLETE_DISPLAY';
const SET_CURSOR = 'autoComplete/SET_CURSOR';

// saga 액션 생성자 함수
export const autoCompleteList = createAction(AUTO_COMPLETE_GET);
export const autoCompleteState = createAction(AUTO_COMPLETE);
export const autoCompleteReset = createAction(AUTO_COMPLETE_RESET);
export const autoCompleteDisplay = createAction(AUTO_COMPLETE_DISPLAY);
export const setCursor = createAction(SET_CURSOR);

if (!sessionStorage.getItem('auto_active')) {
  sessionStorage.setItem('auto_active', true);
}

const initialize = {
  active: JSON.parse(sessionStorage.getItem('auto_active')),
  display: false,
  sentenceList: [],
  cursor: '',
};

// saga 함수 선언
export function* getAutoCompleteList(action) {
  try {
    const result = yield call(requestAutoCompleteList, action.payload);

    // if (result.data.length > 0) {
    //   yield put({ type: AUTO_COMPLETE_RESULT, payload: result.data });
    // }
    yield put({ type: AUTO_COMPLETE_RESULT, payload: result.data });
  } catch (err) {
    console.log(`consoleMessage:::${err.message}`);
  }
}

export function* autoCompleteSaga() {
  yield takeLatest(AUTO_COMPLETE_GET, getAutoCompleteList);
}

const autoComplete = handleActions(
  {
    [SET_CURSOR]: (state, action) => {
      return { ...state, cursor: action.payload };
    },
    [AUTO_COMPLETE_RESULT]: (state, { payload: sentenceList }) => {
      return { ...state, sentenceList };
    },
    [AUTO_COMPLETE]: (state, { payload: active }) => {
      return { ...state, active };
    },
    [AUTO_COMPLETE_DISPLAY]: (state, { payload: display }) => {
      return { ...state, display };
    },
    [AUTO_COMPLETE_RESET]: state => ({ ...state, sentenceList: [] }),
  },
  initialize
);

export default autoComplete;
