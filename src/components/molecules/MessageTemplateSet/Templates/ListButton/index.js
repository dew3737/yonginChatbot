import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import CarouselSlider from 'components/atoms/TemplateCarouselSlider';
import { Slide } from 'pure-react-carousel';
import ReactHtmlParser from 'react-html-parser';

/**
 * Text
 */
const ListBtnElement = ({ onClickEvt, data, styleDef }) => {
  // console.log(12312312312, onClickEvt);
  return (
    <div className="_list_btn_button" style={styleDef} role="button" tabIndex={0} onClick={e => onClickEvt(data.button.value, data.button.action, data.button.label)} onKeyPress={(e) => {if(e.key === 'Enter'){onClickEvt(data.button.value, data.button.action, data.button.label)}}}>
      {ReactHtmlParser(data.button.label)}
    </div>
  );
};
const ListButton = ({ boxStyle, item, viewType, onClickEvt }) => {
  const { items, type } = item;
  return (
    <>
      <div className="_list_btn">
        {items.map((data, number) => {
          return <ListBtnElement key={'list_btn_ele_' + number} styleDef={boxStyle} onClickEvt={onClickEvt} data={data} />;
          // return (
          //   <div className="_list_btn_card_button" onClick={e => onClickEvt(data.value, data.action)}>
          //     <div className="_button">{ReactHtmlParser(data.label)}</div>
          //   </div>
          // );
        })}
      </div>
    </>
  );
};
ListButton.propTypes = {
  boxStyle: PropTypes.object,
  item: PropTypes.object,
  viewType: PropTypes.string,
  onClickEvt: PropTypes.func,
};
ListButton.defaultProps = {
  boxStyle: {},
  item: {},
  viewType: 'advise', // advise, simulator, knowledge
  onClickEvt: null,
};

ListBtnElement.propTypes = {
  data: PropTypes.object,
  onClickEvt: PropTypes.func,
  styleDef: PropTypes.object,
};
ListBtnElement.defaultProps = {
  data: {},
  onClickEvt: null,
  styleDef: {},
};

export default ListButton;
