import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { chatList } from 'modules/actions/chat';
import { imageData } from 'components/molecules/MessageTemplateSet/BotMessage/imageData';
import ReactHtmlParser from 'react-html-parser';
import IconButton from 'components/atoms/Button/IconButton';
import {
  SimpleMessage,
  TextMessage,
  ButtonMessage,
  ImageButtonMessage,
  MediaMessage,
  ImageMessage,
  CardDefault,
  BigCard,
  ListBtnCard,
  ListBtn,
  SmallCard,
  IntroButton,
  AdministrativeMap,
  CivilissuanceMap,
} from 'components/molecules/MessageTemplateSet/Templates/index';
import { isActiveFeedbackModal, loading } from 'modules/actions/statusMenu';
import { setMessageId } from 'modules/actions/quality';
/**
 * BotMessage
 */
const BotMessage = ({ boxStyle, item, responseType, index }) => {
  // console.log(12312, imageData);
  const dispatch = useDispatch();
  const isQualitySend = useSelector(state => state.chatList.data[index].isQualitySend);
  const intro = 'intro';
  const onSendMessage = (inStr, inType, inLabel) => {
    if (inType !== 'url') {
      if (inStr === 'sysytem_Location_Allow_Y') {
        console.log('# Send geoLocation');
        getLocation(inStr, inType, inLabel);
      } else {
        const paramSet = {
          inType: inType || 'query',
          inStr,
          inLabel,
          parameters: sessionStorage.getItem('address')
            ? {
                latitude_y: sessionStorage.getItem('latitude_y'),
                longitude_x: sessionStorage.getItem('longitude_x'),
                address: sessionStorage.getItem('address'),
                position_status: 'Y',
              }
            : { latitude_y: '', longitude_x: '', position_status: 'N' },
        };
        dispatch(chatList(paramSet));
      }
    } else {
      window.open(inStr.replace(/&amp;/g, '&'));
    }
  };
  function getLocation(inStr, inType, inLabel) {
    dispatch(loading(true));
    const options = {
      // 가능한 경우, 높은 정확도의 위치(예를 들어, GPS 등) 를 읽어오려면 true로 설정
      // 그러나 이 기능은 배터리 지속 시간에 영향을 미친다.
      enableHighAccuracy: true, // 대략적인 값이라도 상관 없음: 기본값

      // 위치 정보가 충분히 캐시되었으면, 이 프로퍼티를 설정하자,
      // 위치 정보를 강제로 재확인하기 위해 사용하기도 하는 이 값의 기본 값은 0이다.
      maximumAge: 180000, // 3분이 지나기 전까지는 수정되지 않아도 됨

      // 위치 정보를 받기 위해 얼마나 오랫동안 대기할 것인가?
      // 기본값은 Infinity이므로 getCurrentPosition()은 무한정 대기한다.
      timeout: 60000, // 1분 이상 기다리지 않는다.
    };

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        function success(pos) {
          console.log('geolocation success');
          const latitude_y = pos.coords.latitude;
          const longitude_x = pos.coords.longitude;
          sessionStorage.setItem('latitude_y', latitude_y);
          sessionStorage.setItem('longitude_x', longitude_x);

          new kakao.maps.services.Geocoder().coord2Address(longitude_x, latitude_y, function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
              // console.log(result[0].address);
              sessionStorage.setItem('address', result[0].address.region_3depth_name);
              /* global parameter */
              // console.log(12312312312);
              const paramSet = {
                inType,
                inStr,
                inLabel,
                parameters: {
                  latitude_y,
                  longitude_x,
                  position_status: 'Y',
                  address: result[0].address.region_3depth_name || sessionStorage.getItem('address'),
                },
              };
              dispatch(chatList(paramSet));
              setTimeout(() => {
                sessionStorage.removeItem('latitude_y');
                sessionStorage.removeItem('longitude_x');
                sessionStorage.removeItem('address');
                console.log('remove position');
              }, 180000);
            }
          });
        },
        function error(e) {
          console.log('geolocation error');
          const paramSet = {
            inType: 'param',
            inStr: 'sysytem_Location_Allow_N',
            inLabel: '동의',
            parameters: { latitude_y: '', longitude_x: '', position_status: 'N' },
          };
          dispatch(chatList(paramSet));
        },
        options
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  const makeKeyVal = (id, idx) => `bot_${id}_${idx}`;

  const setSimpleItem = (message, idx) => {
    if (message) {
      return <SimpleMessage idx={idx} key={makeKeyVal('simple', idx)} item={message} boxStyle={boxStyle} />;
    }
    return false;
  };
  const setTemplateItem = (tempItem, idx) => {
    // console.log(`tempItem:::${JSON.stringify(tempItem)}`);
    const { id } = tempItem;
    const key = makeKeyVal(id, idx);
    // console.log('tempItem id :::', id);

    if (id === 'textbox') {
      return <TextMessage key={key} item={tempItem} boxStyle={boxStyle} />;
    }
    if (id === 'quick_btn') {
      if (chatMsgDiv.current && idx < 1) {
        chatMsgDiv.current.focus();
        return <ButtonMessage key={key} item={tempItem} onClickEvt={onSendMessage} boxStyle={boxStyle} />;
      }
      // console.log(key);
      return <ButtonMessage key={key} item={tempItem} onClickEvt={onSendMessage} boxStyle={boxStyle} />;
    }
    if (id === 'image') {
      return <ImageMessage key={key} item={tempItem} />;
    }
    if (id === 'image_btn') {
      if (chatMsgDiv.current) {
        chatMsgDiv.current.focus();
      }
      return <ImageButtonMessage key={key} item={tempItem} onClickEvt={onSendMessage} boxStyle={boxStyle} />;
    }
    if (id === 'intro_btn') {
      return <IntroButton key={key} item={tempItem} onClickEvt={onSendMessage} boxStyle={boxStyle} viewStatus={intro} />;
    }
    if (id === 'media') {
      return <MediaMessage key={key} item={tempItem} />;
    }
    if (id === 'big_card') {
      if (chatMsgDiv.current) {
        chatMsgDiv.current.focus();
      }
      let widthContent = 470;
      if (window.innerWidth < 500) {
        widthContent = 290;
      } else {
        widthContent = 470;
      }
      return <BigCard key={key} item={tempItem} onClickEvt={onSendMessage} boxStyle={{ width: widthContent, margin: 4.5, height: '410px' }} />;
    }
    if (id === 'small_card') {
      if (chatMsgDiv.current) {
        chatMsgDiv.current.focus();
      }
      let widthContent = 230;
      if (window.innerWidth < 500) {
        widthContent = 168;
      } else {
        widthContent = 230;
      }
      return <SmallCard key={key} item={tempItem} onClickEvt={onSendMessage} boxStyle={{ width: widthContent, margin: 4.5, height: '230px' }} />;
    }
    /* if (id === 'list_btn_card') { */
    if (id === 'list_btn_card' || id === 'list_btn_field' || id === 'list_btn_card_array') {
      if (chatMsgDiv.current) {
        chatMsgDiv.current.focus();
      }
      let widthContent = 470;
      if (window.innerWidth < 500) {
        widthContent = 290;
      } else {
        widthContent = 470;
      }
      return <ListBtnCard key={key} item={tempItem} onClickEvt={onSendMessage} boxStyle={{ width: widthContent, margin: 4.5, height: '280px' }} />;
    }
    if (id === 'list_btn') {
      if (chatMsgDiv.current) {
        chatMsgDiv.current.focus();
      }
      return <ListBtn key={key} item={tempItem} onClickEvt={onSendMessage} boxStyle={boxStyle} />;
    }
    if (id === 'administrative_tem') {
      return <AdministrativeMap key={key} item={tempItem} />;
    }
    if (id === 'civilissuance_tem') {
      return <CivilissuanceMap key={key} item={tempItem} boxStyle={boxStyle} />;
    }
    if (id === 'card_extend') {
      // return <CardExtend key={key} item={tempItem} boxStyle={{ width: 180, margin: 10, height: '240px' }} />;
    }
    if (id === 'custom') {
      // return <CustomerMessage item={item} />;
    }
    return false;
  };
  // console.log('item:', item);
  // set
  // console.log(123, item?.response_status);
  // console.log(456, item);
  // console.log('emotion:::', item.emotion);
  let logo_url = imageData.normal;
  switch (item.emotion) {
    case 'normal':
      logo_url = imageData.normal;
      break;
    case 'love':
      logo_url = imageData.love;
      break;
    case 'sad':
      logo_url = imageData.sad;
      break;
    case 'confuse':
      logo_url = imageData.confuse;
      break;

    default:
      logo_url = imageData.normal;
      break;
  }

  const openFeedbackModal = () => {
    dispatch(setMessageId(item.id));
    dispatch(isActiveFeedbackModal());
  };

  const [msgBtm, setMsgBtm] = useState(498);
  const chatMsgDiv = useRef();
  let msgBtmStyle = {};
  let cardUseState;
  if (item?.templateMessages) {
    cardUseState = item?.templateMessages.find(ele => {
      if (ele.id.includes('_card') || ele.id.includes('_btn')) {
        return true;
      }
      return false;
    });
  }
  if (cardUseState) {
    msgBtmStyle = { width: '100%', maxWidth: 'fit-content', outline: 'none' };
  } else {
    msgBtmStyle = { display: 'table', outline: 'none' };
  }
  useLayoutEffect(() => {
    setMsgBtm(chatMsgDiv?.current?.clientWidth);
    function handleResize(a) {
      setMsgBtm(chatMsgDiv?.current?.clientWidth);
    }
    if (item?.templateMessages) {
      item?.templateMessages.forEach((data, idx) => {
        // console.log(data.id);
        if (data.id === 'image_btn' || data.id === 'big_card' || data.id === 'small_card' || data.id === 'list_btn_card' || data.id === 'list_btn') {
          chatMsgDiv.current.focus();
        } else if (data.id === 'quick_btn' && idx < 1) {
          chatMsgDiv.current.focus();
        }
      });
    }
    // if (chatMsgDiv.current) {
    //     chatMsgDiv.current.focus();
    // }
    // console.log(4123, item?.templateMessages);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });
  return (
    <div className="bot_message_div">
      <div className="_chat_name">
        <div className="_img">{ReactHtmlParser(logo_url)} </div>
        <span>조아용</span>
      </div>
      <div className="_chat_message">
        {item.response_status === 'loading' ? (
          <div className="_chat_message_set">
            <div className="_text_div">
              <div className="_message">
                <div className="loading">
                  <div className="ldio-er80fzh2vjb">
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                  </div>
                </div>
              </div>
            </div>
            {item.createAt && (
              <div className="_chat_message_bottom">
                <div className="_chat_message_bottom_div">
                  <div className="_chat_time">{item.createAt}</div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="_chat_message_set" ref={chatMsgDiv} style={msgBtmStyle} role="button" tabIndex={0}>
              {' '}
              {item?.messages?.map((message, idx) => {
                return setSimpleItem(message, idx);
              })}
              {/* items Template */}
              {item?.templateMessages?.map((tempItem, idx) => {
                return setTemplateItem(tempItem, idx);
              })}
            </div>
            {item.createAt && (
              <div className="_chat_message_bottom">
                <div className="_chat_message_bottom_div" style={{ width: msgBtm + 'px' }}>
                  <div className="_chat_time">{item.createAt}</div>
                  {item.response_status !== 'welcome' && item.response_status !== 'satisfy' && !isQualitySend ? (
                    <div
                      className="_chat_opinion"
                      onClick={() => openFeedbackModal()}
                      onKeyPress={e => {
                        if (e.key === 'Enter') {
                          openFeedbackModal();
                        }
                      }}
                    >
                      <IconButton
                        icon="ri-mail-send-line"
                        styleDef={{ width: '15px', height: '16px', float: 'left', fontSize: '13px' }}
                        viewStatus=""
                        tabIndex="0"
                      />
                      의견남기기
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
BotMessage.propTypes = {
  boxStyle: PropTypes.object,
  responseType: PropTypes.string,
  item: PropTypes.object,
  index: PropTypes.number,
};
BotMessage.defaultProps = {
  boxStyle: {},
  item: {
    messageId: '',
    emotion: '',
    createAt: '2021.01.01 00:00',
    messages: [],
    templateMessages: [],
  },
  responseType: 'query',
  index: 0,
};

export default BotMessage;
