import React, { useEffect, useState } from 'react';
import { TamraeveContainer, TamraeveLoadingBox } from '../../styled/tamraStyle';
import TamraeveCategory from '../TamraevList/TamraevCategory';
import TamraeveSearch from '../TamraevForm/TamraevSearch';
import TamraeveCardList from '../TamraevList/TamraevCardList';
import { useAxios } from '../../../hooks/useAxios';
import { useToggle } from '../../../hooks/useToggle';
import TamraeveModal from '../TamraevModal/TamraevModal';

const TamraeveMain = ( ) => {
    const {data, loading, error} = useAxios('https://gist.githubusercontent.com/thecheeziest/76442bceea8be8e7c5ff67a6485b23cf/raw/7eb3b241f2bfdc33e835fbd51a8f6846d2d51401/tamraeve.json');
    const [dataList, setDataList] = useState([]);
    const [showData, setShowData] = useState([]);
    const [showModal, setShowModal] = useState([]);
    useEffect(() => { setDataList(data); setShowData(data); setShowModal(data) }, [data]); // dataList에 저장

    const {state: isSearch, onToggle} = useToggle(false); // 검색 버튼 토글
    const [isLine, setIsLine] = useState('인기 콘텐츠');
    const [isGb, setIsGb] = useState('all');
    const [viewCnt, setViewCnt] = useState(6);
    const [isModal, setIsModal] = useState(false);
    const [isLike, setIsLike] = useState(false);
    const [empty, setEmpty] = useState(false);

    const onCategory = (gb, title) => { // 카테고리 메뉴
        setIsGb(gb); // 리스트 등급 설정
        setIsLine(title); // 밑줄 효과
        setViewCnt(6); // 카테고리 누를 때마다 view 6
        setEmpty(false);

        if (gb === 'all') { // all 등급이면
            setShowData(dataList); // 전체 노출
        } else { // 등급에 맞는 것만 노출
            setShowData(dataList.filter(item => item.card_gb === gb));
        }
    }

    const onView = () => { // 더보기
        setViewCnt(viewCnt + 6); // 6개씩 노출
        if (dataList.length > 1 && dataList.length <= viewCnt) { // 인기 콘텐츠
            setViewCnt(dataList.length); // 데이터 길이 넘어가면 데이터 길이로 맞춤
        }
        if (showData.length > 1 && showData.length <= viewCnt) { // 그 외
            setViewCnt(showData.length); // 데이터 길이 넘어가면 데이터 길이로 맞춤
        }
    }

    const onSearch = text => { // 검색 기능
        const filteredData = dataList.filter( item =>
            item.title.includes(text.trim()) || // 타이틀 중에서 검색
            item.og_desc.includes(text.trim()) ); // 설명 중에서 검색
        setShowData(filteredData.length > 0 ? filteredData : []);
        setEmpty(filteredData.length > 0 ? false : true);
        setIsLine('');
    }

    const onModal = id => { // 모달 오픈
        setShowModal(dataList.filter(item => item.card_id === id));
        setIsModal(!isModal);
        setIsLike(false);
    }

    const onLike = id => { // 좋아요 누르면
        setIsLike(!isLike);
        setShowModal(showModal.map(item => item.card_id === id ? isLike === true ? {...item, star_cnt: item.star_cnt - 1, star_show: false} : {...item, star_cnt: item.star_cnt + 1, star_show: true} : item ));
    }

    return (
        <>
        {
            data && loading ?
            <TamraeveContainer>
                <div className="category_menu">
                    <TamraeveCategory onCategory={onCategory} isLine={isLine} />
                    <button className={`btn_search ${isSearch ? "on" : ""}`} onClick={() => onToggle(setEmpty(false))}>
                        { isSearch ? "닫기" : "검색" }
                    </button>
                    <TamraeveSearch isSearch={isSearch} onSearch={onSearch} />
                </div>

                <div className="contents_list">
                    <p className="total_count on">검색 결과 (<span>{showData.length}</span>)</p>
                    <TamraeveCardList viewCnt={viewCnt} showData={showData} dataList={dataList} onModal={onModal} empty={empty} />
                </div>
                <button class="btn_more" onClick={onView}>더보기</button>
                <TamraeveModal showModal={showModal} isModal={isModal} onModal={onModal} onLike={onLike} />
            </TamraeveContainer>
            : <TamraeveLoadingBox></TamraeveLoadingBox>
        }
        <h3> {error ? error : null} </h3>
        </>
    );
};

export default React.memo(TamraeveMain);