import React, { useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Satisfy from 'components/molecules/Modal/Satisfy';
import Feedback from 'components/molecules/Modal/Feedback';
import ConversationGuide from 'components/molecules/Modal/ConversationGuide';
import ServiceGuide from 'components/molecules/Modal/ServiceGuide';
import Response from 'components/molecules/Modal/Feedback/response';
import Organization from 'components/molecules/Modal/Organization';
import ExpandImage from 'components/molecules/Modal/ExpandImage';
import Loading from 'components/molecules/Modal/Loading';

/**
 * Chatting:Middle
 */

const ChatMiddle = () => {
  const isActive = useSelector(state => state.isActive);
  return (
    <>
      {isActive.satisfyModal ? <Satisfy /> : null}
      {isActive.feedbackModal ? <Feedback /> : null}
      {isActive.feedbackResponseModal ? <Response /> : null}
      {isActive.conversationGuideModal ? <ConversationGuide /> : null}
      {isActive.serviceGuideModal ? <ServiceGuide /> : null}
      {isActive.organizationModal ? <Organization /> : null}
      {isActive.expandImageModal ? <ExpandImage /> : null}
      {isActive.loading ? <Loading /> : null}
    </>
  );
};

export default ChatMiddle;
