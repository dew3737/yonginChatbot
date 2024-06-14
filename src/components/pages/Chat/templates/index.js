import React, { useState, useLayoutEffect } from 'react';
import Header from 'components/organisms/ChatHeader';
import Middle from 'components/organisms/ChatMiddle';
import Footer from 'components/organisms/ChatFooter';
import ChatModal from 'components/organisms/ChatModal';
const ChatTemplate = () => {
  return (
    <div className="frame_set" style={{ zIndex: 9999, width: '100%', height: '100vh', position: 'relative' }}>
      <Header />
      <Middle />
      <Footer />
      <ChatModal />
    </div>
  );
};

export default ChatTemplate;
