import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import { Slide } from 'pure-react-carousel';
import CarouselSlider from 'components/atoms/TemplateCarouselSlider';
/**
 * Large_CardDefault
 */
const LargeCard = ({ boxStyle, item, viewType, onClickEvt }) => {
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
          // console.log(1231312, tempItem);
          const tempImage = ReactHtmlParser(tempItem.image.image);
          return (
            <Slide key={`slide_${idx}`} className="_large_card" style={slideBoxSetStyle} tabIndex={`${idx}`}>
              <div className="_title">
                <div className="_label">
                  <div className="_label_tit" title="">
                    {tempItem.textbox.title}
                  </div>
                  <div className="_label_sub_tit" title="">
                    {tempItem.textbox.desc}
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
                <div className="_desc">{tempItem.text.desc}</div>
              </div>
              <div className="link_div" onClick={e => onClickEvt(tempItem.button.value, tempItem.button.action)}>
                <div className="_link_box">{tempItem.button.label}</div>
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
LargeCard.propTypes = {
  boxStyle: PropTypes.object,
  item: PropTypes.object,
  viewType: PropTypes.string,
  onClickEvt: PropTypes.func,
};
LargeCard.defaultProps = {
  boxStyle: { width: 150, margin: 10, height: '220px' },
  item: {},
  viewType: 'advise', // advise, simulator, knowledge
  onClickEvt: null,
};

export default LargeCard;
