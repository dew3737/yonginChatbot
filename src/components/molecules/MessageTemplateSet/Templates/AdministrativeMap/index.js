import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
/**
 * Quick Button
 */

const AdministrativeMap = ({ item }) => {
  const { items, id, type } = item;
  const administrativMap = useRef();
  useEffect(() => {
    kakao.maps.load(function () {
      const mapContainer = administrativMap.current; // 지도를 표시할 div
      const mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

      // 지도를 생성합니다
      const map = new kakao.maps.Map(mapContainer, mapOption);

      // 주소-좌표 변환 객체를 생성합니다
      const geocoder = new kakao.maps.services.Geocoder();

      // 주소로 좌표를 검색합니다
      geocoder.addressSearch(items[0].address.value, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          const marker = new kakao.maps.Marker({
            map,
            position: coords,
          });
          // 인포윈도우로 장소에 대한 설명을 표시합니다
          const infowindow = new kakao.maps.InfoWindow({
            content: `<div style="padding: 10px; width:150px; text-align:center;">
          <p>${items[0].address.value}</p>
          <a href="https://map.kakao.com/link/map/${items[0].address.value},${result[0].y},${result[0].x}" style="height:30px; width:30px; display: inline-block; margin: 0 10px;" target="_blank"><img src="/chat/ibricks/images/kakaoMap.png" style="width:30px; border-radius:20px;"/></a>
          <a href="https://map.kakao.com/link/to/${items[0].address.value},${result[0].y},${result[0].x}" style="height:30px; width:30px; display: inline-block; margin: 0 10px;" target="_blank"><img src="/chat/ibricks/images/kakaoNavi.png" style="width:30px; border-radius:20px;"/></a>
          </div>`,
          });
          infowindow.open(map, marker);

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
        }
      });
    });
  }, []);
  return (
    <>
      <div className="_administrativ_map_div">
        {/* {items.map((tempItem, idx) => {
          return <QuickBtn key={`${tempItem.button?.label}_${idx}`} tempItem={tempItem} idx={idx} boxStyle={boxStyle} onClickEvt={onClickEvt} />;
        })} */}
        <div id="administrativMap" ref={administrativMap} style={{ width: '100%', height: '100%' }} />
      </div>
    </>
  );
};
AdministrativeMap.propTypes = {
  item: PropTypes.object,
};
AdministrativeMap.defaultProps = {
  item: {},
};

export default AdministrativeMap;
