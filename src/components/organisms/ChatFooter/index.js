import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { chatList } from 'modules/actions/chat';
import IconButton from 'components/atoms/Button/IconButton';
import {
  autoCompleteList,
  autoCompleteReset,
  autoCompleteDisplay,
  setCursor,
} from 'modules/actions/autoComplete';
import {
  isActiveQuickMenu,
  disableAllMenu,
  isActiveSettingMenu,
  isActiveSideMenu,
} from 'modules/actions/statusMenu';
import ChatMenu from 'components/molecules/ChatMenu';
import AutoComplete from 'components/molecules/AutoComplete';
import { debounce } from 'lib';
/**
 * Chatting:Footer
 */
const ChatFooter = () => {
  /** 입력창 Ref */
  const dispatch = useDispatch();

  const inputTextRef = useRef();
  const hiddenInputRef = useRef();

  const sentenceList = useSelector((state) => state.autoComplete.sentenceList);
  const settingMenuStatus = useSelector((state) => state.isActive.settingMenu);
  const sideMenuStatus = useSelector((state) => state.isActive.sideMenu);
  const status = useSelector((state) => state.isActive.quickMenu);
  const [textValue, setTextValue] = useState('');

  const quickMenuStatus = useSelector((state) => state.isActive.quickMenu);

  const autoRef = useRef([]);

  const handleInput = debounce(() => {
    if (!inputTextRef.current) return null;
    const text = inputTextRef.current.value.trim();
    setTextValue(text);
    // if (text === '') {
    //   clearInputTextRef();
    // }
    dispatch(autoCompleteList(text));
  }, 200);

  const onSettingMenu = () => {
    dispatch(isActiveQuickMenu());
    if (settingMenuStatus) {
      dispatch(isActiveSettingMenu());
    }
    if (sideMenuStatus) {
      dispatch(isActiveSideMenu());
    }
    // dispatch(disableAllMenu());
  };
  const isInitialSound = (char) => {
    const code = char.charCodeAt(0);

    // 숫자 (ex. 01000000000)
    if (code >= 48 && code <= 57) {
      return true;
    }

    // 영어 문자열 조합 (ex.PCR)
    if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
      return true;
    }

    // 한글 문자열 조합 : 가-힣
    if (code >= 44032 && code <= 55203) {
      return true;
    }

    return false;
  };

  const onKeyPressEvt = (e) => {
    const value = inputTextRef?.current?.value;
    const initialSoundValue = isInitialSound(value);
    if (
      e.key === 'Enter' &&
      !e.shiftKey &&
      inputTextRef?.current?.value &&
      initialSoundValue
    ) {
      onSendMessage();
    }
  };

  const clearInputTextRef = () => {
    inputTextRef.current.value = '';
    setTextValue('');
    dispatch(autoCompleteReset());
    // inputTextRef.current.blur()
    hiddenInputRef.current.focus();
    inputTextRef.current.focus();
  };

  const onSendMessage = () => {
    const value = inputTextRef?.current?.value;
    if (value.trim().length > 0) {
      const paramSet = {
        inType: 'query',
        inStr: value,
        inLabel: value,
        parameters: sessionStorage.getItem('address')
          ? {
              latitude_y: sessionStorage.getItem('latitude_y'),
              longitude_x: sessionStorage.getItem('longitude_x'),
              address: sessionStorage.getItem('address'),
              position_status: 'Y',
            }
          : { latitude_y: '', longitude_x: '', position_status: 'N' },
      };

      dispatch(chatList(paramSet));
      clearInputTextRef();
    }
  };

  const handleClickOutside = ({ target }) => {
    if (!inputTextRef?.current?.contains(target)) {
      dispatch(autoCompleteDisplay(false));
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const onKeyDown = debounce((e) => {
    dispatch(autoCompleteDisplay(true));
    autoRef.current = autoRef.current.filter((i) => i !== null);
    if (e.key === 'ArrowUp' && sentenceList.length !== 0) {
      const autoLength = autoRef.current.length;
      if (autoLength !== 0 && autoRef.current[autoLength - 1] !== null) {
        autoRef.current[autoLength - 1].focus();
        dispatch(setCursor(autoLength - 1));
      }
    }
  }, 100);

  return (
    <>
      <footer className='_chat_footer'>
        <div className='_menu_btn'>
          <IconButton
            icon='ri-microsoft-line'
            styleDef={{
              paddingLeft: '1.5px',
              borderRadius: '40px',
              border: '0px',
              backgroundColor: '#fff',
              color: '#0061AF',
              fontSize: '25px',
            }}
            viewStatus=''
            clickEvt={onSettingMenu}
            label='홈 버튼'
            tabIndex='0'
          />
        </div>
        <ChatMenu
          styleDef={{ height: status ? '200px' : '0px' }}
          viewStatus={quickMenuStatus}
        />
        <div className='_send_div'>
          <div className='_send_box'>
            <input
              title='메시지 입력창'
              type='text'
              placeholder='메시지를 입력해주세요.'
              ref={inputTextRef}
              onKeyDown={onKeyDown}
              onKeyPress={onKeyPressEvt}
              onKeyUp={handleInput}
              spellCheck={false}
              className='_send_box_input'
              onClick={() => {
                dispatch(setCursor(''));
              }}
              onFocus={() => {
                dispatch(disableAllMenu());
                dispatch(autoCompleteDisplay(true));
              }}
              // onBlur={e => {
              //   setTimeout(() => {
              //     dispatch(autoCompleteDisplay(false));
              //   }, 100);
              // }}
            />
            <div className='_icon_set'>
              {/* 전송버튼 */}
              <IconButton
                icon='ri-arrow-up-line'
                styleDef={{
                  borderRadius: '40px',
                  border: '0px',
                  backgroundColor: textValue ? '#0061AF' : '#999',
                  cursor: textValue ? 'pointer' : 'default',
                  color: '#ffffff',
                  fontSize: '25px',
                }}
                viewStatus=''
                clickEvt={isInitialSound(textValue) ? onSendMessage : () => {}}
                label='전송 버튼'
                tabIndex='0'
              />
            </div>
          </div>
          <input
            type='text'
            title='숨김입력창'
            ref={hiddenInputRef}
            style={{ width: 0, height: 0 }}
          />
        </div>
        <AutoComplete
          clearInputTextRef={clearInputTextRef}
          pointer={autoRef.current}
          inputPtr={inputTextRef}
        />
      </footer>
      {/* <div className="_quick_opacity" style={{ display: status ? 'block' : 'none' }} onClick={() => onClickOut()} /> */}
      {/* <ChatMenu styleDef={{ height: status ? '200px' : '0px' }} /> */}
    </>
  );
};

ChatFooter.propTypes = {};
ChatFooter.defaultProps = {};
export default ChatFooter;
