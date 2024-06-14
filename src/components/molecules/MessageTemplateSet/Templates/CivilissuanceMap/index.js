/* eslint-disable no-loop-func */
/* eslint-disable no-shadow */
/* eslint-disable no-constant-condition */
/* eslint-disable no-bitwise */
/* eslint-disable no-useless-concat */
/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-multi-assign */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
/**
 * Quick Button
 */

const CivilissuanceMap = ({ item, boxStyle }) => {
  const { items, id, type } = item;

  const civilissuanceMap = useRef();
  useEffect(() => {
    kakao.maps.load(function () {
      function TooltipMarker(position, tooltipText, image) {
        this.position = position;
        const node = (this.node = document.createElement('div'));
        node.className = 'node';
        node.style.backgroundImage = `url(/chat/ibricks/images/map/${image}.png)`;

        const tooltip = document.createElement('div');
        (tooltip.className = 'tooltip'), (tooltip.innerHTML = tooltipText);
        node.appendChild(tooltip);

        // 툴팁 엘리먼트에 마우스 인터렉션에 따라 보임/숨김 기능을 하도록 이벤트를 등록합니다.
        // node.onmouseover = function () {
        //   tooltip.style.display = 'block';
        // };
        // node.onmouseout = function () {
        //   tooltip.style.display = 'none';
        // };
      }

      // AbstractOverlay 상속. 프로토타입 체인을 연결합니다.
      TooltipMarker.prototype = new kakao.maps.AbstractOverlay();

      // AbstractOverlay의 필수 구현 메소드.
      // setMap(map)을 호출했을 경우에 수행됩니다.
      // AbstractOverlay의 getPanels() 메소드로 MapPanel 객체를 가져오고
      // 거기에서 오버레이 레이어를 얻어 생성자에서 만든 엘리먼트를 자식 노드로 넣어줍니다.
      TooltipMarker.prototype.onAdd = function () {
        const panel = this.getPanels().overlayLayer;
        panel.appendChild(this.node);
      };

      // AbstractOverlay의 필수 구현 메소드.
      // setMap(null)을 호출했을 경우에 수행됩니다.
      // 생성자에서 만든 엘리먼트를 오버레이 레이어에서 제거합니다.
      TooltipMarker.prototype.onRemove = function () {
        this.node.parentNode.removeChild(this.node);
      };

      // AbstractOverlay의 필수 구현 메소드.
      // 지도의 속성 값들이 변화할 때마다 호출됩니다. (zoom, center, mapType)
      // 엘리먼트의 위치를 재조정 해 주어야 합니다.
      TooltipMarker.prototype.draw = function () {
        // 화면 좌표와 지도의 좌표를 매핑시켜주는 projection객체
        const projection = this.getProjection();

        // overlayLayer는 지도와 함께 움직이는 layer이므로
        // 지도 내부의 위치를 반영해주는 pointFromCoords를 사용합니다.
        const point = projection.pointFromCoords(this.position);

        // 내부 엘리먼트의 크기를 얻어서
        const width = this.node.offsetWidth;
        const height = this.node.offsetHeight;

        // 해당 위치의 정중앙에 위치하도록 top, left를 지정합니다.
        this.node.style.left = point.x - width / 2 + 'px';
        this.node.style.top = point.y - height / 2 + 'px';
      };

      // 좌표를 반환하는 메소드
      TooltipMarker.prototype.getPosition = function () {
        return this.position;
      };

      /**
       * 지도 영역 외부에 존재하는 마커를 추적하는 기능을 가진 객체입니다.
       * 클리핑 알고리즘을 사용하여 tracker의 좌표를 구하고 있습니다.
       */
      function MarkerTracker(map, target, place, image, item) {
        // 클리핑을 위한 outcode
        const OUTCODE = {
          INSIDE: 0, // 0b0000
          TOP: 8, // 0b1000
          RIGHT: 2, // 0b0010
          BOTTOM: 4, // 0b0100
          LEFT: 1, // 0b0001
        };

        // viewport 영역을 구하기 위한 buffer값
        // target의 크기가 60x60 이므로
        // 여기서는 지도 bounds에서 상하좌우 30px의 여분을 가진 bounds를 구하기 위해 사용합니다.
        const BOUNDS_BUFFER = 30;

        // 클리핑 알고리즘으로 tracker의 좌표를 구하기 위한 buffer값
        // 지도 bounds를 기준으로 상하좌우 buffer값 만큼 축소한 내부 사각형을 구하게 됩니다.
        // 그리고 그 사각형으로 target위치와 지도 중심 사이의 선을 클리핑 합니다.
        // 여기서는 tracker의 크기를 고려하여 40px로 잡습니다.
        const CLIP_BUFFER = 20;

        // trakcer 엘리먼트
        const tracker = document.createElement('div');
        tracker.className = 'tracker';
        tracker.title = place;

        // 내부 아이콘
        const icon = document.createElement('div');
        icon.className = 'icon';
        icon.style.backgroundImage = `url(/chat/ibricks/images/map/${image}.png)`;

        // 외부에 있는 target의 위치에 따라 회전하는 말풍선 모양의 엘리먼트
        const balloon = document.createElement('div');
        balloon.className = 'balloon';

        tracker.appendChild(balloon);
        tracker.appendChild(icon);

        map.getNode().appendChild(tracker);

        // traker를 클릭하면 target의 위치를 지도 중심으로 지정합니다.
        tracker.onclick = function () {
          map.setCenter(target.getPosition());
          setVisible(false);
          const civilissuanceList_item = this.parentNode.parentNode.nextSibling.nextSibling;
          // const civilissuanceList_item = document.querySelector('.civilissuanceList_item');

          let resultHTML = `<img src="/chat/ibricks/images/map/${image}.png" alt="" />`;
          resultHTML += `<div class="img_div">`;
          if (item.corporation_register.value === 'Y') resultHTML += `<img src="/chat/ibricks/images/map/corporation_register.png" alt="" />`;
          if (item.family_census.value === 'Y') resultHTML += `<img src="/chat/ibricks/images/map/family_census.png" alt="" />`;
          if (item.family_relation.value === 'Y') resultHTML += `<img src="/chat/ibricks/images/map/family_relation.png" alt="" />`;
          resultHTML += `</div>`;
          resultHTML += `
          <p><b>설치 장소 :</b> ${item.place.value || '-'}</p>
          <p><b>설치 위치 : </b> ${item.location.value || '-'}</p>
          <p><b>도로명 주소 : </b> ${item.address.value || '-'}</p>
          <p><b>지번 주소 : </b> ${item.address_old.value || '-'}</p>
          <p><b>운영 시간 (평일) : </b>  ${item.operating_weekday.value || '-'}</p>
          <p><b>운영 시간 (토,일) : </b> ${item.operating_weekend.value || '-'}</p>
          `;

          civilissuanceList_item.innerHTML = resultHTML;
        };

        // target의 위치를 추적하는 함수
        function tracking() {
          const proj = map.getProjection();

          // 지도의 영역을 구합니다.
          const bounds = map.getBounds();

          // 지도의 영역을 기준으로 확장된 영역을 구합니다.
          const extBounds = extendBounds(bounds, proj);

          // target이 확장된 영역에 속하는지 판단하고
          if (extBounds.contain(target.getPosition())) {
            // 속하면 tracker를 숨깁니다.
            setVisible(false);
          } else {
            // target이 영역 밖에 있으면 계산을 시작합니다.

            // 지도 bounds를 기준으로 클리핑할 top, right, bottom, left를 재계산합니다.
            //
            //  +-------------------------+
            //  | Map Bounds              |
            //  |   +-----------------+   |
            //  |   | Clipping Rect   |   |
            //  |   |                 |   |
            //  |   |        *       (A)  |     A
            //  |   |                 |   |
            //  |   |                 |   |
            //  |   +----(B)---------(C)  |
            //  |                         |
            //  +-------------------------+
            //
            //        B
            //
            //                                       C
            // * 은 지도의 중심,
            // A, B, C가 TooltipMarker의 위치,
            // (A), (B), (C)는 각 TooltipMarker에 대응하는 tracker입니다.
            // 지도 중심과 각 TooltipMarker를 연결하는 선분이 있다고 가정할 때,
            // 그 선분과 Clipping Rect와 만나는 지점의 좌표를 구해서
            // tracker의 위치(top, left)값을 지정해주려고 합니다.
            // tracker 자체의 크기가 있기 때문에 원래 지도 영역보다 안쪽의 가상 영역을 그려
            // 클리핑된 지점을 tracker의 위치로 사용합니다.
            // 실제 tracker의 position은 화면 좌표가 될 것이므로
            // 계산을 위해 좌표 변환 메소드를 사용하여 모두 화면 좌표로 변환시킵니다.

            // TooltipMarker의 위치
            const pos = proj.containerPointFromCoords(target.getPosition());

            // 지도 중심의 위치
            const center = proj.containerPointFromCoords(map.getCenter());

            // 현재 보이는 지도의 영역의 남서쪽 화면 좌표
            const sw = proj.containerPointFromCoords(bounds.getSouthWest());

            // 현재 보이는 지도의 영역의 북동쪽 화면 좌표
            const ne = proj.containerPointFromCoords(bounds.getNorthEast());

            // 클리핑할 가상의 내부 영역을 만듭니다.
            const top = ne.y + CLIP_BUFFER;
            const right = ne.x - CLIP_BUFFER;
            const bottom = sw.y - CLIP_BUFFER;
            const left = sw.x + CLIP_BUFFER;

            // 계산된 모든 좌표를 클리핑 로직에 넣어 좌표를 얻습니다.
            const clipPosition = getClipPosition(top, right, bottom, left, center, pos);

            // 클리핑된 좌표를 tracker의 위치로 사용합니다.
            tracker.style.top = clipPosition.y + 'px';
            tracker.style.left = clipPosition.x + 'px';

            // 말풍선의 회전각을 얻습니다.
            const angle = getAngle(center, pos);

            // 회전각을 CSS transform을 사용하여 지정합니다.
            // 브라우저 종류에따라 표현되지 않을 수도 있습니다.
            // https://caniuse.com/#feat=transforms2d
            balloon.style.cssText +=
              '-ms-transform: rotate(' + angle + 'deg);' + '-webkit-transform: rotate(' + angle + 'deg);' + 'transform: rotate(' + angle + 'deg);';

            // target이 영역 밖에 있을 경우 tracker를 노출합니다.
            setVisible(true);
          }
        }

        // 상하좌우로 BOUNDS_BUFFER(30px)만큼 bounds를 확장 하는 함수
        //
        //  +-----------------------------+
        //  |              ^              |
        //  |              |              |
        //  |     +-----------------+     |
        //  |     |                 |     |
        //  |     |                 |     |
        //  |  <- |    Map Bounds   | ->  |
        //  |     |                 |     |
        //  |     |                 |     |
        //  |     +-----------------+     |
        //  |              |              |
        //  |              v              |
        //  +-----------------------------+
        //
        // 여기서는 TooltipMaker가 완전히 안보이게 되는 시점의 영역을 구하기 위해서 사용됩니다.
        // TooltipMarker는 60x60 의 크기를 가지고 있기 때문에
        // 지도에서 완전히 사라지려면 지도 영역을 상하좌우 30px만큼 더 드래그해야 합니다.
        // 이 함수는 현재 보이는 지도 bounds에서 상하좌우 30px만큼 확장한 bounds를 리턴합니다.
        // 이 확장된 영역은 TooltipMarker가 화면에서 보이는지를 판단하는 영역으로 사용됩니다.
        function extendBounds(bounds, proj) {
          // 주어진 bounds는 지도 좌표 정보로 표현되어 있습니다.
          // 이것을 BOUNDS_BUFFER 픽셀 만큼 확장하기 위해서는
          // 픽셀 단위인 화면 좌표로 변환해야 합니다.
          const sw = proj.pointFromCoords(bounds.getSouthWest());
          const ne = proj.pointFromCoords(bounds.getNorthEast());

          // 확장을 위해 각 좌표에 BOUNDS_BUFFER가 가진 수치만큼 더하거나 빼줍니다.
          sw.x -= BOUNDS_BUFFER;
          sw.y += BOUNDS_BUFFER;

          ne.x += BOUNDS_BUFFER;
          ne.y -= BOUNDS_BUFFER;

          // 그리고나서 다시 지도 좌표로 변환한 extBounds를 리턴합니다.
          // extBounds는 기존의 bounds에서 상하좌우 30px만큼 확장된 영역 객체입니다.
          return new kakao.maps.LatLngBounds(proj.coordsFromPoint(sw), proj.coordsFromPoint(ne));
        }

        // Cohen–Sutherland clipping algorithm
        // 자세한 내용은 아래 위키에서...
        // https://en.wikipedia.org/wiki/Cohen%E2%80%93Sutherland_algorithm
        function getClipPosition(top, right, bottom, left, inner, outer) {
          function calcOutcode(x, y) {
            let outcode = OUTCODE.INSIDE;

            if (x < left) {
              outcode |= OUTCODE.LEFT;
            } else if (x > right) {
              outcode |= OUTCODE.RIGHT;
            }

            if (y < top) {
              outcode |= OUTCODE.TOP;
            } else if (y > bottom) {
              outcode |= OUTCODE.BOTTOM;
            }

            return outcode;
          }

          const ix = inner.x;
          const iy = inner.y;
          let ox = outer.x;
          let oy = outer.y;

          let code = calcOutcode(ox, oy);

          while (true) {
            if (!code) {
              break;
            }

            if (code & OUTCODE.TOP) {
              ox += ((ix - ox) / (iy - oy)) * (top - oy);
              oy = top;
            } else if (code & OUTCODE.RIGHT) {
              oy += ((iy - oy) / (ix - ox)) * (right - ox);
              ox = right;
            } else if (code & OUTCODE.BOTTOM) {
              ox += ((ix - ox) / (iy - oy)) * (bottom - oy);
              oy = bottom;
            } else if (code & OUTCODE.LEFT) {
              oy += ((iy - oy) / (ix - ox)) * (left - ox);
              ox = left;
            }

            code = calcOutcode(ox, oy);
          }

          return { x: ox, y: oy };
        }

        // 말풍선의 회전각을 구하기 위한 함수
        // 말풍선의 anchor가 TooltipMarker가 있는 방향을 바라보도록 회전시킬 각을 구합니다.
        function getAngle(center, target) {
          const dx = target.x - center.x;
          const dy = center.y - target.y;
          const deg = (Math.atan2(dy, dx) * 180) / Math.PI;

          return ((-deg + 360) % 360 | 0) + 90;
        }

        // tracker의 보임/숨김을 지정하는 함수
        function setVisible(visible) {
          tracker.style.display = visible ? 'block' : 'none';
        }

        // Map 객체의 'zoom_start' 이벤트 핸들러
        function hideTracker() {
          setVisible(false);
        }

        // target의 추적을 실행합니다.
        this.run = function () {
          kakao.maps.event.addListener(map, 'zoom_start', hideTracker);
          kakao.maps.event.addListener(map, 'zoom_changed', tracking);
          kakao.maps.event.addListener(map, 'center_changed', tracking);
          tracking();
        };

        // target의 추적을 중지합니다.
        this.stop = function () {
          kakao.maps.event.removeListener(map, 'zoom_start', hideTracker);
          kakao.maps.event.removeListener(map, 'zoom_changed', tracking);
          kakao.maps.event.removeListener(map, 'center_changed', tracking);
          setVisible(false);
        };
      }
      const geocoder = new kakao.maps.services.Geocoder();
      const poi = JSON.parse(items[0].poi.value);
      let geoX = poi[0];
      let geoY = poi[1];
      geocoder.addressSearch(items[0].address_old.value || items[0].address.value, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          geoY = result[0].y;
          geoX = result[0].x;
        }

        const mapContainer = civilissuanceMap.current; // 지도를 표시할 div
        const mapOption = {
          center: new kakao.maps.LatLng(geoY, geoX), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };
        // 지도를 생성합니다.
        const map = new kakao.maps.Map(mapContainer, mapOption);
        // 지도 확대 축소 여부
        // map.setZoomable(false);
        for (const i in items) {
          // 주소로 좌표를 검색합니다
          geocoder.addressSearch(items[i].address_old.value || items[i].address.value, function (result, status) {
            const poi2 = JSON.parse(items[i].poi.value);
            let geoX2 = poi2[0];
            let geoY2 = poi2[1];
            if (status === kakao.maps.services.Status.OK) {
              geoY2 = result[0].y;
              geoX2 = result[0].x;
            }

            const dkpos = new kakao.maps.LatLng(geoY2, geoX2);
            const marker = new TooltipMarker(
              dkpos,
              `<div style="padding: 10px; width:max-content; max-width:230px; text-align:center;">
                      <p style="text-align:left;"><span style="color:#0061AF;">설치 장소 :</span> ${items[i].place.value}</p>
                      <p style="text-align:left;"><span style="color:#0061AF;">설치 위치 :</span> ${items[i].location.value}</p>
                     
                      <a href="https://map.kakao.com/link/map/${
                        items[i].address_old.value || items[i].address.value
                      },${geoY2},${geoX2}" style="height:30px; width:30px; display: inline-block; margin: 10px 10px 0 10px;" target="_blank"><img src="/chat/ibricks/images/kakaoMap.png" style="width:30px; border-radius:20px;"/></a>
                      <a href="https://map.kakao.com/link/to/${
                        items[i].address_old.value || items[i].address.value
                      },${geoY2},${geoX2}" style="height:30px; width:30px; display: inline-block; margin: 10px 10px 0 10px;" target="_blank"><img src="/chat/ibricks/images/kakaoNavi.png" style="width:30px; border-radius:20px;"/></a>
                       </div>`,
              Number(i) + 1
            );
            marker.setMap(map);

            const markerTracker = new MarkerTracker(map, marker, items[i].place.value, Number(i) + 1, items[i]);

            markerTracker.run();
          });
        }
      });
    });
  }, []);
  return (
    <div className="_civilissuanceMap_main" style={boxStyle}>
      <div className="_civilissuanceMap_map_div">
        {/* {items.map((tempItem, idx) => {
          return <QuickBtn key={`${tempItem.button?.label}_${idx}`} tempItem={tempItem} idx={idx} boxStyle={boxStyle} onClickEvt={onClickEvt} />;
        })} */}
        <div id="civilissuanceMap" ref={civilissuanceMap} style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="civilissuanceList_chat" style={boxStyle}>
        <p> ※ 법원 민원 발급 여부입니다. (아이콘 미표시 시 발급불가)</p>
        <div>
          <img src="/chat/ibricks/images/map/corporation_register.png" alt="" /> <div>등기부 등본 발급가능</div>
        </div>
        <div>
          <img src="/chat/ibricks/images/map/family_census.png" alt="" /> <div>제적 등·초본 발급가능</div>
        </div>
        <div>
          <img src="/chat/ibricks/images/map/family_relation.png" alt="" /> <div>가족관계증명서 발급가능</div>
        </div>
      </div>

      <div className="civilissuanceList_item">
        <img src="/chat/ibricks/images/map/1.png" alt="" />
        <div className="img_div">
          {items[0].corporation_register.value === 'Y' ? <img src="/chat/ibricks/images/map/corporation_register.png" alt="" /> : ''}
          {items[0].family_census.value === 'Y' ? <img src="/chat/ibricks/images/map/family_census.png" alt="" /> : ''}
          {items[0].family_relation.value === 'Y' ? <img src="/chat/ibricks/images/map/family_relation.png" alt="" /> : ''}
        </div>
        <p>
          <b>설치 장소 : </b>
          {items[0].place.value || '-'}
        </p>
        <p>
  	  <div dangerouslySetInnerHTML={{__html:' <b>설치 위치 : </b>' + items[0].location.value}}/>
        </p>
        <p>
          <b>도로명 주소 : </b>
          {items[0].address.value || '-'}
        </p>
        <p>
          <b>지번 주소 : </b>
          {items[0].address_old.value || '-'}
        </p>
        <p>
          <b>운영 시간 (평일) :</b> {items[0].operating_weekday.value || '-'}
        </p>
        <p>
	  <div dangerouslySetInnerHTML={{__html:' <b>운영 시간 (토,일) : </b>' + items[0].operating_weekend.value}}/>
        </p>
      </div>
    </div>
  );
};
CivilissuanceMap.propTypes = {
  item: PropTypes.object,
  boxStyle: PropTypes.object,
};
CivilissuanceMap.defaultProps = {
  item: {},
  boxStyle: {},
};

export default CivilissuanceMap;
