import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
/**
 * TextBox
 */
const Text = ({ boxStyle, item, viewType }) => {
  const { items, type } = item;
  // console.log(items);
  // console.log(type);
  return (
    <>
      {items.map((tempItem, idx) => {
        return (
          <div key={`${type}_${idx}`} className="_text_div">
            <div className="_message2" style={boxStyle}>
              <div className="_message_title">{ReactHtmlParser(tempItem[type]?.title || '')}</div>
              {ReactHtmlParser(tempItem[type]?.desc || '')}
            </div>
          </div>
        );
      })}
    </>
  );
};
Text.propTypes = {
  boxStyle: PropTypes.object,
  item: PropTypes.object,
  viewType: PropTypes.string,
};
Text.defaultProps = {
  boxStyle: {},
  item: {},
  viewType: 'advise', // advise, simulator, knowledge
};

export default Text;
