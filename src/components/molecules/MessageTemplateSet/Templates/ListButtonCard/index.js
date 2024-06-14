import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import CarouselSlider from 'components/atoms/TemplateCarouselSlider';
import { Slide } from 'pure-react-carousel';
import ReactHtmlParser from 'react-html-parser';

/**
 * Text
 */
const ListBtnElement = ({ onClickEvt, data, tabIndex }) => {
  // console.log(12312312312, onClickEvt);

  return (
    <div
      className="_list_btn_card_button"
      onClick={e => onClickEvt(data.value, data.action, data.label)}
      role="button"
      tabIndex={tabIndex}
      onKeyPress={e => {
        if (e.key === 'Enter') {
          onClickEvt(data.value, data.action, data.label);
        }
      }}
    >
      {ReactHtmlParser(data.label)}
    </div>
  );
};
const ListButtonCard = ({ boxStyle, item, viewType, onClickEvt }) => {
  const { items, type } = item;
  const slideBoxSet = boxStyle;
  const slideBoxSetStyle = {
    width: `${slideBoxSet.width}px`,
    height: slideBoxSet.height,
    margin: `0 ${slideBoxSet.margin}px`,
    outline: 'none',
  };
  const slideLength = items.length;

  let firstIndex = -1;

  const constentSet = () => {
    return (
      <>
        {items.map((tempItem, idx) => {
          console.log('ListButtonCard idx :::', idx);
          return (
            <Slide key={`slide_${idx}`} className="_list_btn_card" style={slideBoxSetStyle}>
              <div className="_list_btn_card_title">
                <div className="_title">{ReactHtmlParser(tempItem.text.desc)}</div>
              </div>
              {tempItem.button.map((data, number) => {
                console.log(123123, data);

                if (firstIndex === -1 && data.value !== '') {
                  firstIndex = idx;
                }

                return data.value && data.label ? (
                  <ListBtnElement key={'list_btn_ele_' + number} onClickEvt={onClickEvt} data={data} tabIndex={idx === firstIndex ? 0 : -1} />
                ) : (
                  ''
                );

                // return (
                //   <div className="_list_btn_card_button" onClick={e => onClickEvt(data.value, data.action)}>
                //     <div className="_button">{ReactHtmlParser(data.label)}</div>
                //   </div>
                // );
              })}
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
ListButtonCard.propTypes = {
  boxStyle: PropTypes.object,
  item: PropTypes.object,
  viewType: PropTypes.string,
  onClickEvt: PropTypes.func,
};
ListButtonCard.defaultProps = {
  boxStyle: {},
  item: {},
  viewType: 'advise', // advise, simulator, knowledge
  onClickEvt: null,
};

ListBtnElement.propTypes = {
  data: PropTypes.object,
  onClickEvt: PropTypes.func,
  tabIndex: PropTypes.number,
};
ListBtnElement.defaultProps = {
  data: {},
  onClickEvt: null,
  tabIndex: 0,
};

export default ListButtonCard;
