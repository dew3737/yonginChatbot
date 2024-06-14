import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RadioInlineText from 'components/atoms/Radio/Radio.inlineText';
import IconButton from 'components/atoms/Button/IconButton';
import { changeFontSize } from 'modules/actions/fontSize';
import { autoCompleteState } from 'modules/actions/autoComplete';
import { disableAllMenu } from 'modules/actions/statusMenu';
import PropTypes from 'prop-types';

const LeftSettingMenu = ({ styleDef, viewStatus }) => {
  /* font변경값 가져오기 */
  const currentFontSize = useSelector(state => state.fontSize.size);
  const autoCompleteStatus = useSelector(state => state.autoComplete.active);

  const dispatch = useDispatch();

  /* autoComplete on/off */
  const autoStatus = e => {
    sessionStorage.setItem('auto_active', e.target.value === 'on');
    dispatch(autoCompleteState(e.target.value === 'on'));
  };

  /* settingMenu 닫기 */
  const offSettingMenu = () => {
    dispatch(disableAllMenu());
  };

  /* font(변경)클릭시 action발생 */
  const textSizeChange = e => {
    sessionStorage.setItem('font_size', e.target.value);
    dispatch(changeFontSize(Number(e.target.value)));
  };
  return (
    <ul className="left_setting_area" style={styleDef}>
      <li className="left_setting_area_menu">
        폰트 크기 설정
        <div className="check_box" onChange={e => textSizeChange(e)}>
          <input id="text_size_1" type="radio" name="text_size" value={12} defaultChecked={currentFontSize === 12} style={viewStatus.settingMenuStatus===true ? {display:'inline-grid'} : {display: 'none'}}/>
          <RadioInlineText label="작게" value="text_size_1"/>

          <input id="text_size_2" type="radio" name="text_size" value={14} defaultChecked={currentFontSize === 14} style={viewStatus.settingMenuStatus===true ? {display:'inline-grid'} : {display: 'none'}}/>
          <RadioInlineText label="보통" value="text_size_2"/>

          <input id="text_size_3" type="radio" name="text_size" value={16} defaultChecked={currentFontSize === 16} style={viewStatus.settingMenuStatus===true ? {display:'inline-grid'} : {display: 'none'}}/>
          <RadioInlineText label="크게" value="text_size_3"/>
        </div>
      </li>

      <li className="left_setting_area_menu">
        자동 완성 설정
        <div className="check_box" onChange={e => autoStatus(e)}>
          <input id="autoCom_1" type="radio" name="autoCom" value="on" defaultChecked={autoCompleteStatus === true} style={viewStatus.settingMenuStatus===true ? {display:'inline-grid'} : {display: 'none'}}/>
          <RadioInlineText label="켜기" value="autoCom_1"/>
          <input id="autoCom_2" type="radio" name="autoCom" value="off" defaultChecked={autoCompleteStatus !== true} style={viewStatus.settingMenuStatus===true ? {display:'inline-grid'} : {display: 'none'}}/>
          <RadioInlineText label="끄기" value="autoCom_2"/>
        </div>
      </li>
      <div onClick={() => offSettingMenu()} onKeyPress={ (e) => {if(e.key === 'Enter') {offSettingMenu();}}}>
        <li className="left_setting_area_menu">
          닫기
          <IconButton icon="ri-close-line" styleDef={{ color: '#2C3134', fontSize: '26px', marginTop: '2px' }} viewStatus='' label='닫기 버튼' tabIndex='0'/>
        </li>
      </div>
    </ul>
  );
};

LeftSettingMenu.propTypes = {
  styleDef: PropTypes.object,
  viewStatus: PropTypes.string
};
LeftSettingMenu.defaultProps = {
  styleDef: {},
  viewStatus: ''
};
export default LeftSettingMenu;
