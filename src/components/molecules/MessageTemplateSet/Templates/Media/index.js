import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
/**
 * Media
 */
const Media = ({ boxStyle, item, viewType }) => {
  const { items, type } = item;
  const setItems = items || [];
  return (
    <>
      <div className="_media_div">
        {setItems.map((tempItem, idx) => {
          return (
            <div key={`${type}_${idx}`} className="_box_set">
              <div className="_media_box">
                {tempItem.media.url && tempItem.media.url.startsWith('http') && (
                  <iframe
                    src={tempItem[type].url}
                    title={tempItem[type].desc}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
Media.propTypes = {
  boxStyle: PropTypes.object,
  item: PropTypes.object,
  viewType: PropTypes.string,
};
Media.defaultProps = {
  boxStyle: {},
  item: {},
  viewType: 'advise', // advise, simulator, knowledge
};

export default Media;
