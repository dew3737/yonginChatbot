import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'components/atoms/Button/IconButton';
import LeftSettingMenu from 'components/molecules/LeftSettingMenu';
import SideMenu from 'components/molecules/SideMenu';
import { isActiveSettingMenu, isActiveSideMenu, disableAllMenu } from 'modules/actions/statusMenu';
import { useDispatch, useSelector } from 'react-redux';
/**
 * Modal :layout
 * desc: ModalBasicLayout
 */
const BasicLayout = ({ label, name, labelIcon, styleDef, viewStatus, clickEvt, error }) => {
  const set = '';
  return (
    <div className="_basic_modal_div" style={styleDef}>
      {viewStatus === '_dim' ? <div className="_dim" /> : ''}
      <div className="_modal_tit_div">
        <div className="_icon" role="button" tabIndex={0}>
          <i className={labelIcon} />
          <span className="_tit">{label}</span>
        </div>
      </div>

      <div className="_name">{name}</div>
      {/* <div className="_middle"></div> */}
      {/* <div className="_bottom"></div> */}
    </div>
  );
};

BasicLayout.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  labelIcon: PropTypes.string,
  styleDef: PropTypes.object,
  viewStatus: PropTypes.string,
  clickEvt: PropTypes.func,
  error: PropTypes.object,
};
BasicLayout.defaultProps = {
  label: '적용',
  name: '',
  labelIcon: '',
  styleDef: {},
  viewStatus: '',
  clickEvt: () => {},
  error: { error: false, msg: '' },
};

export default BasicLayout;
