import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import { Slide } from 'pure-react-carousel';
import CarouselSlider from 'components/atoms/TemplateCarouselSlider';
/**
 * Large_CardDefault
 */
const SmallCard = ({ boxStyle, item, viewType, onClickEvt }) => {
  const { items } = item;
  const slideBoxSet = boxStyle;
  const slideBoxSetStyle = {
    width: `${slideBoxSet.width}px`,
    height: slideBoxSet.height,
    margin: `0 ${slideBoxSet.margin}px`,
  };
  const slideLength = items.length;
  const constentSet = () => {
    return (
      <>
        {items.map((tempItem, idx) => {
          const tempImage = ReactHtmlParser(tempItem.image.image);
          return (
            <Slide key={`slide_${idx}`} className="_small_card" style={slideBoxSetStyle} tabIndex={`${idx}`}>
              <div className="_title">
                <div className="_label">
                  <div className="_label_tit" title="">
                    {tempItem.textbox.title}
                  </div>
                </div>
              </div>
              <div className="_cont_image">
                <div className="_image_box">
                  {tempImage}
                  {/* <img src={tempItem.image.image} alt={tempItem.image.alt} /> */}
                </div>
              </div>
              <div className="_desc_box">
                <div className="_desc">{tempItem.textbox.desc}</div>
              </div>
              <div className="_button_div" onClick={e => onClickEvt(tempItem.button.value, tempItem.button.action, tempItem.button.label)}>
                <div className="_button_box">{tempItem.button.label}</div>
              </div>
            </Slide>
          );
        })}
      </>
    );
  };
  return (
    <>
      <div className="_carousel_button_div">
        <CarouselSlider slideBoxSet={slideBoxSet} contentCount={slideLength} contentSet={constentSet} />
      </div>
    </>
  );
};
SmallCard.propTypes = {
  boxStyle: PropTypes.object,
  item: PropTypes.object,
  viewType: PropTypes.string,
  onClickEvt: PropTypes.func,
};
SmallCard.defaultProps = {
  boxStyle: { width: 150, margin: 10, height: '220px' },
  item: {},
  viewType: 'advise', // advise, simulator, knowledge
  onClickEvt: null,
};

export default SmallCard;
