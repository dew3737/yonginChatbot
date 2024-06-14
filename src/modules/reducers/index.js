import { combineReducers } from 'redux';
import autoComplete, { autoCompleteSaga } from 'modules/actions/autoComplete/index';
import isActive from 'modules/actions/statusMenu/index';
import chatList, { getChatListSaga } from 'modules/actions/chat';
import fontSize from 'modules/actions/fontSize';
import quality, { getQualityOptions, sendQualityGenerator } from 'modules/actions/quality';
import organizationResult, { sendOrganizationSaga } from 'modules/actions/sendOrganization';

import { all } from 'redux-saga/effects';
import { sendSatisfyactionSaga } from 'modules/actions/starScore';

const rootReducer = combineReducers({
  autoComplete,
  isActive,
  chatList,
  fontSize,
  quality,
  organizationResult,
});

export function* rootSaga() {
  yield all([autoCompleteSaga(), getChatListSaga(), sendSatisfyactionSaga(), getQualityOptions(), sendQualityGenerator(), sendOrganizationSaga()]);
}

export default rootReducer;
