import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { disableAllMenu, isActiveExpandImageModal } from 'modules/actions/statusMenu';
import './style.scss';
const ExpandImage = () => {
  const dispatch = useDispatch();
  const url = useSelector(state => state.isActive.expandImageUrl);

  const handleOnError = event => {
    event.currentTarget.src = 'images/noimage.png';
    event.currentTarget.className = 'errorImg';
    event.currentTarget.alt = '이미지 로드 실패';
  };
  const disablePopup = () => {
    dispatch(disableAllMenu());
  };

  // let imageStyle = {};
  // // 가로로 길때
  // if (window.innerHeight < window.innerWidth) {
  //   imageStyle = {
  //     height: 'calc(100% - 150px)',
  //     opacity: 1,
  //   };
  // } else {
  //   imageStyle = {
  //     width: 'calc(100% - 150px)',
  //     opacity: 1,
  //   };
  // }
  const [imageStyle, setImageStyle] = useState({});

  useLayoutEffect(() => {
    if (window.innerHeight < window.innerWidth) {
      setImageStyle({
        height: 'calc(100% - 150px)',
        maxWidth: '100%',
      });
    } else {
      setImageStyle({
        width: '100%',
      });
    }
    function handleResize(a) {
      if (window.innerHeight < window.innerWidth) {
        setImageStyle({
          height: 'calc(100% - 150px)',
          maxWidth: '100%',
        });
      } else {
        setImageStyle({
          width: '100%',
        });
      }
    }
    // console.log(visibleSlides);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="popup_image_main" onClick={disablePopup}>
      <img src={url} alt="" onError={handleOnError} style={imageStyle} />
    </div>
  );
};

export default ExpandImage;
