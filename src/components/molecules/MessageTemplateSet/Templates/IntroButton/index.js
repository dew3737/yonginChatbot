import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import ButtonUnderText from 'components/atoms/Button/Button.underText';

/**
 * IntroButton
 */
const IntroButton = ({ boxStyle, item, viewType, viewStatus, onClickEvt }) => {
  const { items, type, id } = item;
  return (
    <>
      <div className="_intro_buttons_area">
        <div className="_intro_buttons_div">
          {items.map((tempItem, idx) => {
            return (
              <div
                key={`${id}_${idx}`}
                style={boxStyle}
                onClick={e => onClickEvt(tempItem.image_btn.value, tempItem.image_btn.action, tempItem.image_btn.label)}
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    onClickEvt(tempItem.image_btn.value, tempItem.image_btn.action, tempItem.image_btn.label);
                  }
                }}
              >
                {/* <div key={`${id}_${idx}`} style={boxStyle} className="_intro_button" onClick={e => onClickEvt(tempItem.image_btn.value)}> */}
                {/* <div className="_intro_image_box">{ReactHtmlParser(tempItem.image_btn.image)}</div>
                <div className="_label">
                  <div className="_txt">{tempItem.image_btn.label}</div>
                </div> */}
                <ButtonUnderText
                  label={tempItem.image_btn.label}
                  value={tempItem.image_btn.value}
                  image={tempItem.image_btn.image}
                  viewStatus={{ viewStatus }}
                  styleDef={{}}
                  error={null}
                  fontSize={boxStyle.fontSize.size}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
IntroButton.propTypes = {
  boxStyle: PropTypes.object,
  item: PropTypes.object,
  viewType: PropTypes.string,
  viewStatus: PropTypes.string,
  onClickEvt: PropTypes.func,
};
IntroButton.defaultProps = {
  boxStyle: {},
  item: {},
  viewType: 'advise', // advise, simulator, knowledge
  viewStatus: '',
  onClickEvt: null,
};

export default IntroButton;
