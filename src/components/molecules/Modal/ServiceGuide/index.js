import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from 'components/atoms/Button/IconButton';
import { disableAllMenu } from 'modules/actions/statusMenu';
import { sendSatisfy } from 'modules/actions/starScore';
import './style.scss';
const ServiceGuide = () => {
  const dispatch = useDispatch();
  const closeServiceGuide = () => {
    dispatch(disableAllMenu());
    // setPayloadStatus({ score: 5, name: '매우만족', content: '', status: 'N' });
  };
  const [displayStatus, setDisplayStatus] = useState({ guide: true, auto: false });

  // // state
  // const [payloadStatus, setPayloadStatus] = useState({ score: 5, name: '매우만족', content: '' });
  // const StarName = ['매우불편', '불편', '보통', '만족', '매우만족'];

  // // event
  const changeDisplay1 = () => {
    setDisplayStatus({ guide: true, auto: false });
  };
  const changeDisplay2 = () => {
    setDisplayStatus({ guide: false, auto: true });
  };

  // const setContentValue = contentStr => {
  //   if (contentStr) {
  //     setPayloadStatus({ ...payloadStatus, content: contentStr, status: 'Y' });
  //   } else {
  //     setPayloadStatus({ ...payloadStatus, content: contentStr, status: 'N' });
  //   }
  // };
  const helpTapRef = useRef();
	  useEffect(() => {
	       if(helpTapRef.current){
  	            helpTapRef.current.focus();
	        }
  }, []);
  return (
    <div className="help_area">
      <div className="help_header">
        <span>이용 안내</span>
        <i className="ri-close-line" role="button" tabIndex={0} onClick={closeServiceGuide} onKeyPress={(e) => {if(e.key === 'Enter'){closeServiceGuide();}}}/> 
      </div>
      <div className="help_tab_area">
        <div
          className="help_tab"
		  ref={helpTapRef}
	      role="button"
	      tabIndex={0}
          onClick={changeDisplay1}
          onKeyPress={(e) => {if(e.key === 'Enter'){changeDisplay1();}}}
          style={{
            borderBottom: displayStatus.guide ? '2px #0061af solid' : '',
            color: displayStatus.guide ? '#0061af' : '',
          }}
        >
          챗봇 화면 안내
        </div>
        <div
          className="help_tab"
	  role="button"
	  tabIndex={0}
          onClick={changeDisplay2}
	  onKeyPress={(e) => {if(e.key === 'Enter'){changeDisplay2();}}}
          style={{
            borderBottom: displayStatus.auto ? '2px #0061af solid' : '',
            color: displayStatus.auto ? '#0061af' : '',
          }}
        >
          질문 자동 완성
        </div>
      </div>
      <div className="help_content">
        <img src="/chat/ibricks/images/help_03.png" alt="왼쪽 상단 대화 설정 버튼으로 폰트 크기설정 작게 보통 크게 자동 완성 설정 켜기 끄기 조절 가능. 오른쪽 퀵메뉴 버튼으로 처음으로 이용안내 대화가이드 서비스 만족도 평가 가능. 왼쪽 아래 버튼은 홈버튼으로 분야별 안내 담당 안내 행정기관 안내 처음으로 민원발급기 위치 민원접수 자주하는 질문 도움말 기능 가능. 화면 가장 아래 입력창은 대화 입력창" className="img_help" style={{ display: displayStatus.guide ? 'inline-block' : 'none' }} />
        <img src="/chat/ibricks/images/help_04.png" alt="질문 자동 완성 이미지 입력한 키워드가 포함된 질문이 자동으로 추천됩니다. 예방접종 입력시 예방접종 증명서 발급 안내, 예방접종 주의사항, 영유아 예방접종 안내 표시" className="img_help" style={{ display: displayStatus.auto ? 'inline-block' : 'none' }} />
      </div>
    </div>
  );
};

export default ServiceGuide;
