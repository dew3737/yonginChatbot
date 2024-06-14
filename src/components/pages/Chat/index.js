import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import QueryStirng from 'query-string';
import { chatList } from 'modules/actions/chat';
import Template from 'components/pages/Chat/templates';
import { fetchOptions } from 'modules/actions/quality';

const Chat = ({ match, location }) => {
  const dispatch = useDispatch();
  const { search } = location;
  const paramObj = QueryStirng.parse(search);

  const paramSet = {
    inType: 'intro',
    inStr: '',
  };

  useEffect(() => {
    // dispatch(fetchOptions());
    dispatch(
      chatList({
        inType: 'intro',
        inStr: '',
      })
    );
    sessionStorage.removeItem('latitude_y');
    sessionStorage.removeItem('longitude_x');
    sessionStorage.removeItem('address');
  }, []);

  return <Template />;
};
Chat.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
};

Chat.defaultProps = {
  match: {},
  location: {},
};
export default Chat;
