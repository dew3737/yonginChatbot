import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuality } from 'modules/actions/quality';
import { disableAllMenu } from 'modules/actions/statusMenu';

const Response = () => {
  const dispatch = useDispatch();
  const responseMessage = useSelector(state => state.quality.response);

  useEffect(() => {
    let timeout;
    if (responseMessage.length !== 0) {
      timeout = setTimeout(() => {
        dispatch(setQuality({ response: [] }));
        dispatch(disableAllMenu());
      }, 1500);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [responseMessage.length]);

  return (
    <div className="feedback_bg">
      <div className="feedback_area_res">
        <div className="confirm_icn">
          <div className="img" />
        </div>
        <div className="confirm_box">
          {responseMessage.map(i => {
            return <p key={i.text}>{i.text}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Response;
