import React from 'react';
import PropTypes from 'prop-types';
/**
 * 버튼 : 아이콘
 */
const IconButton = ({ icon, styleDef, viewStatus, clickEvt, error, label, tabIndex }) => {
  const set = '';
  const handleOnKeyPress = (e) => {
  if(e.key === 'Enter') {
    clickEvt();
    }
  }
  return (
    <div className="_at_icon_button_div" style={styleDef}>
      {viewStatus === '_dim' ? <div className="_dim" /> : ''}
      <div className="_button_div" role="button" tabIndex={tabIndex} onClick={clickEvt} onKeyPress={handleOnKeyPress}>
        <div className="_icon">
          <i className={icon} style={{ color: styleDef.color }} title={label}/>
        </div>
      </div>
    </div>
  );
};

IconButton.propTypes = {
  icon: PropTypes.string,
  styleDef: PropTypes.object,
  viewStatus: PropTypes.string,
  clickEvt: PropTypes.func,
  error: PropTypes.object,
  label: PropTypes.string,
  tabIndex: PropTypes.number
};
IconButton.defaultProps = {
  icon: 'ri-close-fill',
  styleDef: {},
  viewStatus: '',
  clickEvt: () => {},
  error: { error: false, msg: '' },
  label: '',
  tabIndex: 0
};

export default IconButton;
