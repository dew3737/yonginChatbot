import ButtonUnderText from 'components/atoms/Button/Button.underText';
import { autoCompleteState } from 'modules/actions/autoComplete';
import { changeFontSize } from 'modules/actions/fontSize';
import useRequestDM from 'modules/hooks/useRequestDM';
import { disableAllMenu } from 'modules/actions/statusMenu';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { chatList } from 'modules/actions/chat';
/**
 * 하단의 메뉴 컴포넌트
 * @returns {object} ChatMenu
 */
const ChatMenu = ({ styleDef, viewStatus }) => {
  const currentFontSize = useSelector(state => state.fontSize.size);

  const dispatch = useDispatch();

  const execOnSendMsg = text => {
    const paramSet = {
      inType: 'query',
      inStr: text,
      inLabel: text,
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
    // dispatch(useRequestDM(text, 'query'));
    dispatch(disableAllMenu());
  };

  return (
    <div className="_quick_div" style={styleDef}>
      <div className="_quick_menu">
        <ButtonUnderText
          label="분야별 안내"
          value="분야별 안내"
          image="/chat/ibricks/images/guide.png"
          viewStatus={{ viewStatus }}
          styleDef={{}}
          onClickEvt={() => execOnSendMsg('분야별 안내')}
          error={null}
        />
        <ButtonUnderText
          label="담당 안내"
          value="담당 안내"
          image="/chat/ibricks/images/manager.png"
          viewStatus={{ viewStatus }}
          styleDef={{}}
          onClickEvt={() => execOnSendMsg('담당 안내')}
          error={null}
        />
        <ButtonUnderText
          label="행정기관 안내"
          value="행정기관 안내"
          image="/chat/ibricks/images/administrative.png"
          viewStatus={{ viewStatus }}
          styleDef={{}}
          onClickEvt={() => execOnSendMsg('행정기관 안내')}
          error={null}
        />
        <ButtonUnderText
          label="처음으로"
          value="처음으로"
          image="/chat/ibricks/images/beginning.png"
          viewStatus={{ viewStatus }}
          styleDef={{}}
          onClickEvt={() => window.location.reload()}
          error={null}
        />
        <ButtonUnderText
          label="민원발급기 위치"
          value="민원발급기 위치"
          image="/chat/ibricks/images/civilpetitions.png"
          viewStatus={{ viewStatus }}
          styleDef={{}}
          onClickEvt={() => execOnSendMsg('민원발급기 위치')}
          error={null}
        />
        <ButtonUnderText
          label="민원접수"
          value="민원접수"
          image="/chat/ibricks/images/acceptcivil.png"
          viewStatus={{ viewStatus }}
          styleDef={{}}
          onClickEvt={() => execOnSendMsg('민원접수')}
          error={null}
        />
        <ButtonUnderText
          label="자주 하는 질문"
          value="자주 하는 질문"
          image="/chat/ibricks/images/questions.png"
          viewStatus={{ viewStatus }}
          styleDef={{}}
          onClickEvt={() => execOnSendMsg('자주 하는 질문')}
          error={null}
        />
        <ButtonUnderText
          label="도움말"
          value="도움말"
          image="/chat/ibricks/images/help.png"
          viewStatus={{ viewStatus }}
          styleDef={{}}
          onClickEvt={() => execOnSendMsg('도움말')}
          error={null}
        />
      </div>
    </div>
  );
};
ChatMenu.propTypes = {
  styleDef: PropTypes.object,
  viewStatus: PropTypes.string,
};
ChatMenu.defaultProps = {
  styleDef: {},
  viewStatus: '',
};
export default ChatMenu;
