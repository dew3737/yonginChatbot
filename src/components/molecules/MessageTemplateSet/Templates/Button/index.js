import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
/**
 * Quick Button
 */
const Arrow = () => {
  return (
    <svg style={{ marginLeft: '3px' }} width="18" height="15" viewBox="0 0 18 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 7H16L9.26979 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};
const QuickBtn = ({ tempItem, idx, boxStyle, onClickEvt }) => {
  return (
    <div className="_quick_buttons_area">
      <div className="_button" role="button" tabIndex={0} style={boxStyle} onClick={e => onClickEvt(tempItem.button.value, tempItem.button.action, tempItem.button.label)} onKeyPress={e => {if(e.key === 'Enter') {onClickEvt(tempItem.button.value, tempItem.button.action, tempItem.button.label)}}}>
        {ReactHtmlParser(`${tempItem.button?.label}`)}
        {tempItem.button.action === 'url' ? <Arrow /> : ''}
      </div>
    </div>
  );
};

const Button = ({ boxStyle, item, viewType, onClickEvt }) => {
  const { items, id, type } = item;
  return (
    <>
      <div className="_quick_buttons_div">
        {/* {items.map((tempItem, idx) => {
          return (
            <div className="_quick_buttons_area">
              <div
                key={`${tempItem.button?.label}_${idx}`}
                className="_button"
                style={boxStyle}
                onClick={e => onClickEvt(tempItem.button.value, tempItem.button.action)}
              >
                {ReactHtmlParser(tempItem.button?.label || '')}
              </div>
            </div>
          );
        })} */}
        {items.map((tempItem, idx) => {
          return <QuickBtn key={`${tempItem.button?.label}_${idx}`} tempItem={tempItem} idx={idx} boxStyle={boxStyle} onClickEvt={onClickEvt} />;
        })}
      </div>
    </>
  );
};
Button.propTypes = {
  boxStyle: PropTypes.object,
  item: PropTypes.object,
  viewType: PropTypes.string,
  onClickEvt: PropTypes.func,
};
Button.defaultProps = {
  boxStyle: {},
  item: {},
  viewType: 'advise', // advise, simulator, knowledge
  onClickEvt: null,
};

QuickBtn.propTypes = {
  boxStyle: PropTypes.object,
  idx: PropTypes.number,
  tempItem: PropTypes.object,
  onClickEvt: PropTypes.func,
};
QuickBtn.defaultProps = {
  boxStyle: {},
  idx: 0,
  tempItem: {},
  onClickEvt: null,
};

export default Button;
