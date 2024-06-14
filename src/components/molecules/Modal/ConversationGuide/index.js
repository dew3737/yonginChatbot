import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from 'components/atoms/Button/IconButton';
import { disableAllMenu } from 'modules/actions/statusMenu';
import { sendSatisfy } from 'modules/actions/starScore';
import './style.scss';
const ConversationGuide = () => {
  const dispatch = useDispatch();
  const closeConversationGuide = () => {
    dispatch(disableAllMenu());
    // setPayloadStatus({ score: 5, name: '매우만족', content: '', status: 'N' });
  };
  const [displayStatus, setDisplayStatus] = useState({ help_content: true, guide_content: false });

  // // state
  // const [payloadStatus, setPayloadStatus] = useState({ score: 5, name: '매우만족', content: '' });
  // const StarName = ['매우불편', '불편', '보통', '만족', '매우만족'];

  // // event
  const changeDisplayHelp = () => {
    setDisplayStatus({ help_content: true, guide_content: false });
  };
  const changeDisplayGuide = () => {
    setDisplayStatus({ help_content: false, guide_content: true });
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
  const handleOnKeyPress = (e) => {if(e.key === 'Enter') {closeConverstationGuide();}}
  return (
    <div className="help_area">
      <div className="help_header">
        <span>대화 가이드</span>
        <i className="ri-close-line" role="button" tabIndex={0} onClick={closeConversationGuide} onKeyPress={(e) => {if(e.key === 'Enter'){closeConversationGuide();}}}/>
      </div>
      <div className="help_tab_area">
        <div
          className="help_tab"
		  ref={helpTapRef}
	      role="button"
	      tabIndex={0}
          onClick={changeDisplayHelp}
	      onKeyPress={(e) => {if(e.key === 'Enter'){changeDisplayHelp();}}}
          style={{
            borderBottom: displayStatus.help_content ? '2px #0061af solid' : '',
            color: displayStatus.help_content ? '#0061af' : '',
          }}
        >
          챗봇 활용팁
        </div>
        <div
          className="help_tab"
	  role="button"
	  tabIndex={0}
          onClick={changeDisplayGuide}
	  onKeyPress={(e) => {if(e.key ==='Enter') {changeDisplayGuide();}}} 
          style={{
            borderBottom: displayStatus.guide_content ? '2px #0061af solid' : '',
            color: displayStatus.guide_content ? '#0061af' : '',
          }}
        >
          만족도 평가
        </div>
      </div>
      <div className="help_content" style={{ display: displayStatus.help_content ? 'block' : 'none' }}>
        <div className="guide_title">챗봇 활용팁</div>
        <div className="guide_sub">
          챗봇 사용은 처음이신가요?
          <br />
          챗봇과 더 쉽게 대화하는 방법을 알려드릴게요!
        </div>
        <img src="/chat/ibricks/images/guide_03.png" alt="챗봇 활용팁 1.챗봇은 간단명료한 말을 좋아해요. 예시) 무인민원발급기 위치 알려줘, 자동차 신규등록 2.대화를 처음부터 다시 하고 싶으신가요? 처음으로라고 입력해보세요. 상단 메뉴 또는 홈메뉴에서 처음으로 버튼을 누르셔도 돼요. 3.대화를 그만하고 싶으시다구요? 대화종료라고 입력해주세요. 서비스 향상을 위한 만족도 평가도 잊지 마세요. 기능과 메뉴에 대한 설명은 이용안내 메뉴에서 확인하실 수 있어요." className="img_help" />
      </div>

      <div className="help_content guide_content" style={{ display: displayStatus.guide_content ? 'block' : 'none' }}>
        <div className="guide_title">만족도 평가</div>
        <div className="guide_sub">
          더욱 똑똑한 &apos;조아용&apos;으로 성장할 수 있도록
          <br />
          많은 관심과 의견 보내주세요!
        </div>

        <img src="/chat/ibricks/images/guide_04.png" alt="만족도 평가 더욱똑똑한 조아용으로 성장할 수 있도록 많은 관심과 의견 보내주세요. 의견 남기기 버튼을 누르시면 응답에 대한 의견을 남길 수 있어요. 학습에 큰 도움이 됩니다. 챗봇 이용 후 만족도를 알려주세요. 별점 평가와 조아용에게 하고 싶은 말을 남겨주세요. 모두에게 매우 만족을 받는 날까지 노력할게요." className="img_help" />
      </div>
    </div>
  );
};

export default ConversationGuide;
