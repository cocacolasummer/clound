import React, {useEffect} from 'react';
import {useDispatch, useMappedState} from "redux-react-hook";
import QueueAnim from 'rc-queue-anim';
import LogisticServices from '@/services/logisticServices';

const _logisticServices = new LogisticServices();
import {
    BaseFormWrapper,
    BaseGoodsListLeft,
    BaseGoodsListLeftItem,
    BaseGoodsListRight,
    BaseGoodsListRightItem,
    BaseGoodsListRightItemImg,
    BaseGoodsListRightItemContent,
    BaseGoodsListRightTitle,
    BaseGoodsListRightPrice,
    BaseGoodsListGoodsAdd,
    BaseGoodsListGoodsOp,
    BaseGoodsListGoodsCount,
    BaseGoodsListGoodsMinus,
} from './ui';
import Scrollbars from "react-custom-scrollbars";
import {IState} from '@/store';
import {Button, Badge} from "antd";
import {Goods, GoodsType} from "@/store/logistics/logisticsEditor";

const mapState = (state: IState) => {
    return {
        selectGoodsType: state.LogisticsEditor.selectGoodsType,
        goodsTypeList: state.LogisticsEditor.goodsTypeList,
        goodsList: state.LogisticsEditor.goodsList,
        shoppingCart: state.LogisticsEditor.shoppingCart
    };
};

interface GoodsListProps {
    addAnimate?: (startX: number, startY: number, endX: number, endY: number) => void;
    isManage?: boolean;
}

const GoodsList: React.ComponentType<GoodsListProps> = (props: GoodsListProps) => {
    const dispatch = useDispatch();
    const {
        selectGoodsType,
        goodsTypeList,
        goodsList,
        shoppingCart
    } = useMappedState(mapState);
    useEffect(() => {
        _logisticServices.getGoodsType((data: any) => {
            dispatch({
                type: 'change logisticsEditor goodsTypeList',
                goodsTypeList: data
            });
        }, (err: any) => {
            console.log(err);
        });

    }, [dispatch]);
    useEffect(() => {
        dispatch({
            type: 'change logisticsEditor selectGoodsType',
            selectGoodsType: goodsTypeList[0] && goodsTypeList[0].id + ''
        });
    }, [dispatch, goodsTypeList]);
    useEffect(() => {
        _logisticServices.getGoodsList({
            type: selectGoodsType
        }, (data: any) => {
            dispatch({
                type: 'change logisticsEditor goodsList',
                goodsList: data
            });
        }, (err: any) => {
            console.log(err);
        });
    }, [dispatch, selectGoodsType]);
    const getGoodsCountById = (id: string): number => {
        let count;
        for (let i = 0; i < shoppingCart.length; i++) {
            if (shoppingCart[i].id === id) {
                count = shoppingCart[i].count;
            }
        }

        if (!count) {
            count = 0;
        }
        return count;
    };
    const getGoodsTypeCartCount = (id: string): number => {
        let count = 0;
        for (let i = 0; i < shoppingCart.length; i++) {
            if (shoppingCart[i].goodsType === id) {
                count += shoppingCart[i].count;
            }
        }
        return count;
    };
    const leftItems = goodsTypeList && goodsTypeList.map((item: GoodsType, index: number) => {
        return (
            <BaseGoodsListLeftItem onClick={(): void => {
                dispatch({
                    type: 'change logisticsEditor selectGoodsType',
                    selectGoodsType: item.id + ''
                });
            }} type={selectGoodsType === item.id + ''} key={index}>{item.name}<Badge
                count={getGoodsTypeCartCount(item.id + '')}
                style={{backgroundColor: '#1890ff', marginLeft: 5}}/></BaseGoodsListLeftItem>
        );
    });
    const rightItems = goodsList && goodsList.map((item: Goods, index: number) => {
        const count = getGoodsCountById(item.id + '');
        return (
            <BaseGoodsListRightItem key={index}>
                <BaseGoodsListRightItemImg src={item.imgUrl}/>
                <BaseGoodsListRightItemContent>
                    <BaseGoodsListRightTitle>{item.name}</BaseGoodsListRightTitle>
                    <BaseGoodsListRightPrice>¥{item.price}</BaseGoodsListRightPrice>
                </BaseGoodsListRightItemContent>
                {
                    props.isManage ? <QueueAnim component={BaseGoodsListGoodsOp}>
                        <Button shape={"circle"} size={"small"} icon={"delete"}/>
                    </QueueAnim> : <QueueAnim component={BaseGoodsListGoodsOp}>

                        {count === 0 ? null : <BaseGoodsListGoodsMinus key={0}>
                            <Button shape={"circle"}
                                    onClick={(): void => {
                                        if (count > 0) {
                                            dispatch({
                                                type: 'change logisticsEditor shoppingCart',
                                                id: item.id + '',
                                                price: item.price,
                                                count: count - 1,
                                                goodsType: item.type + ''
                                            });
                                        }
                                    }}
                                    icon={"minus"} size={"small"}/>
                        </BaseGoodsListGoodsMinus>}
                        {count === 0 ? null : <BaseGoodsListGoodsCount key={1}>
                            {count}
                        </BaseGoodsListGoodsCount>}
                        <BaseGoodsListGoodsAdd key={3}>
                            <Button shape={"circle"}
                                    onClick={(e): void => {
                                        dispatch({
                                            type: 'change logisticsEditor shoppingCart',
                                            id: item.id + '',
                                            price: item.price,
                                            count: count + 1,
                                            goodsType: item.type + ''
                                        });
                                        const target = document.querySelector('#cartCount');
                                        if (target) {
                                            props.addAnimate && props.addAnimate(e.nativeEvent.clientX, e.nativeEvent.clientY,
                                                target.getBoundingClientRect().left - 30, target.getBoundingClientRect().top);
                                        }
                                    }}
                                    icon={"plus"} size={"small"}/>
                        </BaseGoodsListGoodsAdd>
                    </QueueAnim>}
            </BaseGoodsListRightItem>
        );
    });

    return (
        <BaseFormWrapper>
            <BaseGoodsListLeft>
                <Scrollbars>
                    {leftItems}
                </Scrollbars>
            </BaseGoodsListLeft>
            <BaseGoodsListRight id={"traget"}>
                <Scrollbars>
                    {rightItems}
                </Scrollbars>
            </BaseGoodsListRight>
        </BaseFormWrapper>
    );
};

export {
    GoodsList
};