import React, {Fragment, useEffect} from 'react';

import {ItemCount} from './itemCount';
import {ItemChart} from './itemChart';
import ShortMessageServices from '@/services/shortMessageServices';
const _shortMessageServices = new ShortMessageServices();
import {useDispatch} from "redux-react-hook";

import {
    MessageStatisticWrap
} from './ui';
import {CSSTransition} from "react-transition-group";
import {error} from "@/util/golbalModalMessage";

const MessageStatistic: React.ComponentType = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        _shortMessageServices.getTotalStatistic((res: any) => {
            dispatch({
                type: 'change shortMessageStatistic countData',
                countData: res.data
            });
        }, (err) => {
            error(err && err.message ? err.message : err.toString());
        });
    }, []);
    return (
        <Fragment>
            <CSSTransition
                in={true}
                timeout={1000}
                unmountOnExit
                appear={true}
            >
                <MessageStatisticWrap>
                    <ItemCount/>
                    <ItemChart/>
                </MessageStatisticWrap>
            </CSSTransition>
        </Fragment>
    );
};

export {
    MessageStatistic
};