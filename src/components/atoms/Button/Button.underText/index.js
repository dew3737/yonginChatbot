import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
/**
 * 버튼
 */
const ButtonUnderText = ({ label, value, labelIcon, styleDef, viewStatus, onClickEvt, error, image }) => {
  const set = '';
  const imageSrc = image.split('"');
  return (
    <div className="_btn_under_txt_div" style={styleDef} onClick={onClickEvt} onKeyPress={e => {if(e.key ==='Enter') {onClickEvt();}}}>
      {viewStatus === '_dim' ? <div className="_dim" /> : ''}
      <div className="_btn_div">
{viewStatus.viewStatus === true || viewStatus.viewStatus === 'intro' ?
        <div className="_icon" role="button" tabIndex={0}>
          {labelIcon !== 'ri-cloud-line' ? (
            <i className={labelIcon} title={label+' 버튼'}/>
          ) : (
            <div> {image.includes('<img') ? <img src={imageSrc[1]} alt={label} /> : <img src={image} alt={label} />}</div>
          )}
        </div>
        :
        <div className="_icon" role="button" tabIndex={-1}>
          {labelIcon !== 'ri-cloud-line' ? (
            <i className={labelIcon} title={label+ ' 버튼'}/>
          ) : (
            <div> {image.includes('<img') ? <img src={imageSrc[1]} alt={label} /> : <img src={image} alt={label} />}</div>
          )}
        </div>
 }
        <div className="_txt">{label}</div>
      </div>
    </div>
  );
};

ButtonUnderText.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  labelIcon: PropTypes.string,
  image: PropTypes.string,
  styleDef: PropTypes.object,
  viewStatus: PropTypes.string,
  onClickEvt: PropTypes.func,
  error: PropTypes.object,
};
ButtonUnderText.defaultProps = {
  label: '적용',
  value: '',
  image: '',
  labelIcon: 'ri-cloud-line',
  styleDef: {},
  viewStatus: '',
  onClickEvt: () => {},
  error: { error: false, msg: '' },
};

export default ButtonUnderText;
