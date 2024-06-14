import { createAction, handleActions } from 'redux-actions';
import { call, put, select, takeLatest, takeEvery, all, delay } from 'redux-saga/effects';
import { requestDMPost } from 'modules/fetch/api';
import moment from 'moment';
import axios from 'axios';
import Uuid4 from 'uuid/v4';
import isArray from 'redux-actions/lib/utils/isArray';
import { isActiveOrganizationModal, loading } from 'modules/actions/statusMenu';
import Organization from 'components/molecules/Modal/Organization';

const GET_CHAT_LIST = 'chat/GET_CHAT_LIST';
const GET_CHAT_RESULT = 'chat/GET_CHAT_RESULT';
const GET_CHAT_LOADING = 'chat/GET_CHAT_LOADING';
const SET_CHAT_LIST = 'chat/SET_CHAT_LIST';

const INSERT_CHAT = 'chat/INSERT_CHAT';
const CHANGE_CHAT = 'chat/CHANGE_CHAT';
const RE_RENDER_CHAT = 'chat/RE_LOAD_CHAT';

export const reRenderChat = createAction(RE_RENDER_CHAT);
export const insertChat = createAction(INSERT_CHAT);
export const changeChat = createAction(CHANGE_CHAT);

// message set
// const messageArray = [];
export const chatList = createAction(GET_CHAT_LIST);
export const setChatList = createAction(SET_CHAT_LIST);

const initialState = {
  status: { type: 'success', class: 'disnone', status: '200', msg: '' },
  data: [],
};

// export function* getSendCustomer(action) {
// console.log('customerAction!!!!!!!!!', action);
// const customerForm = {
//   messageId: 'customer_' + messageArray.length,
//   createAt: moment().format('a hh:mm').replace('pm', '오후').replace('am', '오전'),
//   messages: [{ text: action.payload.inLabel || action.payload.inStr }],
//   chatType: 'customer',
// };
// if (action.payload.inLabel || action.payload.inStr) messageArray.push(customerForm);
//
// const loadingForm = {
//   messageId: 'loading_' + messageArray.length,
//   createAt: moment().format('a hh:mm').replace('pm', '오후').replace('am', '오전'),
//   data: { response_status: 'loading' },
//   chatType: 'bot',
// };
// if (action.payload.inLabel || action.payload.inStr || action.payload.inType === 'intro') messageArray.push(loadingForm);
//
// yield put({
//   type: GET_CHAT_RESULT,
//   payload: {
//     status: true,
//     data: messageArray || [],
//   },
// });
// }
function getIP() {
  return axios.get('https://geolocation-db.com/json/');
  // return axios.get('/chat/getIp');
}
export function* getChatList(action) {
  const list = yield select(state => state.chatList.data);

  let loadingId = '';
  if (action.payload.inLabel || action.payload.inStr) {
    yield put(
      insertChat({
        messageId: 'customer_' + list.length,
        createAt: moment().format('a hh:mm').replace('pm', '오후').replace('am', '오전'),
        messages: [{ text: action.payload.inLabel || action.payload.inStr }],
        chatType: 'customer',
        type: 'query',
      })
    );
  }

  if (action.payload.inLabel || action.payload.inStr || action.payload.inType === 'intro') {
    loadingId = 'loading_' + list.length;
    yield put(
      insertChat({
        messageId: loadingId,
        createAt: moment().format('a hh:mm').replace('pm', '오후').replace('am', '오전'),
        data: { response_status: 'loading' },
        chatType: 'bot',
        type: 'loading',
      })
    );
  }

  if (!sessionStorage.getItem('user_id')) {
    const ipRes = yield call(getIP);

    if (ipRes.data === '::1') {
      ipRes.data = '127.0.0.1';
    }
    // ipRes.data = ipRes.data.replace(/::ffff:/g, '').split(',')[0];
    ipRes.data = ipRes.data.IPv4;
    console.log('ipRes data:::', ipRes.data);
    sessionStorage.setItem('user_id', ipRes.data);
  }
  if (!sessionStorage.getItem('device')) {
    const filter = 'win16|win32|win64|mac|macintel';
    if (navigator.platform) {
      if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
        sessionStorage.setItem('device', 'mobile');
      } else {
        sessionStorage.setItem('device', 'pc');
      }
    }
  }
  if (!sessionStorage.getItem('session_id')) {
    sessionStorage.setItem('session_id', `session_${Uuid4()}`);
  }
  const setParam = {
    user_id: sessionStorage.getItem('user_id'),
    in_type: action.payload.inType,
    in_str: action.payload.inStr,
    session_id: sessionStorage.getItem('session_id'),
    channel_id: sessionStorage.getItem('device'),
    parameters: action.payload.parameters || { latitude_y: '', longitude_x: '', position_status: 'N' },
  };
  // console.log('setParam:::', JSON.stringify(setParam));
  if (setParam.in_str === '담담 안내') {
    console.log('popup');
  }
  try {
    const response = yield call(requestDMPost, setParam);
    const chatResult = response.data.data?.result?.fulfillment || {};
    // const chatResult = {
    //   custom_code: [{ key: 'organization', value: 'off' }],
    // };

    // const chatInStr = response.data.data?.in_str || '';
    const responseStatus = response.data.data?.result?.fulfillment?.response_status || '';
    // const customerForm = {
    //   messageId: messageArray.length,
    //   createAt: moment().format('a hh:mm').replace('pm', '오후').replace('am', '오전'),
    //   messages: [{ text: chatInStr }],
    //   chatType: 'customer',
    // };
    // if (chatInStr !== '') messageArray.push(customerForm);

    if (chatResult.custom_code.length > 0) {
      if (chatResult.custom_code.find(x => x.key === 'organization').value === 'on') {
        console.log('on');
        yield put(isActiveOrganizationModal(true));
      } else if (chatResult.custom_code.find(x => x.key === 'organization').value === 'off') {
        console.log('off');
        yield put(isActiveOrganizationModal(false));
      }
    }

    const loadingStatus = yield select(state => state.isActive.loading);
    if (loadingStatus) {
      yield put(loading(false));
    }

    // bot
    let messageForm = { id: response.data?.data?.message_id };
    if (response.status.type === 'success') {
      if (responseStatus === 'suggest') {
        messageForm = {
          ...messageForm,
          messageId: 'bot_' + list.length,
          createAt: moment().format('a hh:mm').replace('pm', '오후').replace('am', '오전'),
          data: {
            response_status: 'suggest',
            response_type: 'answer',
            emotion: chatResult.emotion,
            speech: chatResult.speech,
            template_id: '08_ListBT',
            messages: [
              {
                type: 'button',
                name: '버튼',
                id: 'list_btn',
                manual: 'N',
                random: 'N',
                items: chatResult.suggest.map(data => ({
                  button: {
                    label: data.sentence,
                    value: data.sentence,
                    action: 'query',
                  },
                })),
              },
            ],
          },
          chatType: 'bot',
        };
        // console.log(`messageForm::: ${JSON.stringify(messageForm)}`);
      } else {
        messageForm = {
          ...messageForm,
          messageId: 'bot_' + list.length,
          createAt: moment().format('a hh:mm').replace('pm', '오후').replace('am', '오전'),
          data: chatResult,
          chatType: 'bot',
        };
      }
    } else if (response.status.type === 'error') {
      messageForm = {
        ...messageForm,
        messageId: 'bot_' + list.length,
        createAt: moment().format('a hh:mm').replace('pm', '오후').replace('am', '오전'),
        data: {
          response_status: 'error',
          response_type: 'answer',
          emotion: 'normal',
          speech: [{ text: '서버로 부터 응답을 받지를 못했습니다.' }, { text: '잠시 후 다시 시도해 주세요.' }],
          template_id: '',
          custom_code: [],
          suggest: [],
        },
        chatType: 'bot',
      };
    }

    // messageArray.pop();
    // messageArray.push(messageForm);
    // yield delay(1000);
    yield put(changeChat({ id: loadingId, form: messageForm }));

    // yield put({
    //   type: GET_CHAT_RESULT,
    //   payload: {
    //     status: response.status,
    //     data: messageArray || [],
    //   },
    // });
  } catch (err) {
    const errorStatus = { type: 'error', class: '', status: '400', msg: err };
    yield put({
      type: GET_CHAT_RESULT,
      payload: { ...initialState, status: errorStatus },
      error: true,
    });
  }
  // console.log('messageArray:::', messageArray);
}

export function* getChatListSaga() {
  yield takeLatest(GET_CHAT_LIST, getChatList);
}

// export function* getSendCustomerSaga() {
//   yield takeLatest(GET_CHAT_LIST, getSendCustomer);
// }

export default handleActions(
  {
    [RE_RENDER_CHAT]: state => {
      return { ...state };
    },
    [INSERT_CHAT]: (state, action) => {
      state.data = state.data.concat(action.payload);
      return { ...state };
    },
    [CHANGE_CHAT]: (state, action) => {
      const { id, form } = action.payload;
      const idx = state.data.findIndex(i => i.messageId === id);
      if (idx !== -1) state.data[idx] = form;
      return { ...state };
    },
    [GET_CHAT_RESULT]: (state, action) => ({
      data: action.payload.data,
      status: action.payload.status,
    }),
    [SET_CHAT_LIST]: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  initialState
);
