import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from 'components/atoms/Button/IconButton';
import { disableAllMenu } from 'modules/actions/statusMenu';
import { sendSatisfy } from 'modules/actions/starScore';

const Satisfy = () => {
  const dispatch = useDispatch();
  const textRef = useRef();
  useEffect(() => {
      if(textRef.current){
              textRef.current.focus();
        }
  }, []);
  const closeSatisfy = () => {
    dispatch(disableAllMenu());
    setPayloadStatus({ score: 5, name: '매우만족', content: '', status: 'N' });
  };

  // state
  const [payloadStatus, setPayloadStatus] = useState({ score: 5, name: '매우만족', content: '' });
  const StarName = ['매우불편', '불편', '보통', '만족', '매우만족'];

  // event
  const setStarValue = (scoreStr, nameStr) => {
    setPayloadStatus({ ...payloadStatus, score: scoreStr, name: nameStr });
  };

  const setContentValue = contentStr => {
    if (contentStr) {
      setPayloadStatus({ ...payloadStatus, content: contentStr, status: 'Y' });
    } else {
      setPayloadStatus({ ...payloadStatus, content: contentStr, status: 'N' });
    }
  };
  return (
    <div className="_satisfy_bg">
      <div className="feedback_area">
        {/* <div className="opnion_icon">
          <IconButton icon="ri-thumb-up-line" styleDef={{ margin: '4px 3px 0 0', width: '16px', fontSize: '16px', height: '16px', color: '#0061AF' }} />
          <span>서비스 만족도 평가</span>
        </div> */}
        <i className="ri-close-line" role="button" tabIndex={2} title='닫기 버튼' onClick={closeSatisfy} onKeyPress={(e) => {if(e.key === 'Enter'){closeSatisfy();}}} />

        <div className="fd_name">별을 탭하여 평가해주세요.</div>
        <div className="star_set">
          {StarName.map((name, i) => (
            <IconButton
              key={`_star_${i + 1}`}
              clickEvt={() => {
                setStarValue(i + 1, name);
              }}
              icon={payloadStatus.score >= i + 1 ? 'ri-star-fill' : 'ri-star-line'}
              styleDef={{ width: '40px', fontSize: '40px', height: '40px', color: '#0061AF' }}
              tabIndex='1'
            />
          ))}
        </div>
        <div className="fd_name">{payloadStatus.name}</div>
        <textarea
	  title="만족도 입력창"
	      ref={textRef}
          maxLength="300"
          className="feed_input_textarea"
          placeholder="답변에 대한 의견을 자유롭게 남겨주세요."
          value={payloadStatus.content}
          onChange={e => {
            setContentValue(e.target.value);
            // dispatch(changeStarScore({ score: currentStarScore.score, name: currentStarScore.name, content: e.target.value }));
          }}
          tabIndex={1}
        />
        <div
          className="fd_send_btn" role="button" tabIndex={1}
          onClick={() => {
            if (!sessionStorage.getItem('satisfy_status')) {
              sessionStorage.setItem('satisfy_status', 'N');
            }
            if (sessionStorage.getItem('satisfy_status') === 'Y') {
              const sign = window.confirm('이미 만족도 평가를 완료하셨습니다. 수정하시겠습니까?');
              if (sign) {
                dispatch(sendSatisfy(payloadStatus));
                setPayloadStatus({ score: 5, name: '매우만족', content: '' });
              }
            } else {
              dispatch(sendSatisfy(payloadStatus));
              setPayloadStatus({ score: 5, name: '매우만족', content: '' });
              sessionStorage.setItem('satisfy_status', 'Y');
            }
            dispatch(disableAllMenu());
          }}
          onKeyPress={(e) => {
            if(e.key === 'Enter') {
            if (!sessionStorage.getItem('satisfy_status')) {
              sessionStorage.setItem('satisfy_status', 'N');
            }
            if (sessionStorage.getItem('satisfy_status') === 'Y') {
              const sign = window.confirm('이미 만족도 평가를 완료하셨습니다. 수정하시겠습니까?');
              if (sign) {
                dispatch(sendSatisfy(payloadStatus));
                setPayloadStatus({ score: 5, name: '매우만족', content: '' });
              }
            } else {
              dispatch(sendSatisfy(payloadStatus));
              setPayloadStatus({ score: 5, name: '매우만족', content: '' });
              sessionStorage.setItem('satisfy_status', 'Y');
            }
            dispatch(disableAllMenu());
          }
        }
        }
        >
          확인
        </div>
      </div>
    </div>
  );
};

export default Satisfy;
