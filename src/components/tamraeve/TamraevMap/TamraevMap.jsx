import React, { useEffect } from 'react';
import { TamraeveMapBox } from '../../styled/tamraStyle';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const TamraevMap = () => {
    useEffect(() => {
        const container = document.getElementById('map');
        const option = {
            center: new window.kakao.maps.LatLng(33.38582, 126.55523),
            level: 9
        };
        const map = new window.kakao.maps.Map(container, option);

        return () => {
            // 컴포넌트 언마운트 시, 지도 제거
            // map.destroy();
        };
    },[]);

    return (
        <TamraeveMapBox>
            <Map id="map" center={{ lat: 33.5563, lng: 126.79581 }}>
                <MapMarker position={{ lat: 33.55635, lng: 126.795841 }} className='maker'>
                        <h4>준비 중인 서비스입니다.</h4>
                </MapMarker>
            </Map>
        </TamraeveMapBox>
    );
};

export default TamraevMap;