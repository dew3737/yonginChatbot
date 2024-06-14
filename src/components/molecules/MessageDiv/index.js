import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Element } from 'react-scroll';
import CustomerMessage from 'components/molecules/MessageTemplateSet/CustomerMessage';
import BotMessage from 'components/molecules/MessageTemplateSet/BotMessage';
import { useSelector } from 'react-redux';

/**
 * MessageDiv
 */
const MessageDiv = ({ message, index }) => {
  // console.log(`message:::::::::${JSON.stringify(message)}`);

  const fontSize = useSelector(state => state.fontSize.size);

  const { chatType, messageId, response_type } = message;

  const setItem = item => {
    try {
      if (chatType === 'customer') {
        const customerItem = {
          messageId: item.messageId,
          createAt: item.createAt,
          messages: item.messages,
        };
        return <CustomerMessage key={`${messageId}`} item={customerItem} boxStyle={{ fontSize }} />;
      }
      if (chatType === 'bot') {
        // console.log(`BOT::::::: ${JSON.stringify(message)}`);
        const botItem = {
          id: item.id,
          messageId: item.messageId,
          emotion: item.data.emotion,
          createAt: item.createAt,
          messages: item.data.speech,
          templateMessages: item.data.messages,
          response_status: item.data.response_status,
        };
        return <BotMessage key={`${messageId}`} index={index} item={botItem} responseType={response_type} boxStyle={{ fontSize }} />;
        // return <div>BBBB</div>;
      }

      return false;
    } catch (e) {
      return false;
    }
  };

  return <Element name={messageId}>{setItem(message)}</Element>;
};

MessageDiv.propTypes = {
  message: PropTypes.object,
  index: PropTypes.number,
};
MessageDiv.defaultProps = {
  message: {},
  index: 0,
};

export default MessageDiv;
