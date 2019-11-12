import React from 'react';
import {Button, Icon} from 'antd';

import {
    CartWrapper,
    CartCount,
    CartPrice,
    CartOp
} from './ui';
import {IState} from "@/store";
import {useMappedState} from "redux-react-hook";

const mapState = (state: IState) => {
    return {
        shoppingCart: state.LogisticsEditor.shoppingCart
    };
};

const Cart: React.ComponentType = () => {
    const {
        shoppingCart
    } = useMappedState(mapState);
    const count = shoppingCart.length > 1 ? shoppingCart.reduce((total: any, item, index) => {
        if (index === 1) {
            return total.count + item.count;
        }
        return total + item.count;
    }) : shoppingCart[0] && shoppingCart[0].count || 0;
    const price = shoppingCart.length > 1 ? shoppingCart.reduce((total: any, item, index) => {
        if (index === 1) {
            return total.count * total.price + item.count * item.price;
        }
        return total + item.count * item.price;
    }) : shoppingCart[0] && shoppingCart[0].count * shoppingCart[0].price || 0;
    return (
        <CartWrapper>
            <Icon style={{fontSize: 30, color: '#1890ff', lineHeight: '50px'}} type="shopping-cart"/>
            <CartCount id={"cartCount"}>{count}个物品</CartCount>
            <CartPrice>¥{price}</CartPrice>
            <CartOp>
                <Button type={"primary"} disabled={count === 0} style={{marginRight: 10}}>确定</Button>
            </CartOp>
        </CartWrapper>
    );
};

export {
    Cart
};