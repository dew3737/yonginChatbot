import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NormalButton from 'components/atoms/Button/NormalButton';
import { useRequestDM } from 'modules/hooks';
import { autoComChangeTag } from 'lib';
import { chatList } from 'modules/actions/chat';
import { MESSAGE_TYPE } from 'helper';
import { autoCompleteReset, setCursor } from 'modules/actions/autoComplete';
import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';

const AutoComplete = ({ clearInputTextRef, pointer, inputPtr }) => {
  const sentenceList = useSelector(state => state.autoComplete.sentenceList);
  const autoDisplay = useSelector(state => state.autoComplete.display);
  const autoActive = useSelector(state => state.autoComplete.active);
  const cursor = useSelector(state => state.autoComplete.cursor);

  const dispatch = useDispatch();
  const onSendMessage = (text, type) => {
    console.log('onSendMessage');
    const paramSet = {
      inType: type,
      inStr: text,
      inLabel: text,
      parameters: sessionStorage.getItem('address')
        ? {
            latitude_y: sessionStorage.getItem('latitude_y'),
            longitude_x: sessionStorage.getItem('longitude_x'),
            address: sessionStorage.getItem('address'),
            position_status: 'Y',
          }
        : { latitude_y: '', longitude_x: '', position_status: 'N' },
    };
    dispatch(setCursor(''));
    dispatch(chatList(paramSet));
    dispatch(autoCompleteReset());
    clearInputTextRef();
  };
  let height = '0px';
  if (autoDisplay) {
    if (sentenceList.length === 0) {
      height = '0px';
    } else if (sentenceList.length === 1) {
      height = '35px';
    } else if (sentenceList.length === 2) {
      height = '70px';
    } else if (sentenceList.length === 3) {
      height = '105px';
    } else if (sentenceList.length === 4) {
      height = '140px';
    }
  }

  const onKeyDown = (e, idx) => {
    if (idx === sentenceList.length - 1 && e.key === 'ArrowDown') {
      inputPtr.current.focus();
      dispatch(setCursor(''));
    } else if (e.key === 'ArrowDown') {
      pointer[idx + 1].focus();
      dispatch(setCursor(idx + 1));
    } else if (e.key === 'ArrowUp' && idx !== 0) {
      pointer[idx - 1].focus();
      dispatch(setCursor(idx - 1));
    } else {
      return null;
    }
  };

  return (
    <div className="auto_complete_div" style={{ height, display: autoActive ? 'flex' : 'none' }}>
      {sentenceList.map((sentence, idx) => (
        <button
          className={idx === cursor ? '_sel' : ''}
          key={'auto_p_' + idx}
          ref={el => {
            pointer[idx] = el;
            return null;
          }}
          type="button"
          onKeyDown={e => onKeyDown(e, idx)}
          onClick={() => onSendMessage(sentence.keyword, MESSAGE_TYPE.query)}
        >
          {ReactHtmlParser(autoComChangeTag(sentence.highlight))}
        </button>
      ))}
    </div>
  );
};

AutoComplete.propTypes = {
  clearInputTextRef: PropTypes.func,
  pointer: PropTypes.array,
  inputPtr: PropTypes.object,
};
AutoComplete.defaultProps = {
  clearInputTextRef: () => {},
  pointer: [],
  inputPtr: {},
};
export default AutoComplete;
