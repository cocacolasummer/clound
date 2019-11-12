import React from 'react';

import {
    CrowWrapper,
    RightCrow,
    CrowHeader,
    CrowTitle,
    CrowClose
} from '@/baseUI/Crow';
import {Button} from "antd";
import Scrollbars from "react-custom-scrollbars";
import {UIGrid} from "@/baseUI/Grid";
import {UIColLabel, UIColContent} from './ui';
import QueueAnim from "rc-queue-anim";
import {IState} from '@/store';
import {useMappedState, useDispatch} from "redux-react-hook";
import {CSSTransition} from "react-transition-group";

const mapState = (state: IState) => {
    return {
        crowShow: state.VoucherInvoiceList.crowShow,
        showData: state.VoucherInvoiceList.showData,
    };
};

const VoucherInvoiceCrow: React.ComponentType = () => {
    const dispatch = useDispatch();
    const {
        crowShow,
        showData
    } = useMappedState(mapState);

    return (
        <CSSTransition
            in={crowShow}
            timeout={1000}
            unmountOnExit
            appear={true}
            onExited={() => {
                dispatch({
                    type: 'change voucherInvoiceList crowUnMount'
                });
            }}
        >
            <CrowWrapper>
                <CSSTransition
                    in={crowShow}
                    timeout={1000}
                    unmountOnExit
                    appear={true}
                >
                    <RightCrow>
                        <CrowHeader>
                            <CrowTitle>发票订单详情</CrowTitle>
                            <CrowClose>
                                <Button shape="circle" icon={"close"} onClick={(): void => {
                                    dispatch({
                                        type: 'change voucherInvoiceList crowHide'
                                    });
                                }}/>
                            </CrowClose>
                        </CrowHeader>
                        <div style={{height: 'calc(100% - 50px)'}}>
                            <Scrollbars>
                                <QueueAnim delay={100} style={{padding: '20px 30px'}}>
                                    <UIGrid key={1}>
                                        <UIColLabel span={6}>订单号：</UIColLabel>
                                        <UIColContent span={18}>{showData.order}</UIColContent>
                                    </UIGrid>
                                    <UIGrid key={2}>
                                        <UIColLabel span={6}>发票金额：</UIColLabel>
                                        <UIColContent span={18}>￥{showData.count_fee}</UIColContent>
                                    </UIGrid>
                                    <UIGrid key={3}>
                                        <UIColLabel span={6}>发票性质：</UIColLabel>
                                        <UIColContent span={18}>{showData.type === '1' ? '纸质发票' : '电子发票'}</UIColContent>
                                    </UIGrid>
                                    <UIGrid key={4}>
                                        <UIColLabel span={6}>发票类型：</UIColLabel>
                                        <UIColContent span={18}>{showData.invoice_type}</UIColContent>
                                    </UIGrid>
                                    <UIGrid key={5}>
                                        <UIColLabel span={6}>申请时间：</UIColLabel>
                                        <UIColContent span={18}>{showData.create_time}</UIColContent>
                                    </UIGrid>
                                    <UIGrid key={6}>
                                        <UIColLabel span={6}>收件人：</UIColLabel>
                                        <UIColContent span={18}>{showData.users_info.name}</UIColContent>
                                    </UIGrid>
                                    <UIGrid key={7}>
                                        <UIColLabel span={6}>邮编：</UIColLabel>
                                        <UIColContent span={18}>{showData.users_info.postalCode}</UIColContent>
                                    </UIGrid>
                                    <UIGrid key={8}>
                                        <UIColLabel span={6}>物流公司：</UIColLabel>
                                        <UIColContent span={18}>{showData.courier_company}</UIColContent>
                                    </UIGrid>
                                    <UIGrid key={9}>
                                        <UIColLabel span={6}>发票状态：</UIColLabel>
                                        <UIColContent span={18}>{showData.status === '1' ? '已开票' : '开票中'}</UIColContent>
                                    </UIGrid>
                                    <UIGrid key={10}>
                                        <UIColLabel span={6}>发票抬头：</UIColLabel>
                                        <UIColContent span={18}>{showData.top}</UIColContent>
                                    </UIGrid>
                                    <UIGrid key={12}>
                                        <UIColLabel span={6}>收件地址：</UIColLabel>
                                        <UIColContent span={18}>{`${showData.users_info.userLocation}${showData.users_info.detailedLocation}`}</UIColContent>
                                    </UIGrid>
                                    <UIGrid key={13}>
                                        <UIColLabel span={6}>联系电话：</UIColLabel>
                                        <UIColContent span={18}>{showData.users_info.phone}</UIColContent>
                                    </UIGrid>
                                    <UIGrid key={14}>
                                        <UIColLabel span={6}>快递编号：</UIColLabel>
                                        <UIColContent span={18}>{showData.courier_num}</UIColContent>
                                    </UIGrid>
                                    <UIGrid key={15}>
                                        <UIColLabel span={6}>备注：</UIColLabel>
                                        <UIColContent span={18}>{showData.remarks}</UIColContent>
                                    </UIGrid>
                                </QueueAnim>
                            </Scrollbars>
                        </div>
                    </RightCrow>
                </CSSTransition>
            </CrowWrapper>
        </CSSTransition>
    );
};

export {
    VoucherInvoiceCrow
};