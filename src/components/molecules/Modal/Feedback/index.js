import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import './style.scss';
import { disableAllMenu } from 'modules/actions/statusMenu';
import { sendQuality, setQuality, setResponse } from 'modules/actions/quality';
const Feedback = () => {
  const dispatch = useDispatch();

  const messageId = useSelector(state => state.quality.messageId);
  const options = useSelector(state => state.quality.options);
  // const responseMessage = useSelector(state => state.quality.response);

  const textRef = useRef();
  const feedbackRef = useRef();
  const [params, setParams] = useState({
    sel: '',
    text: '',
  });

  const closeModal = () => {
    dispatch(disableAllMenu());
  };

  const checkQuality = value => {
    setParams(prevState => {
      return {
        sel: value,
        text: prevState.text,
      };
    });
  };
  useEffect(() => {
      if(feedbackRef.current){
             feedbackRef.current.focus();
         }
  }, []);

  // useEffect(() => {
  //   let timeout;
  //   if (responseMessage.length !== 0) {
  //     timeout = setTimeout(() => {
  //       dispatch(setQuality({ response: [] }));
  //       dispatch(disableAllMenu());
  //     }, 3000);
  //   }
  //
  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, [responseMessage.length]);

  const confirmEvt = () => {
    if (params.sel === '' || params.text === '') return false;
    const payload = {
      message_id: messageId,
      in_type: 'quality',
      quality: {
        value: params.sel,
        // ...options[sel - 1],
        comment: textRef.current.value,
      },
    };
    dispatch(sendQuality(payload));
  };

  const setParamsText = () => {
    setParams(prevState => {
      return {
        sel: prevState.sel,
        text: textRef.current.value,
      };
    });
  };

  return (
    <div className="feedback_bg">
      <div className="feedback_area">
        <i className="ri-close-line" role="button" tabIndex={2} title='닫기 버튼' onClick={closeModal} onKeyPress={(e) => {if(e.key === 'Enter'){closeModal();}}}/>
        {/* <div className="fd_icon_area">
          <div className="opnion_icon">
             <ion-icon name="mail-outline" />
            <span>의견남기기</span> 
          </div>
        </div> */}
        <div className="fd_name fd_name_01">사용자 의견 남기기</div>
        {/* <div className="fd_name fd_name_02">사용자 의견</div> */}
        <div className="fd_btn_text">답변이 어땠는지 평가해주세요.</div>
        <div>
          {options.map((i, count) => {
            const className = params.sel === i.value ? '_quality_item _sel' : '_quality_item';
            if(count === 0) {
                return (
                    <div key={i.value} className={className} role="button" tabIndex={1} onClick={() => checkQuality(i.value)} onKeyPress={e => {if(e.key === 'Enter') {checkQuality(i.value)}}} ref={feedbackRef}>
                        {i.message}
                    </div>
                )
            }
            return (
                <div key={i.value} className={className} role="button" tabIndex={1} onClick={() => checkQuality(i.value)} onKeyPress={e => {if(e.key === 'Enter') {checkQuality(i.value)}}}>
                    {i.message}
                </div>
            )           
          })}
        </div>
        <div className="fd_btn_text">답변 관련 의견을 남겨주세요.</div>
        <textarea
	  title="의견남기기 입력창"
          ref={textRef}
          maxLength="300"
          className="feed_input_textarea"
          onChange={setParamsText}
          placeholder="답변에 대한 의견을 자유롭게 남겨주세요."
          tabIndex={1}
        />
        <p className="comment" style={{ display: params.sel === '' || params.text === '' ? '' : 'none' }}>
          평가 및 의견 작성 필수
        </p>
        <div className={`fd_send_btn ${params.sel === '' || params.text === '' ? '_inactive' : ''}`} role="button" tabIndex={1} onClick={confirmEvt} onKeyPress={e => {if(e.key === 'Enter') {confirmEvt();}}}>
          확인
        </div>
      </div>
    </div>
  );
};

export default Feedback;
