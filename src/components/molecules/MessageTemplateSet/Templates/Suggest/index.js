import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
/**
 * Text
 */
const Button = ({ boxStyle, item, viewType }) => {
  const { items, type } = item;
  return (
    <>
      <div className="_suggests_div">
        {items.map((word, idx) => {
          return (
            <div key={`${type}_${idx}`} className="_suggest" onClick={e => clickUrlEvt(word[type]?.value)}>
              {ReactHtmlParser(word || '')}
            </div>
          );
        })}
      </div>
    </>
  );
};
Button.propTypes = {
  boxStyle: PropTypes.object,
  item: PropTypes.object,
  viewType: PropTypes.string,
};
Button.defaultProps = {
  boxStyle: {},
  item: {},
  viewType: 'advise', // advise, simulator, knowledge
};

export default Button;
