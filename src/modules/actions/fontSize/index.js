import { createAction, handleActions } from 'redux-actions';

const SET_FONT_SIZE = 'fontSize/SET_FONT_SIZE';

export const changeFontSize = createAction(SET_FONT_SIZE);

if (!sessionStorage.getItem('font_size')) {
  sessionStorage.setItem('font_size', 14);
}
const initialState = {
  size: Number(sessionStorage.getItem('font_size')),
};

const fontSize = handleActions(
  {
    [SET_FONT_SIZE]: (state, { payload: size }) => {
      return { ...state, size };
    },
  },
  initialState
);

export default fontSize;
