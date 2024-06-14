import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
/**
 * ImageButton
 */
const ImageButton = ({ boxStyle, item, viewType, onClickEvt }) => {
  const { items, type, id } = item;
  return (
    <>
      <div className="_image_buttons_div">
        {items.map((tempItem, idx) => {
          return (
            <div
              key={`${id}_${idx}`}
              style={boxStyle}
              className="_button"
              onClick={e => onClickEvt(tempItem.image_btn.value, tempItem.image_btn.action, tempItem.image_btn.label)}
            >
              <div className="_label">
                <div className="_txt">{tempItem.image_btn.label}</div>
              </div>
              <div className="_image_box">{ReactHtmlParser(tempItem.image_btn.image)}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};
ImageButton.propTypes = {
  boxStyle: PropTypes.object,
  item: PropTypes.object,
  viewType: PropTypes.string,
  onClickEvt: PropTypes.func,
};
ImageButton.defaultProps = {
  boxStyle: {},
  item: {},
  viewType: 'advise', // advise, simulator, knowledge
  onClickEvt: null,
};

export default ImageButton;
