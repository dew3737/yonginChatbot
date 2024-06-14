import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ButtonRightText from 'components/atoms/Button/Button.rightText';
import { isACtiveSatisfyModal, disableAllMenu, isActiveConversationGuideModal, isActiveServiceGuideModal } from 'modules/actions/statusMenu';
import PropTypes from 'prop-types';

const SideMenu = ({ styleDef }) => {
  const sideMenuStatus = useSelector(state => state.isActive.sideMenu);
  const chatListLength = useSelector(state => state.chatList.data.length);

  const dispatch = useDispatch();
  const onSatisfyModal = () => {
    if (sideMenuStatus === true) {
      dispatch(disableAllMenu());
    }
    dispatch(isACtiveSatisfyModal());
  };
  const onConversationGuide = () => {
    if (sideMenuStatus === true) {
      dispatch(disableAllMenu());
    }
    dispatch(isActiveConversationGuideModal());
  };
  const onServiceGuide = () => {
    if (sideMenuStatus === true) {
      dispatch(disableAllMenu());
    }
    dispatch(isActiveServiceGuideModal());
  };

  return (
    <ul className="menu_bar" style={styleDef}>
      {/* <ButtonRightText
        label="처음으로"
        value="처음으로"
        labelIcon="ri-restart-line"
        viewStatus={{sideMenuStatus}}
        styleDef={{}}
        onClickEvt={() => window.location.reload()}
        error={null}
      /> */}
      <ButtonRightText
        label="이용 안내"
        value="이용 안내"
        labelIcon="ri-door-lock-line"
        viewStatus={sideMenuStatus}
        styleDef={{}}
        onClickEvt={() => onServiceGuide()}
        error={null}
      />
      <ButtonRightText
        label="대화 가이드"
        value="대화 가이드"
        labelIcon="ri-questionnaire-line"
        viewStatus={sideMenuStatus}
        styleDef={{}}
        onClickEvt={() => onConversationGuide()}
        error={null}
      />
      {chatListLength > 1 && (
        <ButtonRightText
          label="서비스 만족도 평가"
          value="서비스 만족도 평가"
          labelIcon="ri-thumb-up-line"
          viewStatus={sideMenuStatus}
          styleDef={{}}
          onClickEvt={() => onSatisfyModal()}
          error={null}
        />
      )}
    </ul>
  );
};

SideMenu.propTypes = {
  styleDef: PropTypes.object,
};
SideMenu.defaultProps = {
  styleDef: {},
};
export default SideMenu;
