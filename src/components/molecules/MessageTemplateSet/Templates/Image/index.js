import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import { useDispatch, useSelector } from 'react-redux';
import { disableAllMenu, expandImageUrl, isActiveExpandImageModal } from 'modules/actions/statusMenu';
import { reRenderChat } from 'modules/actions/chat';
/**
 * Image
 */
const Image = ({ boxStyle, item, viewType }) => {
  const dispatch = useDispatch();
  const { items, type, id } = item;
  const handleOnLoad = e => {
    dispatch(reRenderChat());
  };

  const handleOnError = event => {
    event.currentTarget.src = 'images/noimage.png';
    event.currentTarget.className = 'errorImg';
    event.currentTarget.alt = '이미지 로드 실패';
  };

  const ImageBox = useRef();
  const expandImage = url => {
    // event.currentTarget.src = 'images/noimage.png';
    // event.currentTarget.className = 'errorImg';
    // event.currentTarget.alt = '이미지 로드 실패';

    dispatch(disableAllMenu());
    dispatch(isActiveExpandImageModal(true));
    dispatch(expandImageUrl(url));
  };

  return (
    <div>
      <div className="_image_div">
        {items.map((tempItem, idx) => {
          let htmlCheck = false;
          console.log(tempItem);
          const imageSrc = tempItem.image.image.split('"');
          const imageAlt = tempItem.image.alt;
          if (tempItem.image.image.includes('<img')) {
            htmlCheck = true;
          }
          // console.log(tempItem.image.image);
          return (
            <div key={`${id}_${idx}`} className="_box">
              <div
                className="_image_box"
                onClick={() => {
                  expandImage(htmlCheck ? tempItem.image.image.replace('<img src="', '').replace('"></img>', '') : tempItem[type].image);
                }}
                ref={ImageBox}
              >
                {htmlCheck ? (
                  <img src={imageSrc[1]} alt={imageAlt} />
                ) : (
                  <img src={tempItem[type].image} alt={tempItem[type].alt} onLoad={handleOnLoad} onError={handleOnError} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
Image.propTypes = {
  boxStyle: PropTypes.object,
  item: PropTypes.object,
  viewType: PropTypes.string,
};
Image.defaultProps = {
  boxStyle: {},
  item: {},
  viewType: 'advise', // advise, simulator, knowledge
};

export default Image;
