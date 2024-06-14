import { createAction, handleActions } from 'redux-actions';

const ACTIVE_SETTING_MENU = 'statusmenu/ACTIVE_SETTING_MENU';
const ACTIVE_SIDE_MENU = 'statusmenu/ACTIVE_SIDE_MENU';
const ACTIVE_QUICK_MENU = 'statusmenu/ACTIVE_QUICK_MENU';
const ACTIVE_FEEDBACK_MODAL = 'statusmenu/ACTIVE_FEEDBACK_MODAL';
const ACTIVE_SATISFY_MODAL = 'statusmenu/ACTIVE_SATISFY_MODAL';
const DISABLE_ALL_MENU = 'statusmenu/DISABLE_ALL_MENU';
const ACTIVE_MODAL = 'statusmenu/ACTIVE_MODAL';
const ACTIVE_CONVERSATION_GUIDE = 'statusmenu/ACTIVE_CONVERSATION_GUIDE';
const ACTIVE_SERVICE_GUIDE = 'statusmenu/ACTIVE_SERVICE_GUIDE';
const ACTIVE_ORGANIZATION = 'statusmenu/ACTIVE_ORGANIZATION';
const ACTIVE_EXPANDIMAGE = 'statusmenu/ACTIVE_EXPANDIMAGE';
const EXPANDIMAGE_URL = 'statusmenu/EXPANDIMAGE_URL';
const LOADING = 'statusmenu/LOADING';

export const isActiveSettingMenu = createAction(ACTIVE_SETTING_MENU);
export const isActiveSideMenu = createAction(ACTIVE_SIDE_MENU);
export const isActiveQuickMenu = createAction(ACTIVE_QUICK_MENU);
export const isActiveFeedbackModal = createAction(ACTIVE_FEEDBACK_MODAL);
export const isACtiveSatisfyModal = createAction(ACTIVE_SATISFY_MODAL);
export const activeModal = createAction(ACTIVE_MODAL);
export const isActiveConversationGuideModal = createAction(ACTIVE_CONVERSATION_GUIDE);
export const isActiveServiceGuideModal = createAction(ACTIVE_SERVICE_GUIDE);
export const isActiveOrganizationModal = createAction(ACTIVE_ORGANIZATION);
export const isActiveExpandImageModal = createAction(ACTIVE_EXPANDIMAGE);
export const expandImageUrl = createAction(EXPANDIMAGE_URL);
export const loading = createAction(LOADING);

export const disableAllMenu = createAction(DISABLE_ALL_MENU);
// const initialState = false;
const initialState = {
  settingMenu: false,
  sideMenu: false,
  quickMenu: false,
  feedbackModal: false,
  feedbackResponseModal: false,
  satisfyModal: false,
  conversationGuideModal: false,
  serviceGuideModal: false,
  organizationModal: false,
  expandImageModal: false,
  expandImageUrl: '',
  loading: false,
};
const isActive = handleActions(
  {
    [EXPANDIMAGE_URL]: (state, action) => {
      return { ...state, expandImageUrl: action.payload };
    },
    [ACTIVE_EXPANDIMAGE]: (state, action) => {
      return { ...state, expandImageModal: action.payload };
    },
    [ACTIVE_ORGANIZATION]: (state, action) => ({ ...state, organizationModal: action.payload }),
    [ACTIVE_CONVERSATION_GUIDE]: state => ({ ...state, conversationGuideModal: !state.conversationGuideModal }),
    [ACTIVE_SERVICE_GUIDE]: state => ({ ...state, serviceGuideModal: !state.serviceGuideModal }),
    [ACTIVE_SETTING_MENU]: state => ({ ...state, settingMenu: !state.settingMenu }),
    [ACTIVE_SIDE_MENU]: state => ({ ...state, sideMenu: !state.sideMenu }),
    [ACTIVE_QUICK_MENU]: state => ({ ...state, quickMenu: !state.quickMenu }),
    [ACTIVE_FEEDBACK_MODAL]: state => ({ ...state, feedbackModal: !state.feedbackModal }),
    [ACTIVE_SATISFY_MODAL]: state => ({ ...state, satisfyModal: !state.satisfyModal }),
    [LOADING]: (state, action) => ({ ...state, loading: action.payload }),
    [ACTIVE_MODAL]: (state, action) => {
      for (const key of Object.keys(state)) {
        state[key] = false;
      }

      return {
        ...state,
        [action.payload]: true,
      };
    },
    [DISABLE_ALL_MENU]: state => initialState,
  },
  initialState
);

export default isActive;
