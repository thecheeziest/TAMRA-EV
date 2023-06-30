import React from 'react';
import { TamraeveElectronicListPg } from '../components/styled/tamraStyle';
import TamraevMap from '../components/tamraeve/TamraevMap/TamraevMap';

const ElectronicList = () => {
    return (
        <div>
            <TamraeveElectronicListPg id="container">
                <div className="charging_wrap">
                    <h2>전기차 충전소 위치를 확인하세요!</h2>
                    <h3>제주도 어디서든 충전이 필요할 땐 내 위치에서 가장 가까운 충전소를 확인하세요.</h3>
                </div>
                <TamraevMap />
                <div className="bg_area">
                    <p>현재 준비 중인 서비스입니다.</p>
                </div>
            </TamraeveElectronicListPg>
        </div>
    );
};

export default ElectronicList;