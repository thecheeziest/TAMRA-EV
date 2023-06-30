import React from 'react';
import { TamraeveModalBox } from '../../styled/tamraStyle';
import TamraeveModalItem from './TamraeveModalItem';

const TamraeveModal = ( {showData, isModal, onModal, onLike, isLike} ) => {
    return (
        <TamraeveModalBox className={isModal ? "on" : ""}>
            <div className="bg"></div>
            {
                showData.map(item => <TamraeveModalItem key={item.card_id} item={item} onModal={onModal} onLike={onLike} isLike={isLike} />)
            }
        </TamraeveModalBox>
    );
};

export default TamraeveModal;