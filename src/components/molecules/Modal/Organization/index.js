import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from 'components/atoms/Button/IconButton';
import './style.scss';
import { disableAllMenu } from 'modules/actions/statusMenu';
// import { sendQuality, setQuality, setResponse } from 'modules/actions/quality';
import { chatList } from 'modules/actions/chat';
import PropTypes from 'prop-types';
import { sendOrganization } from 'modules/actions/sendOrganization';
import ReactHtmlParser from 'react-html-parser';
import { debounce } from 'lib';

const OrganizationElement = ({ item }) => {
  return (
    <div className="_contset_item">
      <div className="_cont">
        <ul className="_item">
          <li className="_label">이름</li>
          <li className="_cont">{item.user_name.value}</li>
        </ul>
        <ul className="_item">
          <li className="_label">직위</li>
          <li className="_cont">{item.position_name.value}</li>
        </ul>
        <ul className="_item">
          <li className="_label">부서</li>
          <li className="_cont">{item.depth_name.value}</li>
        </ul>
        <ul className="_item">
          <li className="_label">팀명</li>
          <li className="_cont">{item.team_name.value}</li>
        </ul>
        <ul className="_item">
          <li className="_label">전화번호</li>
          <li className="_cont">{item.tel.value === '-' ? item.tel.value : <a href={'tel:' + item.tel.value}>{item.tel.value}</a>}</li>
        </ul>
        <ul className="_item">
          <li className="_label">팩스번호</li>
          <li className="_cont">{item.fax.value}</li>
        </ul>
        <ul className="_item">
          <li className="_label">업무</li>
          <li className="_cont">
            <pre className="_line">{ReactHtmlParser(item.work.value)}</pre>
          </li>
        </ul>
      </div>
    </div>
  );
};

const Organization = () => {
  const organizationResult = useSelector(state => state.organizationResult);

  const dispatch = useDispatch();
  const user_name_ref = useRef();
  const team_name_ref = useRef();
  const position_name_ref = useRef();
  const depth_name_ref = useRef();
  const work_ref = useRef();
  // const [params, setParams] = useState({
  //   user_name: '',
  //   team_name: '',
  //   position_name: '',
  //   depth_name: '',
  //   work: '',
  //   from: 0,
  //   status: false,
  // });

  useEffect(() => {
      if(user_name_ref.current){
	      user_name_ref.current.focus();
	  }
  }, []);
  const res_box_div = useRef();
  const res_box = useRef();
  
  const handleScroll = debounce(() => {
    const scrollHeight = res_box_div.current?.scrollHeight;
    const scrollLocation = res_box.current?.scrollTop;
    const clientHeight = res_box.current?.clientHeight;

    // console.log(scrollLocation + clientHeight + 30, scrollHeight);
    if (scrollLocation + clientHeight + 30 > scrollHeight) {
      if (organizationResult.result.length !== Number(organizationResult.count)) {
        // setParams({ ...params, from: params.from + 20, status: true });
        dispatch(
          sendOrganization({
            user_name: user_name_ref.current?.value.trim(),
            team_name: team_name_ref.current?.value.trim(),
            position_name: position_name_ref.current?.value.trim(),
            depth_name: depth_name_ref.current?.value.trim(),
            work: work_ref.current?.value.trim(),
            from: organizationResult.result.length,
            status: true,
          })
        );
      }
    }
  }, 100);

  const endOrganization = (inStr, inType, inLabel) => {
    dispatch(sendOrganization({ status: 'stop' }));
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
    dispatch(disableAllMenu());
  };
  const onKeyPressEvt = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      dispatch(
        sendOrganization({
          user_name: user_name_ref.current?.value.trim(),
          team_name: team_name_ref.current?.value.trim(),
          position_name: position_name_ref.current?.value.trim(),
          depth_name: depth_name_ref.current?.value.trim(),
          work: work_ref.current?.value.trim(),
          from: 0,
          status: false,
        })
      );
      res_box.current.scrollTo(0, 0);
    }
  };
  return (
    <div className="organization_bg">
      <div
        className="_box"
        style={{
          height: organizationResult.result.length === 0 ? '410px' : organizationResult.result.length === 1 ? 'calc(100vh - 230px)' : 'calc(100vh - 52px)',
          transition: organizationResult.result.length === 0 ? 'height 0.4s' : 'height 0.2s',
        }}
      >
        <div className="_top">
          <div className="_tit">담당 찾기</div>
          <div className="_close" onClick={() => endOrganization('담당안내종료', ' query', '담당 안내 종료')} onKeyPress={(e) => {if(e.key === 'Enter') {endOrganization('담당안내종료', ' query', '담당 안내 종료')}}}>
            <IconButton
              icon="ri-close-line"
              styleDef={{ width: '15px', fontSize: '30px', fontWeight: 100, position: 'absolute', top: '19px', right: '20px', height: '15px' }}
              label='닫기 버튼'
              tabIndex='2'
            />
          </div>
        </div>
        <div className="_middle">
          <div className="_member_find_div">
            <div className="_filter_div">
              <div className="_input_div">
                <ul className="_item">
                  <li className="_label"><label htmlFor="_cont_name">이름</label></li>
                  <li className="_cont">
                    <input
                      ref={user_name_ref}
                      onKeyPress={onKeyPressEvt}
                      id="_cont_name"
                      type="text"
                      placeholder="예) 홍길동"
                      className="_input_member _focus"
                      autoComplete="off"
                      tabIndex={1}
                    />
                  </li>
                </ul>
                <ul className="_item">
                  <li className="_label"><label htmlFor="_cont_area">직위</label></li>
                  <li className="_cont">
                    <input
                      ref={position_name_ref}
                      onKeyPress={onKeyPressEvt}
                      id="_cont_area"
                      type="text"
                      placeholder="예) OOO팀장, OOO과장"
                      className="_input_member"
                      autoComplete="off"
                      tabIndex={1}
                    />
                  </li>
                </ul>
                <ul className="_item">
                  <li className="_label"><label htmlFor="_cont_dept">부서</label></li>
                  <li className="_cont">
                    <input
                      ref={depth_name_ref}
                      onKeyPress={onKeyPressEvt}
                      id="_cont_dept"
                      type="text"
                      placeholder="예) OO1과, OO2동, OO구 OO과"
                      className="_input_member"
                      autoComplete="off"
                      tabIndex={1}
                    />
                  </li>
                </ul>
                <ul className="_item">
                  <li className="_label"><label htmlFor="_cont_job">팀명</label></li>
                  <li className="_cont">
                    <input
                      ref={team_name_ref}
                      autoComplete="off"
                      onKeyPress={onKeyPressEvt}
                      id="_cont_job"
                      type="text"
                      placeholder="예) OOO팀"
                      className="_input_member"
                      tabIndex={1}
                    />
                  </li>
                </ul>

                <ul className="_item">
                  <li className="_label"><label htmlFor="_cont_work">업무</label></li>
                  <li className="_cont">
                    <input
                      ref={work_ref}
                      autoComplete="off"
                      onKeyPress={onKeyPressEvt}
                      id="_cont_work"
                      type="text"
                      placeholder="예) 여권"
                      className="_input_member"
                      tabIndex={1}
                    />
                  </li>
                </ul>
                <input
                  className="clearButton"
                  type="button"
                  value="검색 초기화"
                  onClick={() => {
                    user_name_ref.current.value = '';
                    team_name_ref.current.value = '';
                    position_name_ref.current.value = '';
                    depth_name_ref.current.value = '';
                    work_ref.current.value = '';
                    dispatch(sendOrganization({ status: 'stop' }));
                  }}
                  tabIndex={1}
                />
              </div>
              <div
                className="_btn_div"
                id="enterMember"
                onClick={() => {
                  dispatch(
                    sendOrganization({
                      user_name: user_name_ref.current?.value,
                      team_name: team_name_ref.current?.value,
                      position_name: position_name_ref.current?.value,
                      depth_name: depth_name_ref.current?.value,
                      work: work_ref.current?.value,
                      from: 0,
                      status: false,
                    })
                  );
                  res_box.current.scrollTo(0, 0);
                }}
                onKeyPress={(e) => {
                if(e.key === 'Enter'){
                  dispatch(
                    sendOrganization({
                      user_name: user_name_ref.current?.value,
                      team_name: team_name_ref.current?.value,
                      position_name: position_name_ref.current?.value,
                      depth_name: depth_name_ref.current?.value,
                      work: work_ref.current?.value,
                      from: 0,
                      status: false,
                    })
                  );
                  res_box.current.scrollTo(0, 0);
                }
                }
                }
              >
                <div className="_btn">
                  <IconButton icon="ri-search-line" styleDef={{ color: '#FFF', width: '20px', fontSize: '20px', height: '20px' }} tabIndex='1'/>
                  <div className="_label">검색</div>
                </div>
              </div>
            </div>
            <div
              className="_result_div"
              id="memberResult"
              style={{
                height:
                  organizationResult.result.length === 0 ? '62px' : organizationResult.result.length === 1 ? 'calc(100vh - 580px)' : 'calc(100vh - 400px)',
              }}
            >
              <div className="_result_layout ">
                <div className="member_count">
                  {organizationResult.result.length}/{organizationResult.count || 0}
                </div>

                <div className="_res_box scroll_style" ref={res_box} onScroll={handleScroll}>
                  <div className="_res_box_div" ref={res_box_div}>
                    {organizationResult.count === 0 ? (
                      <div className="_contset_item ">
                        <ul className="_item">
                          <li className="_cont">
                            {!user_name_ref.current?.value &&
                            !team_name_ref.current?.value &&
                            !position_name_ref.current?.value &&
                            !depth_name_ref.current?.value &&
                            !work_ref.current?.value
                              ? '검색 조건을 입력해주세요.'
                              : '검색 결과가 없습니다.'}
                          </li>
                        </ul>
                      </div>
                    ) : (
                      organizationResult.result.map((item, idx) => {
                        return <OrganizationElement item={item} key={'oganiz_' + idx} />;
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

OrganizationElement.propTypes = {
  item: PropTypes.object,
};
OrganizationElement.defaultProps = {
  item: {},
};
export default Organization;
