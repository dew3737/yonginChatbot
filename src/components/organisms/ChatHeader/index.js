import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'components/atoms/Button/IconButton';
import LeftSettingMenu from 'components/molecules/LeftSettingMenu';
import SideMenu from 'components/molecules/SideMenu';
import { isActiveSettingMenu, isActiveSideMenu, disableAllMenu, isActiveQuickMenu, isActiveExpandImageModal } from 'modules/actions/statusMenu';
import { useDispatch, useSelector } from 'react-redux';
/**
 * Chatting:Header
 */
const ChatHeader = ({ title, viewType }) => {
  const settingMenuStatus = useSelector(state => state.isActive.settingMenu);
  const sideMenuStatus = useSelector(state => state.isActive.sideMenu);
  const quickMenuStatus = useSelector(state => state.isActive.quickMenu);
  const expandImageModalStatus = useSelector(state => state.isActive.expandImageModal);

  const dispatch = useDispatch();

  const onClickOut = () => {
    dispatch(disableAllMenu());
  };
  /* 셋팅매뉴 클릭시 다른 메뉴창 닫힘 */
  const onSettingMenu = () => {
    if (sideMenuStatus === true) {
      dispatch(disableAllMenu());
    }
    if (quickMenuStatus) {
      dispatch(isActiveQuickMenu());
    }
    if (expandImageModalStatus) {
      dispatch(isActiveExpandImageModal());
    }
    dispatch(isActiveSettingMenu());
  };

  /* 사이드메뉴 클릭시 다른 메뉴창 닫힘 */
  const onSideMenu = () => {
    if (settingMenuStatus === true) {
      dispatch(disableAllMenu());
    }
    if (quickMenuStatus) {
      dispatch(isActiveQuickMenu());
    }
    if (expandImageModalStatus) {
      dispatch(isActiveExpandImageModal());
    }
    dispatch(isActiveSideMenu());
  };
  const reLoad = () => {
    window.location.reload();
  };
  const handleOnKeyPress = (e) => {
    if(e.key === 'Enter') {
      reLoad();
    }
  }
  return (
    <header className='_chat_header'>
      <div className='_left_div'>
        <IconButton
          icon='ri-settings-3-line round'
          styleDef={{
            borderRadius: '0px',
            color: '#FFF',
            transform: settingMenuStatus ? 'rotate(180deg)' : 'rotate(0deg)',
            // opacity: settingMenuStatus ? '1' : '0.5',
            opacity: '1',
            transition: settingMenuStatus ? '0.5s' : '0.5s',
            strokeWidth: '40px',
          }}
          viewStatus=''
          clickEvt={onSettingMenu}
          label='대화 설정 버튼'
        />
      </div>
      <div className='_center_div'>
        <div
          className='_title'
          onClick={() => reLoad()}
          onKeyPress={handleOnKeyPress}
          role='button'
          tabIndex={0}
        >
          <p>용인시 AI 민원상담</p>
        </div>
      </div>
      <div className='_right_div'>
        <IconButton
          icon='ri-home-4-line'
          styleDef={{
            borderRadius: '40px',
            border: '0px',
            color: '#FFF',
            fontSize: '25px',
            position: 'fixed',
            top: '10px',
            right: '50px',
          }}
          viewStatus=''
          clickEvt={() => {
            window.location.reload();
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              window.location.reload();
            }
          }}
          label='새로 고침 버튼'
        />
        <div
          className={
            sideMenuStatus ? 'menu-trigger active-7' : 'menu-trigger type7'
          }
          role='button'
          tabIndex={0}
          onClick={() => {
            onSideMenu();
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              onSideMenu();
            }
          }}
        >
          <span />
          <span />
          <span />
          <span className='blind'>퀵 메뉴 버튼</span>
        </div>

        {/* <IconButton icon="ri-menu-fill" styleDef={{ borderRadius: '0px', color: '#FFF' }} viewStatus="" clickEvt={onSideMenu} /> */}
      </div>

      <div
        className='setting'
        style={{
          display:
            settingMenuStatus || sideMenuStatus || quickMenuStatus
              ? 'block'
              : 'none',
        }}
        onClick={() => onClickOut()}
      />
      <LeftSettingMenu
        styleDef={{ height: settingMenuStatus ? '150px' : '0px' }}
        viewStatus={{ settingMenuStatus }}
      />

      <SideMenu
        styleDef={{ width: sideMenuStatus ? '250px' : '0px' }}
        viewStatus={{ sideMenuStatus }}
      />
      {/* <SideMenu styleDef={{ display: sideMenuStatus ? 'block' : 'none' }} /> */}
    </header>
  );
};

ChatHeader.propTypes = {
title: PropTypes.string,
viewType: PropTypes.string,
};
ChatHeader.defaultProps = {
title: '',
viewType: '',
};
export default ChatHeader;
