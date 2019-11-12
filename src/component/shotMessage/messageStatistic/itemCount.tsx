import React from 'react';
import Texty from 'rc-texty';
import {
    ItemCountWrap,
    ItemCountItem,
    ItemCountText,
    ItemTitleText,
    ItemIcon
} from './ui';

import {
    CountToday,
    CountTotal,
    CountVoucher
} from '@/assert/img/shortMessage';

import {IState} from "@/store";
import {useMappedState} from "redux-react-hook";

const mapState = (state: IState) => {
    return {
        countData: state.ShortMessageStatistic.countData
    };
};

const ItemCount: React.ComponentType = () => {
    const {countData} = useMappedState(mapState);
    return (
        <ItemCountWrap>
            <ItemCountItem>
                <ItemCountText>
                    <Texty>{(countData && countData.day && countData.day.toString()) || '0'}</Texty>
                </ItemCountText>
                <ItemTitleText>
                    <Texty>今日短信通知（条）</Texty>
                </ItemTitleText>
                <ItemIcon src={CountToday}/>
            </ItemCountItem>
            <ItemCountItem>
                <ItemCountText>
                    <Texty>{(countData && countData.count && countData.count.toString()) || '0'}</Texty>
                </ItemCountText>
                <ItemTitleText>
                    <Texty>累计短信通知（条）</Texty>
                </ItemTitleText>
                <ItemIcon src={CountTotal}/>
            </ItemCountItem>
            <ItemCountItem>
                <ItemCountText>
                    <Texty>{(countData && countData.sum && countData.sum) || '0'}</Texty>
                </ItemCountText>
                <ItemTitleText>
                    <Texty>累积充值金额（元）</Texty>
                </ItemTitleText>
                <ItemIcon src={CountVoucher}/>
            </ItemCountItem>
        </ItemCountWrap>
    );
};

export {
    ItemCount
};