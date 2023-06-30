import React from 'react';
import TamraeveCardItem from './TamraeveCardItem';

const TamraeveCardList = ( {viewCnt, showData, dataList, onModal} ) => {
    return (
        <ul id='card_list'>
            {
                showData.length < 1
                ? dataList.slice(0, viewCnt).map(item => <TamraeveCardItem key={item.card_id} item={item} onModal={onModal} />)
                : showData.slice(0, viewCnt).map(item => <TamraeveCardItem key={item.card_id} item={item} onModal={onModal} />)
            }
        </ul>
    );
};

export default React.memo(TamraeveCardList);