import React, { useEffect, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import MessageDiv from 'components/molecules/MessageDiv';
import ChatMenu from 'components/molecules/ChatMenu';
import { useSelectChatBottom } from 'modules/hooks';
import { useDispatch, useSelector } from 'react-redux';

/**
 * Chatting:Middle
 */
const ChatMiddle = () => {
  const chatResult = useSelector(state => state.chatList);
  const messageSet = chatResult.data;
  const messageBoxRef = useRef();
  // console.log('messageSet!!!', messageSet);

  useSelectChatBottom();

  return (
    <section className="_chat_middle">
      <div className="_message_div">
        <div className="_message_layout scroll_style_messenger" id="scrollToElement" ref={messageBoxRef}>
          {messageSet.map((item, idx) => {
            return <MessageDiv key={item.messageId} message={item} index={idx} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default ChatMiddle;
