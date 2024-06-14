import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { disableAllMenu, isActiveExpandImageModal } from 'modules/actions/statusMenu';
import './style.scss';
const Loading = () => {
  const dispatch = useDispatch();

  return (
    <div className="popup_loading_main">
      <span> 현재 위치 정보를 가져오는중...</span>
      <div className="loadingio-spinner-ripple-rrdcxdwt1hp" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <div className="ldio-bl3f74ldijf">
          <div />
          <div />
        </div>
      </div>
    </div>
  );
};

export default Loading;
