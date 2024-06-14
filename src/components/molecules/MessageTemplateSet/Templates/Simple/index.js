import React, { useState, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import scroll from 'modules/utils/scroll';
/**
 * Simple
 */
const Simple = ({ boxStyle, item, viewType, idx }) => {
  // console.log("ReactHtmlParser")
  // console.log('idx!!!!!!!!!!!!!!!!', idx);
  const text = useRef();
  let classTitle = '_message';
  if (idx !== 0) {
    classTitle = '_message2';
  }
  text.current?.childNodes.forEach((ele, i) => {
    if (ele.tagName === 'IMG') {
      ele.onload = () => {
        scroll();
      };
    }
  });

  return (
    <div className="_text_div">
      <div className={classTitle} style={boxStyle} ref={text}>
        {ReactHtmlParser(item.text || '')}
      </div>
    </div>
  );
};
Simple.propTypes = {
  boxStyle: PropTypes.object,
  item: PropTypes.object,
  viewType: PropTypes.string,
  idx: PropTypes.number,
};
Simple.defaultProps = {
  boxStyle: {},
  item: {},
  viewType: 'advise', // advise, simulator, knowledge
  idx: 0,
};

export default Simple;
