import React from 'react';
import PropTypes from 'prop-types';
/**
 * 버튼
 */
const NormalButton = ({ label, labelIcon, styleDef, viewStatus, clickEvt, error }) => {
  const set = '';
  return (
    <div className="_normal_button_div" style={styleDef}>
      {viewStatus === '_dim' ? <div className="_dim" /> : ''}
      <div className="_button_div" onClick={clickEvt}>
        <div className="_icon">
          <i className={labelIcon} />
        </div>
        <div className="_tit">{label}</div>
      </div>
    </div>
  );
};

NormalButton.propTypes = {
  label: PropTypes.string,
  labelIcon: PropTypes.string,
  styleDef: PropTypes.object,
  viewStatus: PropTypes.string,
  clickEvt: PropTypes.func,
  error: PropTypes.object,
};
NormalButton.defaultProps = {
  label: '적용',
  labelIcon: '',
  styleDef: {},
  viewStatus: '',
  clickEvt: () => {},
  error: { error: false, msg: '' },
};

export default NormalButton;
